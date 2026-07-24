import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/modules/auth/config";
import { db } from "@/db/client";
import { transactions, membershipPlans } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const checkoutSchema = z.object({
  planSlug: z.enum(["monthly", "yearly"]),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { ok: false, error: { code: "AUTH_REQUIRED", message: "Silakan masuk terlebih dahulu." } },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Payload tidak valid." } },
        { status: 400 }
      );
    }

    const { planSlug } = parsed.data;

    // Find membership plan
    const plan = await db.query.membershipPlans.findFirst({
      where: eq(membershipPlans.slug, planSlug),
    });

    if (!plan) {
      return NextResponse.json(
        { ok: false, error: { code: "NOT_FOUND", message: "Paket membership tidak ditemukan." } },
        { status: 404 }
      );
    }

    // Generate Order ID: FCA-{TIMESTAMP}-{RANDOM}
    const orderId = `FCA-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-demo-key";
    const authHeader = `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`;

    // Request Snap token from Midtrans Sandbox
    const snapApiUrl = "https://app.sandbox.midtrans.com/snap/v1/transactions";
    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: plan.priceIdr,
      },
      customer_details: {
        first_name: session.user.name || "Student",
        email: session.user.email,
      },
      item_details: [
        {
          id: plan.id,
          price: plan.priceIdr,
          quantity: 1,
          name: plan.name,
        },
      ],
    };

    let snapToken = `DEMO-SNAP-TOKEN-${orderId}`;

    try {
      const midtransRes = await fetch(snapApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(payload),
      });

      if (midtransRes.ok) {
        const midtransData = await midtransRes.json();
        if (midtransData.token) {
          snapToken = midtransData.token;
        }
      }
    } catch (e) {
      console.warn("Midtrans Sandbox API mock fallback enabled:", e);
    }

    // Save transaction to DB
    await db.insert(transactions).values({
      orderId,
      userId: session.user.id,
      planId: plan.id,
      amountIdr: plan.priceIdr,
      environment: "SANDBOX",
      status: "CREATED",
      snapToken,
    });

    return NextResponse.json({
      ok: true,
      data: {
        orderId,
        snapToken,
        amountIdr: plan.priceIdr,
      },
    });
  } catch (error) {
    console.error("Checkout Snap API Error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL_ERROR", message: "Gagal memproses transaksi checkout." } },
      { status: 500 }
    );
  }
}
