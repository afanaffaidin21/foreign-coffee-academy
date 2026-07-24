import { NextResponse } from "next/server";
import { requireAdmin, requireMutableAccount } from "@/modules/auth/guards";
import { db } from "@/db/client";
import { users, memberships, membershipPlans, adminAuditLogs } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { z } from "zod";

const overrideSchema = z.object({
  userId: z.string().optional(),
  email: z.string().optional(),
  durationDays: z.number().default(30),
});

export async function POST(req: Request) {
  try {
    const adminRes = await requireAdmin();
    if (!adminRes.ok) {
      return NextResponse.json(
        { ok: false, error: adminRes.error },
        { status: adminRes.error.code === "AUTH_REQUIRED" ? 401 : 403 }
      );
    }

    const mutableRes = await requireMutableAccount(adminRes.data.email || "");
    if (!mutableRes.ok) {
      return NextResponse.json(
        { ok: false, error: mutableRes.error },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = overrideSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Payload tidak valid." } },
        { status: 400 }
      );
    }

    const { userId, email, durationDays } = parsed.data;

    // Find target user in DB by ID or Email
    const targetUser = await db.query.users.findFirst({
      where: userId ? eq(users.id, userId) : email ? eq(users.email, email) : undefined,
    });

    if (!targetUser) {
      return NextResponse.json(
        { ok: false, error: { code: "NOT_FOUND", message: "Pengguna tidak ditemukan di database." } },
        { status: 404 }
      );
    }

    // Get Monthly plan ID
    const plan = await db.query.membershipPlans.findFirst({
      where: eq(membershipPlans.slug, "monthly"),
    });

    const planId = plan?.id || "plan-monthly-1";
    const now = new Date();
    const endsAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

    // Application-level upsert for membership
    const existingMembership = await db.query.memberships.findFirst({
      where: eq(memberships.userId, targetUser.id),
    });

    if (existingMembership) {
      await db
        .update(memberships)
        .set({
          status: "ACTIVE",
          planId,
          startsAt: now,
          endsAt,
          updatedAt: now,
        })
        .where(eq(memberships.id, existingMembership.id));
    } else {
      await db.insert(memberships).values({
        userId: targetUser.id,
        planId,
        status: "ACTIVE",
        startsAt: now,
        endsAt,
      });
    }

    // Record audit log
    await db.insert(adminAuditLogs).values({
      adminUserId: adminRes.data.id,
      action: "MANUAL_MEMBERSHIP_OVERRIDE",
      targetType: "USER",
      targetId: targetUser.id,
      payloadJson: JSON.stringify({ email: targetUser.email, durationDays, endsAt }),
    });

    return NextResponse.json({
      ok: true,
      message: `Berhasil memberikan hak akses ${durationDays} Hari Premium ke ${targetUser.email}`,
    });
  } catch (error) {
    console.error("Admin Override Membership Error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL_ERROR", message: "Gagal menjalankan membership override." } },
      { status: 500 }
    );
  }
}
