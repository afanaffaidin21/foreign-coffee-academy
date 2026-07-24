import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FreeLessons() {
  const freeLessons = [
    {
      courseSlug: "barista-fundamentals",
      lessonSlug: "pengenalan-ekstraksi-kopi",
      title: "Prinsip Dasar Ekstraksi Kopi: Under & Over Extraction",
      courseName: "Barista Fundamentals",
      duration: "12 Menit",
      image: "/images/lessons/lesson-extraction-basics.jpg",
      description: "Memahami rasa pahit, asam, dan manis dalam cangkir melalui eksperimen rasio air.",
    },
    {
      courseSlug: "espresso-foundations",
      lessonSlug: "dial-in-espresso-dasar",
      title: "Cara Dial In Espresso Tanpa Membuang Biji Kopi",
      courseName: "Espresso Foundations",
      duration: "15 Menit",
      image: "/images/lessons/lesson-bean-varieties.jpg",
      description: "Langkah sistematis mengatur grind size grinder sesuai target waktu dan yield gramatur.",
    },
    {
      courseSlug: "manual-brew-essentials",
      lessonSlug: "v60-pouring-technique",
      title: "Teknik Pouring V60 untuk Clarity Rasa Maksimal",
      courseName: "Manual Brew Essentials",
      duration: "10 Menit",
      image: "/images/lessons/lesson-grinder-setup.jpg",
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
              className="bento-card bg-white border border-coffee-border flex flex-col justify-between group shadow-sm hover:shadow-bento hover:-translate-y-1 transition-all overflow-hidden p-0"
            >
              {/* Media Thumbnail Container (16:9 Aspect Ratio with Floating Play Button) */}
              <div className="aspect-[16/9] relative w-full overflow-hidden bg-coffee-dark">
                <Image
                  src={lesson.image}
                  alt={lesson.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Floating Play Affordance */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-coffee-dark flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-coffee-accent group-hover:text-white transition-all">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Gratis
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-300" />
                    {lesson.duration}
                  </span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-coffee-accent block mb-1">
                    {lesson.courseName}
                  </span>

                  <h3 className="text-lg font-bold text-coffee-dark mb-2 group-hover:text-coffee-accent transition-colors leading-snug">
                    {lesson.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-coffee-muted leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                <Link href={`/learn/${lesson.courseSlug}/${lesson.lessonSlug}`} className="pt-2">
                  <Button className="w-full justify-between rounded-full bg-coffee-dark text-white hover:bg-coffee-accent transition-all font-bold h-11 text-xs shadow-sm">
                    <span className="flex items-center gap-2">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Tonton Lesson Gratis</span>
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
