import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, CheckCircle2, Zap, Play, BookOpen, Layers, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-8 pb-16 overflow-hidden relative">
      {/* Soft Background Accent Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-200/25 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Photo-Led Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <div className="badge-playful bg-coffee-card text-coffee-accent border border-coffee-border">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-coffee-terracotta" />
              Platform Belajar Kopi Rumah &amp; Barista Pemula
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-coffee-dark leading-[1.12] tracking-tight">
              Belajar kopi menjadi lebih mudah, terstruktur &amp; menyenangkan.
            </h1>

            <p className="text-base sm:text-lg text-coffee-muted leading-relaxed max-w-2xl">
              Hubungkan teori ekstraksi, teknik manual brew, dan alur kerja coffee shop nyata melalui course, Coffee Guide, dan resep siap pakai berbahasa Indonesia.
            </p>

            {/* CTAs */}
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
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-coffee-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tanpa perlu login untuk lesson gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Alur praktik nyata coffee shop</span>
              </div>
            </div>
          </div>

          {/* Photo-Led Large Hero Showcase Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[32px] overflow-hidden shadow-bento border-4 border-white bg-coffee-dark group">
              <div className="aspect-[4/3] relative w-full overflow-hidden">
                <Image
                  src="/images/home/hero-coffee-workflow.jpg"
                  alt="Barista brewing coffee workflow illustration"
                  width={1600}
                  height={1200}
                  priority
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/80 via-coffee-dark/20 to-transparent" />
              </div>

              {/* Floating Overlay Badge on Hero Image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-coffee-border rounded-2xl p-4 shadow-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-coffee-dark flex items-center justify-center font-bold shrink-0">
                    <Play className="w-5 h-5 fill-coffee-dark" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-coffee-dark block">Preview Video Lesson</span>
                    <span className="text-xs text-coffee-muted block">100% Gratis Tanpa Kartu Kredit</span>
                  </div>
                </div>
                <Link href="/courses">
                  <span className="text-xs font-extrabold text-coffee-accent hover:underline hidden sm:inline-block">
                    Tonton Sekarang &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Benefit Panel Below Hero */}
        <div className="bg-white border border-coffee-border rounded-3xl p-6 sm:p-8 shadow-bento">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-coffee-light">
            <div className="flex items-start gap-4 pt-4 md:pt-0 md:px-4 first:pl-0">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <Play className="w-6 h-6 fill-amber-900" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-coffee-dark">Materi Gratis</h3>
                <p className="text-xs text-coffee-muted leading-relaxed">
                  Coba selected lessons sebelum berlangganan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 md:pt-0 md:px-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-emerald-800" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-coffee-dark">Resep Praktis</h3>
                <p className="text-xs text-coffee-muted leading-relaxed">
                  Parameter dan troubleshooting yang mudah dipraktikkan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 md:pt-0 md:px-6">
              <div className="w-12 h-12 rounded-2xl bg-coffee-card border border-coffee-border text-coffee-accent flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-coffee-dark">Jalur Belajar</h3>
                <p className="text-xs text-coffee-muted leading-relaxed">
                  Topik terstruktur dari fondasi hingga keterampilan lanjutan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
