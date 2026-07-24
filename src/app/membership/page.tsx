import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/modules/auth/config";
import { requirePremiumEntitlement } from "@/modules/auth/guards";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Sparkles, Check, ShieldCheck, ArrowRight, Zap, Coffee } from "lucide-react";
import { CheckoutButton } from "@/components/payment/CheckoutButton";

export default async function MembershipPage() {
  const session = await getServerSession(authOptions);

  let isPremium = false;
  if (session?.user?.id) {
    const entitlementRes = await requirePremiumEntitlement(session.user.id);
    isPremium = entitlementRes.ok;
  }

  const features = [
    "Akses tanpa batas ke seluruh materi video course premium",
    "Perpustakaan resep praktis & Coffee Guide eksklusif",
    "Pelacak progres belajar pribadi di dashboard",
    "Update materi course baru secara berkala tanpa biaya tambahan",
    "Pembayaran aman melalui simulasi Midtrans Snap Sandbox",
  ];

  return (
    <div className="min-h-screen bg-coffee-cream flex flex-col justify-between">
      <Header />

      <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="badge-playful bg-coffee-card text-coffee-accent border border-coffee-border">
            Pilihan Paket Keanggotaan
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-coffee-dark tracking-tight leading-tight">
            Investasi Terbaik untuk Keterampilan Seduh Kopi Kamu
          </h1>
          <p className="text-base sm:text-lg text-coffee-muted leading-relaxed">
            Pilih paket membership yang sesuai dengan ritme belajarmu. Batalkan kapan saja tanpa komitmen tersembunyi.
          </p>
        </div>

        {/* Sandbox Disclaimer Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-4 sm:p-6 text-center max-w-4xl mx-auto flex items-center justify-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
          <p className="text-xs sm:text-sm font-semibold text-amber-900 leading-relaxed">
            <span className="font-extrabold uppercase">Mode Simulasi Sandbox:</span> Transaksi pada platform ini menggunakan Midtrans Snap Sandbox. Tidak ada tagihan riil pada kartu atau dompet digital kamu.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Monthly Plan Card */}
          <div className="bento-card bg-white border border-coffee-border p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-bento transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-coffee-accent">
                  Paket Bulanan
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-coffee-card text-coffee-dark border border-coffee-border">
                  30 Hari
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-coffee-dark tracking-tight">
                    Rp49.000
                  </span>
                  <span className="text-sm font-semibold text-coffee-muted">/ bulan</span>
                </div>
                <p className="text-xs text-coffee-muted mt-2">
                  Cocok untuk mencoba seluruh fitur course tanpa komitmen panjang.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-coffee-light/60">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-xs sm:text-sm text-coffee-dark">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <CheckoutButton
                planSlug="monthly"
                planName="Paket Monthly (30 Hari)"
                priceIdr={49000}
                isLoggedIn={!!session?.user}
                isPremium={isPremium}
              />
            </div>
          </div>

          {/* Yearly Plan Card (Featured Dark Espresso Theme) */}
          <div className="bento-card bg-coffee-dark text-white border border-coffee-dark p-8 rounded-3xl flex flex-col justify-between shadow-bento relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Hemat 32%
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Paket Tahunan (Paling Populer)
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    Rp399.000
                  </span>
                  <span className="text-sm font-semibold text-coffee-cream/80">/ tahun</span>
                </div>
                <p className="text-xs text-coffee-cream/80 mt-2">
                  Setara Rp33.250/bulan. Hemat Rp189.000 dibanding bayar bulanan.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/20">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-xs sm:text-sm text-coffee-cream">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <CheckoutButton
                planSlug="yearly"
                planName="Paket Yearly (365 Hari)"
                priceIdr={399000}
                isLoggedIn={!!session?.user}
                isPremium={isPremium}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
