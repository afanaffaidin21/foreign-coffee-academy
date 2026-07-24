"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, XCircle, ArrowRight, Coffee, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

function StatusContent({ orderId }: { orderId: string }) {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || "pending";

  const [status, setStatus] = useState<string>(
    initialStatus === "success" ? "PAID" : initialStatus === "error" ? "FAILED" : "PENDING"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/transactions/status/${orderId}`);
        if (res.ok) {
          const json = await res.json();
          if (json.ok && json.data?.status) {
            setStatus(json.data.status);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkStatus();
    timer = setInterval(checkStatus, 3000);

    return () => clearInterval(timer);
  }, [orderId]);

  return (
    <div className="max-w-xl mx-auto my-12 bento-card bg-white border border-coffee-border p-8 text-center space-y-6 shadow-sm">
      {status === "PAID" || status === "success" ? (
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="badge-playful bg-emerald-100 text-emerald-800 border border-emerald-200">
            Pembayaran Berhasil
          </span>
          <h1 className="text-2xl font-extrabold text-coffee-dark">
            Keanggotaan Premium Telah Aktif!
          </h1>
          <p className="text-sm text-coffee-muted leading-relaxed">
            Terima kasih! Transaksi simulasi Midtrans Sandbox kamu dengan Order ID <span className="font-mono text-coffee-dark font-bold">{orderId}</span> telah diverifikasi.
          </p>

          <div className="pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-coffee-dark text-white hover:bg-coffee-accent rounded-full font-bold h-12 px-8 shadow-md w-full">
                <span>Buka Dashboard &amp; Nikmati Video</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      ) : status === "FAILED" || status === "CANCELLED" || status === "EXPIRED" ? (
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8" />
          </div>
          <span className="badge-playful bg-rose-100 text-rose-800 border border-rose-200">
            Transaksi Gagal / Batalkan
          </span>
          <h1 className="text-2xl font-extrabold text-coffee-dark">
            Pembayaran Belum Selesai
          </h1>
          <p className="text-sm text-coffee-muted leading-relaxed">
            Transaksi Midtrans Sandbox kamu tidak diselesaikan atau telah kedaluwarsa.
          </p>

          <div className="pt-4">
            <Link href="/membership">
              <Button size="lg" className="bg-coffee-dark text-white hover:bg-coffee-accent rounded-full font-bold h-12 px-8 shadow-md w-full">
                <span>Coba Kembali Pilih Paket</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 animate-spin" />
          </div>
          <span className="badge-playful bg-amber-100 text-amber-900 border border-amber-200">
            Menunggu Verifikasi
          </span>
          <h1 className="text-2xl font-extrabold text-coffee-dark">
            Memproses Status Pembayaran...
          </h1>
          <p className="text-sm text-coffee-muted leading-relaxed">
            Sistem sedang memeriksa status Sandbox untuk Order ID <span className="font-mono text-coffee-dark font-bold">{orderId}</span>.
          </p>
        </div>
      )}
    </div>
  );
}

export default function CheckoutStatusPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="min-h-screen bg-coffee-cream flex flex-col justify-between">
      <Header />

      <main className="px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <Suspense fallback={<div className="text-center py-12 text-coffee-muted">Memuat status transaksi...</div>}>
          <StatusContent orderId={params.orderId} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
