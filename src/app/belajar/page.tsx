import React from "react";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ArrowRight, Flame, Droplets, Heart, Bean, UserCheck, Sparkles } from "lucide-react";

export default function LearningHubsOverviewPage() {
  const hubs = [
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
    <div className="min-h-screen bg-coffee-cream flex flex-col justify-between">
      <Header />

      <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-12">
          <span className="badge-playful bg-coffee-card text-coffee-accent border border-coffee-border mb-3">
            Pilih Tujuan Belajar
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-coffee-dark tracking-tight mb-4">
            Pilih Alur Pembelajaranmu
          </h1>
          <p className="text-base sm:text-lg text-coffee-muted leading-relaxed">
            Setiap hub mengelompokkan materi video, panduan seduh, dan resep praktis sesuai keterampilan spesifik yang ingin kamu kuasai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {hubs.map((hub) => {
            const Icon = hub.icon;
            return (
              <Link
                key={hub.slug}
                href={`/belajar/${hub.slug}`}
                className="bento-card bg-white border border-coffee-border flex flex-col justify-between group shadow-sm hover:shadow-bento hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${hub.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-coffee-card text-coffee-muted border border-coffee-light/40">
                      {hub.lessonsCount}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-coffee-dark mb-2 group-hover:text-coffee-accent transition-colors">
                    {hub.title}
                  </h2>
                  <p className="text-sm text-coffee-muted leading-relaxed mb-6">
                    {hub.description}
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
      </main>

      <Footer />
    </div>
  );
}
