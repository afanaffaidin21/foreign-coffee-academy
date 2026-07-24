import { NextResponse } from "next/server";
import { requireAdmin, requireMutableAccount } from "@/modules/auth/guards";
import { db } from "@/db/client";
import { adminAuditLogs } from "@/db/schema";
import { z } from "zod";

const publishSchema = z.object({
  targetId: z.string(),
  targetType: z.string(),
  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]),
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
    const parsed = publishSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Payload tidak valid." } },
        { status: 400 }
      );
    }

    const { targetId, targetType, status } = parsed.data;

    // Log admin audit action
    await db.insert(adminAuditLogs).values({
      adminUserId: adminRes.data.id,
      action: "COURSE_PUBLISH_STATUS_TOGGLE",
      targetType: targetType.toUpperCase(),
      targetId,
      payloadJson: JSON.stringify({ newStatus: status }),
    });

    return NextResponse.json({
      ok: true,
      message: `Status publikasi ${targetType} ${targetId} berhasil diubah menjadi ${status}`,
    });
  } catch (error) {
    console.error("Admin Publish Status API Error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL_ERROR", message: "Gagal mengubah status publikasi." } },
      { status: 500 }
    );
  }
}
