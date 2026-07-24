import React from "react";
import Link from "next/link";
import { ArrowRight, Flame, Droplets, Heart, Bean, UserCheck, Sparkles } from "lucide-react";

export function LearningGoals() {
  const goals = [
    {
      slug: "espresso",
      title: "Espresso & Dial In",
      description: "Pahami variabel grind size, dose, yield, dan waktu ekstraksi espresso yang konsisten.",
      icon: Flame,
      color: "bg-amber-100 text-amber-900 border-amber-200",
      lessonsCount: "8 Lesson",
    },
    {
      slug: "manual-brew",
      title: "Manual Brew V60",
      description: "Kuasai rasio seduh, pouring technique, dan penyetelan acidity & sweetness.",
      icon: Droplets,
      color: "bg-orange-100 text-orange-900 border-orange-200",
      lessonsCount: "10 Lesson",
    },
    {
      slug: "latte-art",
      title: "Latte Art & Milk Texturing",
      description: "Buihkan microfoam selemput sutra dan bentuk pola heart & tulip dasar.",
      icon: Heart,
      color: "bg-rose-100 text-rose-900 border-rose-200",
      lessonsCount: "6 Lesson",
    },
    {
      slug: "coffee-beans",
      title: "Biji Kopi & Sangrai",
      description: "Kenali asal-usul origin, proses pasca-panen, dan tingkat sangrai kopi.",
      icon: Bean,
      color: "bg-emerald-100 text-emerald-900 border-emerald-200",
      lessonsCount: "7 Lesson",
    },
    {
      slug: "barista-fundamentals",
      title: "Fondasi Barista",
      description: "Alur kerja standar coffee shop, kebersihan alat, dan komunikasi pelanggan.",
      icon: UserCheck,
      color: "bg-stone-100 text-stone-900 border-stone-200",
      lessonsCount: "12 Lesson",
    },
    {
      slug: "sensory-tasting",
      title: "Sensory & Tasting Kopi",
      description: "Kembangkan kepekaan lidah, pahami cupping score, flavor wheel, dan deskripsi aroma.",
      icon: Sparkles,
      color: "bg-purple-100 text-purple-900 border-purple-200",
      lessonsCount: "5 Lesson",
    },
  ];

  return (
    <section className="py-16 bg-coffee-cream border-t border-coffee-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="badge-playful bg-coffee-card text-coffee-accent border border-coffee-border mb-3">
              Pilih Tujuan Belajar
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-coffee-dark tracking-tight">
              Mulai dari apa yang ingin kamu kuasai hari ini.
            </h2>
          </div>
          <Link
            href="/belajar"
            className="inline-flex items-center gap-2 text-sm font-bold text-coffee-accent hover:text-coffee-dark transition-colors"
          >
            <span>Lihat semua alur belajar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Balanced 3x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <Link
                key={goal.slug}
                href={`/belajar/${goal.slug}`}
                className="bento-card bg-white border border-coffee-border flex flex-col justify-between group shadow-sm hover:shadow-bento hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${goal.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-coffee-card text-coffee-muted border border-coffee-light/40">
                      {goal.lessonsCount}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-coffee-dark mb-2 group-hover:text-coffee-accent transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-sm text-coffee-muted leading-relaxed mb-6">
                    {goal.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-coffee-dark group-hover:text-coffee-accent">
                  <span>Jelajahi Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
