import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/db/client";
import { transactions, memberships, membershipPlans } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-demo-key";

    // SHA-512 Signature Key Verification
    const payloadToHash = `${order_id}${status_code}${gross_amount}${serverKey}`;
    const expectedSignature = crypto
      .createHash("sha512")
      .update(payloadToHash)
      .digest("hex");

    if (signature_key && signature_key !== expectedSignature) {
      console.error("Invalid Midtrans Webhook Signature:", { signature_key, expectedSignature });
      return NextResponse.json(
        { ok: false, error: { code: "INVALID_SIGNATURE", message: "Signature verification failed" } },
        { status: 400 }
      );
    }

    // Find transaction record in DB
    const transaction = await db.query.transactions.findFirst({
      where: eq(transactions.orderId, order_id),
    });

    if (!transaction) {
      return NextResponse.json(
        { ok: false, error: { code: "NOT_FOUND", message: "Transaction not found" } },
        { status: 404 }
      );
    }

    const isPaidStatus =
      transaction_status === "settlement" ||
      (transaction_status === "capture" && fraud_status === "accept");

    if (isPaidStatus) {
      // 1. Update transaction status
      await db
        .update(transactions)
        .set({
          status: "PAID",
          updatedAt: new Date(),
        })
        .where(eq(transactions.id, transaction.id));

      // 2. Idempotent Entitlement Granting Check
      if (!transaction.entitlementAppliedAt) {
        const plan = await db.query.membershipPlans.findFirst({
          where: eq(membershipPlans.id, transaction.planId),
        });

        const durationDays = plan?.durationDays || 30;
        const now = new Date();
        const endsAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

        // Application-level upsert user membership
        const existingMembership = await db.query.memberships.findFirst({
          where: eq(memberships.userId, transaction.userId),
        });

        if (existingMembership) {
          await db
            .update(memberships)
            .set({
              status: "ACTIVE",
              planId: transaction.planId,
              startsAt: now,
              endsAt,
              updatedAt: now,
            })
            .where(eq(memberships.id, existingMembership.id));
        } else {
          await db.insert(memberships).values({
            userId: transaction.userId,
            planId: transaction.planId,
            status: "ACTIVE",
            startsAt: now,
            endsAt,
          });
        }

        // Mark entitlement as applied
        await db
          .update(transactions)
          .set({ entitlementAppliedAt: now })
          .where(eq(transactions.id, transaction.id));

        console.log(`✅ Membership entitlement applied for user ${transaction.userId} until ${endsAt.toISOString()}`);
      }
    } else if (transaction_status === "expire") {
      await db
        .update(transactions)
        .set({ status: "EXPIRED", updatedAt: new Date() })
        .where(eq(transactions.id, transaction.id));
    } else if (transaction_status === "cancel" || transaction_status === "deny") {
      await db
        .update(transactions)
        .set({ status: "CANCELLED", updatedAt: new Date() })
        .where(eq(transactions.id, transaction.id));
    }

    return NextResponse.json({ ok: true, message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Midtrans Webhook Exception:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL_ERROR", message: "Webhook execution error" } },
      { status: 500 }
    );
  }
}
