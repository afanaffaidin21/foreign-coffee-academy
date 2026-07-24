import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Play, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-12 pb-20 overflow-hidden relative">
      {/* Soft Background Accent Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-200/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="badge-playful bg-coffee-card text-coffee-accent border border-coffee-border">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-coffee-terracotta" />
              Platform Belajar Kopi Rumah &amp; Barista Pemula
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-coffee-dark leading-[1.12] tracking-tight">
              Belajar kopi menjadi lebih mudah, terstruktur &amp; menyenangkan.
            </h1>

            <p className="text-lg sm:text-xl text-coffee-muted leading-relaxed max-w-2xl">
              Hubungkan teori ekstraksi, teknik manual brew, dan alur kerja coffee shop nyata melalui course, Coffee Guide, dan resep siap pakai berbahasa Indonesia.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/courses">
                <Button size="lg" className="bg-coffee-accent text-white hover:bg-coffee-dark shadow-bento hover:shadow-bento-hover rounded-3xl">
                  <span>Mulai dari materi gratis</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/belajar">
                <Button size="lg" variant="outline" className="rounded-3xl border-coffee-border hover:border-coffee-accent">
                  Lihat Alur Belajar
                </Button>
              </Link>
            </div>

            {/* Value Cues */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-coffee-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tanpa perlu login untuk lesson gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Alur praktik nyata coffee shop</span>
              </div>
            </div>
          </div>

          {/* Hero Soft Bento Visual Column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bento-card bg-white border-coffee-border">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Play className="w-5 h-5 fill-amber-800" />
              </div>
              <h3 className="font-bold text-lg text-coffee-dark mb-1">Free Lesson Access</h3>
              <p className="text-xs text-coffee-muted leading-relaxed">
                Tonton video ekstraksi &amp; teknik seduh gratis tanpa paywall awal.
              </p>
            </div>

            <div className="bento-card bg-coffee-card border-coffee-border">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 font-bold text-lg">
                V60
              </div>
              <h3 className="font-bold text-lg text-coffee-dark mb-1">Resep Praktis</h3>
              <p className="text-xs text-coffee-muted leading-relaxed">
                Rasio gramatur, grind size, dan waktu seduh yang konsisten.
              </p>
            </div>

            <div className="sm:col-span-2 bento-card bg-coffee-dark text-coffee-cream">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Komitmen Kredibilitas</span>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                "Bukan sekadar teori. Semua materi disusun dari alur kerja praktis Foreign Coffee untuk pengalaman seduh yang konsisten."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
