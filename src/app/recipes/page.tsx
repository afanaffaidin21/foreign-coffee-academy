import React from "react";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Coffee, Flame, Droplets, Clock, Heart } from "lucide-react";

export default function RecipesPage() {
  const recipes = [
    {
      slug: "v60-metode-46",
      title: "Resep V60 Metode 4:6 (Tetsu Kasuya)",
      method: "Manual Brew V60",
      dose: "20g Biji Kopi",
      water: "300ml Air (92°C)",
      grind: "Coarse / Agak Kasar",
      time: "3 Menit 30 Detik",
      notes: "40% air awal untuk kontrol manis & asam, 60% sisa air untuk strength.",
    },
    {
      slug: "espresso-classic-ratio",
      title: "Resep Espresso Klasik 1:2",
      method: "Espresso Machine",
      dose: "18g Biji Kopi",
      water: "36g Yield Espresso",
      grind: "Fine / Halus",
      time: "27 - 30 Detik",
      notes: "Crema tebal, acidity seimbang dengan aroma cokelat manis.",
    },
    {
      slug: "iced-latte-house-blend",
      title: "Resep Iced Cafe Latte Coffee Shop",
      method: "Espresso & Milk",
      dose: "18g Double Shot",
      water: "120ml Fresh Milk + Es",
      grind: "Fine",
      time: "2 Menit",
      notes: "Kombinasi microfoam dingin dengan espresso double shot manis gurih.",
    },
  ];

  return (
    <div className="min-h-screen bg-coffee-cream flex flex-col justify-between">
      <Header />

      <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-12">
          <span className="badge-playful bg-coffee-card text-coffee-accent border border-coffee-border mb-3">
            Perpustakaan Resep Praktis
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-coffee-dark tracking-tight mb-4">
            Resep Kopi Siap Pakai
          </h1>
          <p className="text-base sm:text-lg text-coffee-muted leading-relaxed">
            Formulasi gramatur, rasio air, suhu, dan waktu seduh yang teruji di bar Foreign Coffee untuk rasa kopi yang konsisten di rumah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {recipes.map((recipe) => (
            <div
              key={recipe.slug}
              className="bento-card bg-white border border-coffee-border flex flex-col justify-between shadow-sm hover:shadow-bento transition-all p-6 sm:p-8"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-coffee-accent block mb-1">
                  {recipe.method}
                </span>
                <h2 className="text-xl font-bold text-coffee-dark mb-4 leading-snug">
                  {recipe.title}
                </h2>

                <div className="space-y-2 bg-coffee-cream p-4 rounded-2xl border border-coffee-border text-xs font-semibold text-coffee-dark mb-4">
                  <div className="flex justify-between">
                    <span className="text-coffee-muted">Dosis Kopi:</span>
                    <span>{recipe.dose}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-muted">Target Air:</span>
                    <span>{recipe.water}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-muted">Grind Size:</span>
                    <span>{recipe.grind}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-muted">Waktu Brew:</span>
                    <span>{recipe.time}</span>
                  </div>
                </div>

                <p className="text-xs text-coffee-muted leading-relaxed">
                  {recipe.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
