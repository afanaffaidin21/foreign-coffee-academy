import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CheckCircle2, Play, Lock, Sparkles, Layers, Clock, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const courseMap: Record<
    string,
    {
      title: string;
      level: string;
      duration: string;
      description: string;
      instructor: string;
      outcomes: string[];
      requirements: string[];
      modules: {
        title: string;
        lessons: { slug: string; title: string; duration: string; isFree: boolean }[];
      }[];
    }
  > = {
    "barista-fundamentals": {
      title: "Barista Fundamentals: Dari Nol ke Barista",
      level: "Pemula",
      duration: "2 Jam 30 Menit",
      description:
        "Kurikulum komprehensif yang dirancang untuk membangun pemahaman kuat mengenai jenis biji kopi, pengoperasian mesin espresso, kebersihan bar, dan alur pelayanan profesional.",
      instructor: "Foreign Coffee Team",
      outcomes: [
        "Memahami jenis biji kopi Arabika & Robusta serta pengaruh sangrai",
        "Mampu mengoperasikan mesin espresso & grinder standar coffee shop",
        "Kuasai kebersihan alat & standar sanitasi barista profesional",
        "Menjalankan alur pelayanan pelanggan dengan ramah dan efisien",
      ],
      requirements: [
        "Tidak diperlukan pengalaman awal barista",
        "Minat menyeduh dan mempelajari sains dasar kopi",
      ],
      modules: [
        {
          title: "Modul 1: Fondasi Ekstraksi & Biji Kopi",
          lessons: [
            {
              slug: "pengenalan-ekstraksi-kopi",
              title: "Prinsip Dasar Ekstraksi Kopi: Under & Over Extraction",
              duration: "12 Menit",
              isFree: true,
            },
            {
              slug: "mengenal-arabika-robusta",
              title: "Perbedaan Karakter Biji Arabika & Robusta",
              duration: "15 Menit",
              isFree: true,
            },
          ],
        },
        {
          title: "Modul 2: Penyetelan Alat & Standar Barista",
          lessons: [
            {
              slug: "pengoperasian-grinder-dasar",
              title: "Cara Kerja & Penyetelan Dosis Grinder Espresso",
              duration: "18 Menit",
              isFree: false,
            },
            {
              slug: "kebersihan-bar-dan-sanitasi",
              title: "Standar Kebersihan Bar & Perawatan Alat Daily",
              duration: "14 Menit",
              isFree: false,
            },
          ],
        },
      ],
    },
    "espresso-foundations": {
      title: "Espresso Foundations: Dial In & Extraction",
      level: "Pemula - Menengah",
      duration: "3 Jam",
      description:
        "Seni mengendalikan variabel ekstraksi espresso untuk hasil shot yang konsisten, kaya rasa, dan seimbang.",
      instructor: "Foreign Coffee Team",
      outcomes: [
        "Memahami variabel dose, yield, brew time, dan grind size",
        "Mampu melakukan dial in espresso tanpa membuang biji kopi",
        "Mengidentifikasi channelled shot dan solusinya",
      ],
      requirements: ["Akses ke mesin espresso & grinder dasar"],
      modules: [
        {
          title: "Modul 1: Dial In System",
          lessons: [
            {
              slug: "dial-in-espresso-dasar",
              title: "Cara Dial In Espresso Tanpa Membuang Biji Kopi",
              duration: "15 Menit",
              isFree: true,
            },
            {
              slug: "ekstraksi-rasio-yield",
              title: "Menentukan Rasio Brew Ratio & Yield Target",
              duration: "20 Menit",
              isFree: false,
            },
          ],
        },
      ],
    },
    "manual-brew-essentials": {
      title: "Manual Brew Essentials: V60 & Pour-Over",
      level: "Pemula",
      duration: "2 Jam",
      description:
        "Teknik menyeduh manual brew menggunakan V60, Kalita Wave, dan Aeropress untuk kejernihan rasa maksimal.",
      instructor: "Foreign Coffee Team",
      outcomes: [
        "Kuasai metode pour-over 4:6 dan teknik blooming",
        "Mengontrol suhu air dan laju tuangan kettle",
      ],
      requirements: ["Manual brewer V60 & timbangan kopi"],
      modules: [
        {
          title: "Modul 1: Teknik Pouring V60",
          lessons: [
            {
              slug: "v60-pouring-technique",
              title: "Teknik Pouring V60 untuk Clarity Rasa Maksimal",
              duration: "10 Menit",
              isFree: true,
            },
            {
              slug: "penyetelan-acidity-sweetness",
              title: "Meningkatkan Sweetness & Acidity V60",
              duration: "16 Menit",
              isFree: false,
            },
          ],
        },
      ],
    },
  };

  const course = courseMap[params.slug];

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-coffee-cream flex flex-col justify-between">
      <Header />

      <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-12">
        {/* Header Hero Banner */}
        <div className="bg-coffee-dark text-white rounded-3xl p-8 sm:p-12 border border-coffee-dark shadow-bento relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {course.level}
              </span>
              <span className="text-xs text-coffee-cream/80 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {course.duration}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-base sm:text-lg text-coffee-cream/85 leading-relaxed">
              {course.description}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-amber-300">
              <User className="w-4 h-4" />
              <span>Instruktur: {course.instructor}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column: Curriculum & Modules */}
          <div className="lg:col-span-8 space-y-8">
            {/* Outcomes */}
            <div className="bento-card bg-white border border-coffee-border p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-coffee-dark mb-4">
                Apa yang akan kamu pelajari?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.outcomes.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-coffee-muted">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modules & Lessons List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-coffee-dark">
                Kurikulum &amp; Daftar Lesson
              </h2>

              {course.modules.map((mod) => (
                <div key={mod.title} className="bento-card bg-white border border-coffee-border p-6 shadow-sm">
                  <h3 className="font-bold text-lg text-coffee-dark mb-4 border-b border-coffee-light pb-2">
                    {mod.title}
                  </h3>

                  <div className="space-y-3">
                    {mod.lessons.map((lesson) => (
                      <Link
                        key={lesson.slug}
                        href={`/learn/${params.slug}/${lesson.slug}`}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-coffee-cream hover:bg-coffee-card border border-coffee-border transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                              lesson.isFree
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-coffee-dark text-white"
                            }`}
                          >
                            {lesson.isFree ? (
                              <Play className="w-4 h-4 fill-emerald-800 text-emerald-800" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-coffee-dark group-hover:text-coffee-accent transition-colors block">
                              {lesson.title}
                            </span>
                            <span className="text-xs text-coffee-muted">{lesson.duration}</span>
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
              ))}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bento-card bg-white border border-coffee-border p-6 shadow-sm sticky top-24">
              <span className="badge-playful bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
                Preview Gratis Tersedia
              </span>
              <h3 className="font-bold text-lg text-coffee-dark mb-2">
                Mulai Belajar Sekarang
              </h3>
              <p className="text-xs text-coffee-muted mb-6 leading-relaxed">
                Tonton video pengantar gratis tanpa perlu mendaftar atau kartu kredit.
              </p>

              {course.modules[0]?.lessons[0] && (
                <Link href={`/learn/${params.slug}/${course.modules[0].lessons[0].slug}`}>
                  <Button className="w-full justify-center rounded-full bg-coffee-dark text-white hover:bg-coffee-accent font-bold h-12 shadow-md">
                    <span>Tonton Lesson Gratis Pertama</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
