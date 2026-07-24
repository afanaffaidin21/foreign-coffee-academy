import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Play, CheckCircle2, ShieldCheck, Zap, Quote } from "lucide-react";
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

            {/* CTAs matched to Image 1 Button Style */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/courses">
                <Button size="lg" className="bg-coffee-dark text-white hover:bg-coffee-accent rounded-full h-12 px-7 font-bold shadow-md transition-all">
                  <span>Mulai dari materi gratis</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/belajar">
                <Button size="lg" variant="outline" className="bg-white text-coffee-dark border-coffee-border hover:bg-coffee-card rounded-full h-12 px-7 font-bold transition-all">
                  <span>Lihat Alur Belajar</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 opacity-60" />
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

          {/* Hero Soft Bento Visual Column - Fixed High Contrast Rendering */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bento-card bg-white border border-coffee-border text-coffee-dark shadow-sm">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Play className="w-5 h-5 fill-amber-800" />
              </div>
              <h3 className="font-bold text-lg text-coffee-dark mb-1">Free Lesson Access</h3>
              <p className="text-xs text-coffee-muted leading-relaxed">
                Tonton video ekstraksi &amp; teknik seduh gratis tanpa paywall awal.
              </p>
            </div>

            <div className="bento-card bg-coffee-card border border-coffee-border text-coffee-dark shadow-sm">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 font-bold text-lg">
                V60
              </div>
              <h3 className="font-bold text-lg text-coffee-dark mb-1">Resep Praktis</h3>
              <p className="text-xs text-coffee-muted leading-relaxed">
                Rasio gramatur, grind size, dan waktu seduh yang konsisten.
              </p>
            </div>

            {/* High Contrast Dark Bento Card */}
            <div className="sm:col-span-2 bento-card bg-coffee-dark text-white border border-coffee-dark shadow-lg shadow-coffee-dark/10 p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Komitmen Kredibilitas</span>
                </div>
                <Quote className="w-5 h-5 text-amber-400/60" />
              </div>
              <p className="text-sm text-coffee-cream font-medium leading-relaxed">
                "Bukan sekadar teori. Semua materi disusun dari alur kerja praktis Foreign Coffee untuk pengalaman seduh yang konsisten."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
