import React from "react";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { BookOpen, Sparkles, Sliders, Thermometer, Droplets } from "lucide-react";

export default function GuidesPage() {
  const guides = [
    {
      slug: "panduan-grind-size",
      title: "Panduan Grind Size: Dari Fine ke Coarse",
      category: "Grinder & Ekstraksi",
      icon: Sliders,
      description: "Tabel visual tingkat kehalusan gilingan biji kopi untuk V60, Espresso, Aeropress, dan French Press.",
    },
    {
      slug: "suhu-air-dan-rasio",
      title: "Suhu Air & Brew Ratio Ideal Manual Brew",
      category: "Manual Brew",
      icon: Thermometer,
      description: "Pengaruh temperatur air 88°C - 94°C terhadap ekstraksi keasaman dan kemanisan.",
    },
    {
      slug: "kalkulator-ekstraksi",
      title: "Kalkulator Ekstraksi Kopi Rumah",
      category: "Sains Kopi",
      icon: Droplets,
      description: "Cara menghitung rasio 1:15, 1:16, dan menentukan yield espresso secara presisi.",
    },
  ];

  return (
    <div className="min-h-screen bg-coffee-cream flex flex-col justify-between">
      <Header />

      <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-12">
          <span className="badge-playful bg-coffee-card text-coffee-accent border border-coffee-border mb-3">
            Coffee Guide Library
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-coffee-dark tracking-tight mb-4">
            Panduan Seduh Kopi
          </h1>
          <p className="text-base sm:text-lg text-coffee-muted leading-relaxed">
            Referensi praktis teori ekstraksi, tabel grind size, dan kalkulator rasio air untuk memandu seduhan harianmu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <div
                key={guide.slug}
                className="bento-card bg-white border border-coffee-border flex flex-col justify-between shadow-sm hover:shadow-bento transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 border border-amber-200 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-coffee-accent block mb-1">
                    {guide.category}
                  </span>
                  <h2 className="text-xl font-bold text-coffee-dark mb-2">
                    {guide.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-coffee-muted leading-relaxed mb-6">
                    {guide.description}
                  </p>
                </div>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 inline-block w-fit">
                  Panduan Siap Pakai
                </span>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
