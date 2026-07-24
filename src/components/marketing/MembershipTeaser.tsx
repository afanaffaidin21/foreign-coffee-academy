import React from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MembershipTeaser() {
  const benefits = [
    "Akses penuh ke seluruh materi video premium",
    "Perpustakaan resep praktis & Coffee Guide eksklusif",
    "Pelacak progres belajar pribadi di dashboard",
    "Uji coba pembayaran aman dengan Midtrans Sandbox",
  ];

  return (
    <section className="py-20 bg-coffee-cream border-t border-coffee-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main High-Contrast Dark Bento Pricing Card */}
        <div className="bg-coffee-dark text-white rounded-3xl p-8 sm:p-12 border border-coffee-dark shadow-bento relative overflow-hidden">
          {/* Subtle Background Warm Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Freemium Membership</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Siap meningkatkan keterampilan seduh ke tingkat berikutnya?
              </h2>

              <p className="text-base sm:text-lg text-coffee-cream/80 leading-relaxed">
                Nikmati akses tanpa batas ke seluruh course, video ekstraksi, dan resep kopi praktis hanya dengan Rp49.000/bulan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 text-xs sm:text-sm text-coffee-cream font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Pricing Card Box */}
            <div className="lg:col-span-5 bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-inner">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-amber-300">
                <ShieldCheck className="w-4 h-4" />
                <span>Portofolio Demo Sandbox</span>
              </div>

              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">Rp49.000</span>
                <span className="text-sm font-semibold text-coffee-cream/80">/ bulan</span>
              </div>

              <p className="text-xs text-coffee-cream/75 leading-relaxed max-w-xs mx-auto">
                Pembayaran disimulasikan menggunakan Midtrans Snap Sandbox. Tidak ada transaksi riil.
              </p>

              <Link href="/membership" className="block pt-2">
                <Button className="w-full justify-center bg-coffee-dark text-white hover:bg-coffee-accent border border-white/20 rounded-full h-12 text-sm font-bold shadow-md transition-all">
                  <span>Bandingkan Paket Membership</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
