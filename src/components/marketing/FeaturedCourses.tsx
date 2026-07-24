import React from "react";
import Link from "next/link";
import { BookOpen, Layers, PlayCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedCourses() {
  const courses = [
    {
      slug: "barista-fundamentals",
      title: "Barista Fundamentals: Dari Nol ke Barista",
      level: "Pemula",
      modulesCount: 4,
      lessonsCount: 16,
      freePreviews: 3,
      description: "Fondasi lengkap seputar jenis biji kopi, pengenalan mesin espresso, kebersihan bar, dan alur pelayanan.",
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

  return (
    <section className="py-20 bg-coffee-cream border-t border-coffee-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="badge-playful bg-coffee-card text-coffee-accent border border-coffee-border mb-3">
              Katalog Utama
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-coffee-dark tracking-tight">
              Course terstruktur untuk setiap tahap belajar.
            </h2>
          </div>
          <Link href="/courses">
            <Button variant="outline" className="rounded-2xl border-coffee-border">
              <span>Lihat Semua Course</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.slug}
              className="bento-card bg-white border-coffee-border flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-coffee-card text-coffee-dark border border-coffee-border">
                    {course.level}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    {course.freePreviews} Preview Gratis
                  </span>
                </div>

                <h3 className="text-xl font-bold text-coffee-dark mb-3 group-hover:text-coffee-accent transition-colors">
                  {course.title}
                </h3>

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
                  <Button className="w-full justify-between rounded-2xl bg-coffee-dark text-white hover:bg-coffee-accent transition-colors">
                    <span>Lihat Detail Course</span>
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
