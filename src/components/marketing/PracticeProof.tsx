import React from "react";
import { ShieldCheck, Scale, Thermometer, Gauge } from "lucide-react";

export function PracticeProof() {
  const proofItems = [
    {
      title: "Rasio Gramatur Presisi",
      detail: "Setiap resep mencantumkan rasio dosis & yield spesifik (misal 1:2 espresso, 1:15 V60) yang teruji konsisten di bar.",
      icon: Scale,
    },
    {
      title: "Variabel Ekstraksi Nyata",
      detail: "Penyesuaian grind size, tekanan tamping, dan temperatur air dijelaskan dengan alasan saintifik sederhana.",
      icon: Thermometer,
    },
    {
      title: "Alur Kerja Barista Efisien",
      detail: "Simulasi gerakan tangan, dosing, milk texturing, dan kebersihan alat sesuai standar coffee shop komersial.",
      icon: Gauge,
    },
  ];

  return (
    <section className="py-20 bg-coffee-dark text-coffee-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Praktik Tanpa Basa-Basi</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Materi yang dirancang dari pengamatan nyata di bar kopi.
            </h2>

            <p className="text-base text-coffee-cream/80 leading-relaxed">
              Kami tidak memublikasikan ulasan palsu, sertifikat instan tanpa ujian, atau klaim berlebihan. Semua modul difokuskan pada skill seduh repeatable yang bisa kamu praktikkan hari ini juga.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {proofItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/10 transition-colors"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-coffee-cream/70 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
