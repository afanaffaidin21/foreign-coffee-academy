import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/modules/auth/config";
import { db } from "@/db/client";
import { lessonProgress } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const progressSchema = z.object({
  lessonId: z.string().min(1),
  completed: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { ok: false, error: { code: "AUTH_REQUIRED", message: "Unauthorized" } },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = progressSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Invalid payload" } },
        { status: 400 }
      );
    }

    const { lessonId, completed } = parsed.data;

    // Check if progress row exists
    const existing = await db.query.lessonProgress.findFirst({
      where: and(
        eq(lessonProgress.userId, session.user.id),
        eq(lessonProgress.lessonId, lessonId)
      ),
    });

    if (existing) {
      await db
        .update(lessonProgress)
        .set({
          completed,
          completedAt: completed ? new Date() : null,
          lastAccessedAt: new Date(),
        })
        .where(eq(lessonProgress.id, existing.id));
    } else {
      await db.insert(lessonProgress).values({
        userId: session.user.id,
        lessonId,
        completed,
        completedAt: completed ? new Date() : null,
      });
    }

    return NextResponse.json({ ok: true, data: { lessonId, completed } });
  } catch (error) {
    console.error("Progress API Error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL_ERROR", message: "Internal server error" } },
      { status: 500 }
    );
  }
}
