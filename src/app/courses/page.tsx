import React from "react";
import Link from "next/link";
import { Coffee, Layers, PlayCircle, ArrowRight, Search, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function CourseCatalogPage({
  searchParams,
}: {
  searchParams?: { level?: string; q?: string };
}) {
  const selectedLevel = searchParams?.level || "all";
  const searchQuery = (searchParams?.q || "").toLowerCase();

  const allCourses = [
    {
      slug: "barista-fundamentals",
      title: "Barista Fundamentals: Dari Nol ke Barista",
      level: "Pemula",
      modulesCount: 4,
      lessonsCount: 16,
      freePreviews: 3,
      description: "Fondasi lengkap seputar jenis biji kopi, pengenalan mesin espresso, kebersihan bar, dan alur pelayanan barista.",
    },
    {
      slug: "espresso-foundations",
      title: "Espresso Foundations: Dial In & Extraction",
      level: "Pemula - Menengah",
      modulesCount: 5,
      lessonsCount: 18,
      freePreviews: 2,
      description: "Kuasai seni mengendalikan variabel ekstraksi espresso untuk hasil shot yang kaya aroma, balance, dan konsisten.",
    },
    {
      slug: "manual-brew-essentials",
      title: "Manual Brew Essentials: V60 & Pour-Over",
      level: "Pemula",
      modulesCount: 4,
      lessonsCount: 14,
      freePreviews: 3,
      description: "Teknik menyeduh manual brew menggunakan alat populer seperti Hario V60, Kalita Wave, dan Aeropress.",
    },
  ];

  const filteredCourses = allCourses.filter((course) => {
    const matchesLevel =
      selectedLevel === "all" ||
      course.level.toLowerCase().includes(selectedLevel.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      course.title.toLowerCase().includes(searchQuery) ||
      course.description.toLowerCase().includes(searchQuery);
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-coffee-cream flex flex-col justify-between">
      <Header />

      <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="badge-playful bg-coffee-card text-coffee-accent border border-coffee-border mb-3">
            Katalog Course Utama
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-coffee-dark tracking-tight mb-4">
            Kurikulum Praktis Seduh Kopi
          </h1>
          <p className="text-base sm:text-lg text-coffee-muted leading-relaxed">
            Pilih course sesuai tingkat kemahiranmu. Nikmati preview lesson gratis pada setiap course sebelum mendaftar keanggotaan premium.
          </p>
        </div>

        {/* Search & Level Filter Controls */}
        <div className="bg-white border border-coffee-border rounded-3xl p-6 mb-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Level Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-coffee-muted mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Level:
            </span>
            {[
              { label: "Semua Level", value: "all" },
              { label: "Pemula", value: "pemula" },
              { label: "Menengah", value: "menengah" },
            ].map((tab) => (
              <Link
                key={tab.value}
                href={`/courses?level=${tab.value}${searchQuery ? `&q=${searchQuery}` : ""}`}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedLevel === tab.value
                    ? "bg-coffee-dark text-white shadow-sm"
                    : "bg-coffee-cream text-coffee-dark border border-coffee-border hover:bg-coffee-card"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {filteredCourses.map((course) => (
            <div
              key={course.slug}
              className="bento-card bg-white border border-coffee-border flex flex-col justify-between group shadow-sm hover:shadow-bento transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-coffee-card text-coffee-dark border border-coffee-border">
                    {course.level}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/50">
                    {course.freePreviews} Preview Gratis
                  </span>
                </div>

                <h2 className="text-xl font-bold text-coffee-dark mb-3 group-hover:text-coffee-accent transition-colors leading-snug">
                  {course.title}
                </h2>

                <p className="text-xs sm:text-sm text-coffee-muted leading-relaxed mb-6">
                  {course.description}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 text-xs font-semibold text-coffee-muted mb-6 pt-4 border-t border-coffee-light/40">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-coffee-accent" />
                    <span>{course.modulesCount} Modul</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <PlayCircle className="w-4 h-4 text-coffee-accent" />
                    <span>{course.lessonsCount} Lesson</span>
                  </div>
                </div>

                <Link href={`/courses/${course.slug}`}>
                  <Button className="w-full justify-between rounded-full bg-coffee-dark text-white hover:bg-coffee-accent transition-colors font-bold">
                    <span>Lihat Detail Course</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
