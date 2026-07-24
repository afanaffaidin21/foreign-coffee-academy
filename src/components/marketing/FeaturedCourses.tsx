import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Layers, PlayCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedCourses() {
  const courses = [
    {
      slug: "barista-fundamentals",
      title: "Barista Fundamentals: Dari Nol ke Barista",
      level: "Pemula",
      image: "/images/courses/barista-fundamentals.jpg",
      modulesCount: 4,
      lessonsCount: 16,
      freePreviews: 3,
      description: "Fondasi lengkap seputar jenis biji kopi, pengenalan mesin espresso, kebersihan bar, dan alur pelayanan.",
    },
    {
      slug: "espresso-foundations",
      title: "Espresso Foundations: Dial In & Extraction",
      level: "Pemula - Menengah",
      image: "/images/courses/espresso-foundations.jpg",
      modulesCount: 5,
      lessonsCount: 18,
      freePreviews: 2,
      description: "Kuasai seni mengendalikan variabel ekstraksi espresso untuk hasil shot yang kaya aroma, balance, dan konsisten.",
    },
    {
      slug: "manual-brew-essentials",
      title: "Manual Brew Essentials: V60 & Pour-Over",
      level: "Pemula",
      image: "/images/courses/manual-brew-essentials.jpg",
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
            <Button variant="outline" className="rounded-full bg-white border-coffee-border hover:bg-coffee-card text-coffee-dark font-semibold">
              <span>Lihat Semua Course</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.slug}
              className="bento-card bg-white border border-coffee-border flex flex-col justify-between group shadow-sm hover:shadow-bento hover:-translate-y-1 transition-all overflow-hidden p-0"
            >
              {/* Course Card Photo Area */}
              <div className="aspect-[16/10] relative w-full overflow-hidden bg-coffee-dark">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={1000}
                  height={625}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white text-coffee-dark border border-coffee-border shadow-sm">
                    {course.level}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    {course.freePreviews} Preview Gratis
                  </span>
                </div>
              </div>

              {/* Course Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-coffee-dark mb-3 group-hover:text-coffee-accent transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-coffee-muted leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-coffee-muted mb-4 pt-3 border-t border-coffee-light/50">
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
                    <Button className="w-full justify-between rounded-full bg-coffee-dark text-white hover:bg-coffee-accent transition-colors font-bold h-11 text-xs shadow-sm">
                      <span>Lihat Detail Course</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
