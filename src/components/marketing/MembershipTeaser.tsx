import React from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
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
        <div className="bento-card bg-coffee-dark text-coffee-cream p-8 md:p-12 relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Freemium Membership</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Siap meningkatkan keterampilan seduh ke tingkat berikutnya?
              </h2>

              <p className="text-sm sm:text-base text-coffee-cream/80 leading-relaxed">
                Nikmati akses tanpa batas ke seluruh course dan resep kopi hanya dengan Rp49.000/bulan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2.5 text-xs sm:text-sm text-coffee-cream/90">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 text-center space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                Portofolio Demo Sandbox
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl sm:text-4xl font-black text-white">Rp49.000</span>
                <span className="text-xs text-coffee-cream/70">/ bulan</span>
              </div>
              <p className="text-xs text-coffee-cream/70">
                Pembayaran disimulasikan menggunakan Midtrans Snap Sandbox. Tidak ada transaksi riil.
              </p>
              <Link href="/membership" className="block pt-2">
                <Button className="w-full justify-center bg-amber-500 text-coffee-dark font-extrabold hover:bg-amber-400 rounded-2xl h-12 text-sm shadow-md">
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
