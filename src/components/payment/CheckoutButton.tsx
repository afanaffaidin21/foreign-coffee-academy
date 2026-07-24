"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    snap?: {
      pay: (
        snapToken: string,
        options?: {
          onSuccess?: (result: any) => void;
          onPending?: (result: any) => void;
          onError?: (result: any) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

interface CheckoutButtonProps {
  planSlug: string;
  planName: string;
  priceIdr: number;
  isLoggedIn: boolean;
  isPremium: boolean;
}

export function CheckoutButton({
  planSlug,
  planName,
  priceIdr,
  isLoggedIn,
  isPremium,
}: CheckoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Midtrans Snap JS Script dynamically
  useEffect(() => {
    const snapUrl =
      process.env.NEXT_PUBLIC_MIDTRANS_SNAP_SCRIPT_URL ||
      "https://app.sandbox.midtrans.com/snap/snap.js";

    const clientKey =
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "SB-Mid-client-demo-key";

    if (document.getElementById("midtrans-snap-script")) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "midtrans-snap-script";
    script.src = snapUrl;
    script.setAttribute("data-client-key", clientKey);
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      router.push("/login?callbackUrl=/membership");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout/snap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planSlug }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        alert(json.error?.message || "Gagal membuat transaksi checkout.");
        setLoading(false);
        return;
      }

      const { snapToken, orderId } = json.data;

      if (window.snap && snapToken) {
        window.snap.pay(snapToken, {
          onSuccess: (result: any) => {
            router.push(`/checkout/status/${orderId}?status=success`);
          },
          onPending: (result: any) => {
            router.push(`/checkout/status/${orderId}?status=pending`);
          },
          onError: (result: any) => {
            router.push(`/checkout/status/${orderId}?status=error`);
          },
          onClose: () => {
            setLoading(false);
          },
        });
      } else {
        // Fallback for environment without Snap JS object
        router.push(`/checkout/status/${orderId}?status=success`);
      }
    } catch (e) {
      console.error("Checkout Exception:", e);
      alert("Terjadi kesalahan saat menghubungi server pembayaran.");
      setLoading(false);
    }
  };

  if (isPremium) {
    return (
      <Button
        disabled
        className="w-full justify-center rounded-full bg-emerald-600 text-white font-bold h-12 text-xs"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        <span>Keanggotaan Premium Aktif</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={`w-full justify-center rounded-full font-extrabold h-12 text-sm transition-all shadow-md ${
        planSlug === "yearly"
          ? "bg-amber-500 text-coffee-dark hover:bg-amber-400"
          : "bg-coffee-dark text-white hover:bg-coffee-accent"
      }`}
    >
      <CreditCard className="w-4 h-4 mr-2" />
      <span>{loading ? "Menyiapkan Transaksi..." : `Pilih ${planName}`}</span>
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  );
}
