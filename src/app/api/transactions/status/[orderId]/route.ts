import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/modules/auth/config";
import { db } from "@/db/client";
import { transactions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { ok: false, error: { code: "AUTH_REQUIRED", message: "Unauthorized" } },
        { status: 401 }
      );
    }

    const transaction = await db.query.transactions.findFirst({
      where: eq(transactions.orderId, params.orderId),
    });

    if (!transaction) {
      return NextResponse.json(
        { ok: false, error: { code: "NOT_FOUND", message: "Transaction not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: {
        orderId: transaction.orderId,
        status: transaction.status,
        amountIdr: transaction.amountIdr,
        entitlementApplied: !!transaction.entitlementAppliedAt,
      },
    });
  } catch (error) {
    console.error("Transaction Status API Error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL_ERROR", message: "Internal server error" } },
      { status: 500 }
    );
  }
}
