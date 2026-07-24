import React from "react";
import Link from "next/link";
import { Play, Clock, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FreeLessons() {
  const freeLessons = [
    {
      courseSlug: "barista-fundamentals",
      lessonSlug: "pengenalan-ekstraksi-kopi",
      title: "Prinsip Dasar Ekstraksi Kopi: Under & Over Extraction",
      courseName: "Barista Fundamentals",
      duration: "12 Menit",
      description: "Memahami rasa pahit, asam, dan manis dalam cangkir melalui eksperimen rasio air.",
    },
    {
      courseSlug: "espresso-foundations",
      lessonSlug: "dial-in-espresso-dasar",
      title: "Cara Dial In Espresso Tanpa Membuang Biji Kopi",
      courseName: "Espresso Foundations",
      duration: "15 Menit",
      description: "Langkah sistematis mengatur grind size grinder sesuai target waktu dan yield gramatur.",
    },
    {
      courseSlug: "manual-brew-essentials",
      lessonSlug: "v60-pouring-technique",
      title: "Teknik Pouring V60 untuk Clarity Rasa Maksimal",
      courseName: "Manual Brew Essentials",
      duration: "10 Menit",
      description: "Cara mengontrol aliran air, blooming, dan agitasi saat menyeduh manual brew V60.",
    },
  ];

  return (
    <section className="py-20 bg-coffee-cream border-t border-coffee-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="badge-playful bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
              Materi Gratis Terpilih
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-coffee-dark tracking-tight">
              Coba tonton materi gratis sebelum mendaftar.
            </h2>
          </div>
          <p className="text-sm text-coffee-muted max-w-md">
            Semua video gratis dapat diakses langsung tanpa syarat kartu kredit atau akun berbayar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {freeLessons.map((lesson) => (
            <div
              key={lesson.lessonSlug}
              className="bento-card bg-white border border-coffee-border flex flex-col justify-between group shadow-sm hover:shadow-bento transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Gratis
                  </span>
                  <span className="text-xs text-coffee-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.duration}
                  </span>
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-coffee-accent block mb-1">
                  {lesson.courseName}
                </span>

                <h3 className="text-lg font-bold text-coffee-dark mb-3 group-hover:text-coffee-accent transition-colors leading-snug">
                  {lesson.title}
                </h3>

                <p className="text-xs sm:text-sm text-coffee-muted leading-relaxed mb-6">
                  {lesson.description}
                </p>
              </div>

              <Link href={`/learn/${lesson.courseSlug}/${lesson.lessonSlug}`}>
                <Button className="w-full justify-between rounded-full bg-coffee-dark text-white hover:bg-coffee-accent transition-all font-bold">
                  <span className="flex items-center gap-2">
                    <Play className="w-4 h-4 fill-current" />
                    <span>Tonton Lesson Gratis</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
