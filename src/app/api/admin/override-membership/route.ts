import { NextResponse } from "next/server";
import { requireAdmin, requireMutableAccount } from "@/modules/auth/guards";
import { db } from "@/db/client";
import { memberships, membershipPlans, adminAuditLogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const overrideSchema = z.object({
  userId: z.string(),
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

    const { userId, durationDays } = parsed.data;

    // Get Monthly plan ID
    const plan = await db.query.membershipPlans.findFirst({
      where: eq(membershipPlans.slug, "monthly"),
    });

    const planId = plan?.id || "plan-monthly-1";
    const now = new Date();
    const endsAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

    // Reliable application-level upsert for membership
    const existingMembership = await db.query.memberships.findFirst({
      where: eq(memberships.userId, userId),
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
        userId,
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
      targetId: userId,
      payloadJson: JSON.stringify({ durationDays, endsAt }),
    });

    return NextResponse.json({
      ok: true,
      message: `Berhasil memberikan hak akses ${durationDays} Hari Premium ke user ${userId}`,
    });
  } catch (error) {
    console.error("Admin Override Membership Error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL_ERROR", message: "Gagal menjalankan membership override." } },
      { status: 500 }
    );
  }
}
