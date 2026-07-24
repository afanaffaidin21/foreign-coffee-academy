import { getServerSession } from "next-auth";
import { authOptions } from "./config";
import { db } from "@/db/client";
import { memberships } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";

export type ActionResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      error: {
        code:
          | "AUTH_REQUIRED"
          | "FORBIDDEN"
          | "DEMO_ACCOUNT_READ_ONLY"
          | "MEMBERSHIP_REQUIRED"
          | "VALIDATION_ERROR"
          | "INTERNAL_ERROR";
        message: string;
      };
    };

/**
 * Asserts user is authenticated via NextAuth session.
 */
export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return {
      ok: false as const,
      error: {
        code: "AUTH_REQUIRED" as const,
        message: "Silakan masuk terlebih dahulu untuk mengakses halaman ini.",
      },
    };
  }
  return { ok: true as const, data: session.user };
}

/**
 * Asserts user has ADMIN role.
 */
export async function requireAdmin() {
  const authRes = await requireUser();
  if (!authRes.ok) return authRes;

  if (authRes.data.role !== "ADMIN") {
    return {
      ok: false as const,
      error: {
        code: "FORBIDDEN" as const,
        message: "Hanya Administrator yang memiliki akses ke fitur ini.",
      },
    };
  }
  return authRes;
}

/**
 * Asserts account is mutable (prevents public demo accounts from executing destructive system changes).
 */
export async function requireMutableAccount(email: string) {
  const readOnlyDemoEmails = [
    "student-free@example.com",
    "student-active@example.com",
    "student-expired@example.com",
  ];

  if (readOnlyDemoEmails.includes(email.toLowerCase())) {
    return {
      ok: false as const,
      error: {
        code: "DEMO_ACCOUNT_READ_ONLY" as const,
        message: "Akun demo bersifat read-only untuk operasi sensitif sistem.",
      },
    };
  }
  return { ok: true as const, data: true };
}

/**
 * Checks live DB membership status (active = status == ACTIVE && endsAt > now).
 * PRD Rule: Never rely on session token for entitlement; always query live DB.
 */
export async function requirePremiumEntitlement(userId: string) {
  const now = new Date();

  const activeMembership = await db.query.memberships.findFirst({
    where: and(
      eq(memberships.userId, userId),
      eq(memberships.status, "ACTIVE"),
      gt(memberships.endsAt, now)
    ),
  });

  if (!activeMembership) {
    return {
      ok: false as const,
      error: {
        code: "MEMBERSHIP_REQUIRED" as const,
        message: "Keanggotaan premium aktif diperlukan untuk mengakses konten ini.",
      },
    };
  }

  return { ok: true as const, data: activeMembership };
}
