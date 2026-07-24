import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ArrowRight, BookOpen, Sparkles, Layers, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HubDetailPage({ params }: { params: { slug: string } }) {
  const hubs: Record<
    string,
    {
      title: string;
      description: string;
      featuredCourseSlug: string;
      featuredCourseTitle: string;
      curatedLessons: { courseSlug: string; lessonSlug: string; title: string; isFree: boolean }[];
    }
  > = {
    espresso: {
      title: "Espresso & Dial In Hub",
      description: "Pusat pembelajaran ekstraksi espresso, rasio dose/yield, dan penyetelan grind size.",
      featuredCourseSlug: "espresso-foundations",
      featuredCourseTitle: "Espresso Foundations: Dial In & Extraction",
      curatedLessons: [
        {
          courseSlug: "espresso-foundations",
          lessonSlug: "dial-in-espresso-dasar",
          title: "Cara Dial In Espresso Tanpa Membuang Biji Kopi",
          isFree: true,
        },
        {
          courseSlug: "espresso-foundations",
          lessonSlug: "ekstraksi-rasio-yield",
          title: "Menentukan Rasio Brew Ratio & Yield Target",
          isFree: false,
        },
      ],
    },
    "manual-brew": {
      title: "Manual Brew V60 Hub",
      description: "Teknik menyeduh pour over V60, kontrol temperatur air, dan ekstraksi aroma yang seimbang.",
      featuredCourseSlug: "manual-brew-essentials",
      featuredCourseTitle: "Manual Brew Essentials: V60 & Pour-Over",
      curatedLessons: [
        {
          courseSlug: "manual-brew-essentials",
          lessonSlug: "v60-pouring-technique",
          title: "Teknik Pouring V60 untuk Clarity Rasa Maksimal",
          isFree: true,
        },
      ],
    },
    "barista-fundamentals": {
      title: "Fondasi Barista Hub",
      description: "Standard Operating Procedure (SOP) barista coffee shop profesional, sanitasi, dan alur bar.",
      featuredCourseSlug: "barista-fundamentals",
      featuredCourseTitle: "Barista Fundamentals: Dari Nol ke Barista",
      curatedLessons: [
        {
          courseSlug: "barista-fundamentals",
          lessonSlug: "pengenalan-ekstraksi-kopi",
          title: "Prinsip Dasar Ekstraksi Kopi: Under & Over Extraction",
          isFree: true,
        },
      ],
    },
  };

  const hub = hubs[params.slug] || {
    title: `${params.slug.toUpperCase()} Hub`,
    description: `Kumpulan materi pembelajaran terkurasi untuk ${params.slug}.`,
    featuredCourseSlug: "barista-fundamentals",
    featuredCourseTitle: "Barista Fundamentals",
    curatedLessons: [
      {
        courseSlug: "barista-fundamentals",
        lessonSlug: "pengenalan-ekstraksi-kopi",
        title: "Prinsip Dasar Ekstraksi Kopi",
        isFree: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-coffee-cream flex flex-col justify-between">
      <Header />

      <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-10">
        <div className="bg-coffee-dark text-white rounded-3xl p-8 sm:p-12 border border-coffee-dark shadow-bento">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Learning Hub</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {hub.title}
          </h1>
          <p className="text-base sm:text-lg text-coffee-cream/85 leading-relaxed max-w-2xl">
            {hub.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-extrabold text-coffee-dark">
              Materi Video Terkurasi
            </h2>

            <div className="space-y-3">
              {hub.curatedLessons.map((lesson) => (
                <Link
                  key={lesson.lessonSlug}
                  href={`/learn/${lesson.courseSlug}/${lesson.lessonSlug}`}
                  className="bento-card bg-white border border-coffee-border p-5 flex items-center justify-between group shadow-sm hover:shadow-bento transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-coffee-card text-coffee-accent flex items-center justify-center">
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-coffee-dark group-hover:text-coffee-accent transition-colors">
                        {lesson.title}
                      </h3>
                      <span className="text-xs text-coffee-muted font-medium">Course: {lesson.courseSlug}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      lesson.isFree
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-amber-50 text-amber-900 border-amber-200"
                    }`}
                  >
                    {lesson.isFree ? "Gratis" : "Premium"}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bento-card bg-white border border-coffee-border p-6 shadow-sm sticky top-24">
              <span className="text-xs font-bold uppercase tracking-wider text-coffee-accent block mb-2">
                Course Rekomendasi
              </span>
              <h3 className="font-bold text-lg text-coffee-dark mb-3 leading-snug">
                {hub.featuredCourseTitle}
              </h3>
              <Link href={`/courses/${hub.featuredCourseSlug}`}>
                <Button className="w-full justify-between rounded-full bg-coffee-dark text-white hover:bg-coffee-accent font-bold">
                  <span>Lihat Detail Course</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
