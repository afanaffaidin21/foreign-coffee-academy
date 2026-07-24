import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StarterPath() {
  const steps = [
    {
      step: "01",
      title: "Pahami Biji Kopi & Ekstraksi",
      description: "Pelajari bagaimana grind size, rasio air, dan temperatur memengaruhi rasa asam, manis, dan pahit.",
    },
    {
      step: "02",
      title: "Pilih Alat & Praktik Manual Brew",
      description: "Seduh kopi pertamamu dengan V60 atau Aeropress menggunakan panduan resep praktis.",
    },
    {
      step: "03",
      title: "Penyetelan Espresso & Microfoam",
      description: "Kuasai teknik dial in espresso konsisten dan steamed milk untuk latte art dasar.",
    },
    {
      step: "04",
      title: "Alur Kerja Coffee Shop Nyata",
      description: "Terapkan manajemen waktu, kebersihan alat, dan standar servis barista profesional.",
    },
  ];

  return (
    <section className="py-20 bg-coffee-card border-t border-coffee-light/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge-playful bg-white text-coffee-accent border border-coffee-border mb-3">
            Alur Pemula
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-coffee-dark tracking-tight mb-4">
            Langkah terstruktur dari nol hingga mahir menyeduh.
          </h2>
          <p className="text-base sm:text-lg text-coffee-muted">
            Tidak perlu ragu harus mulai dari mana. Ikuti 4 tahap terarah untuk membangun kebiasaan menyeduh yang konsisten.
          </p>
        </div>

        {/* Connected Steps Grid with Horizontal Connector Line */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-coffee-accent/30 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((item, idx) => (
              <div
                key={item.step}
                className="bento-card bg-white border border-coffee-border flex flex-col justify-between shadow-sm hover:shadow-bento hover:-translate-y-1 transition-all relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-coffee-accent text-white font-extrabold flex items-center justify-center text-base shadow-sm group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    {idx < steps.length - 1 && (
                      <ChevronRight className="w-5 h-5 text-coffee-accent/40 hidden lg:block" />
                    )}
                  </div>

                  <h3 className="font-bold text-lg text-coffee-dark mb-2 group-hover:text-coffee-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-coffee-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-coffee-light/40 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Teruji di Coffee Shop</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/courses">
            <Button size="lg" className="bg-coffee-dark text-white hover:bg-coffee-accent rounded-full h-12 px-8 font-bold shadow-md transition-all">
              <span>Mulai Alur Pemula Sekarang</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
