import Link from "next/link";
import { Coffee, Sparkles, BookOpen, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Announcement Banner */}
      <div className="bg-coffee-dark text-coffee-cream px-4 py-2.5 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
        <span className="bg-coffee-terracotta text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
          Demo Sandbox
        </span>
        <span>Modul Midtrans Sandbox & Pembelajaran Gratis Aktif</span>
      </div>

      {/* Navigation Header */}
      <header className="w-full border-b border-coffee-light/60 bg-coffee-cream/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-coffee-accent flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <Coffee className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-coffee-dark">
              foreign coffee academy
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-coffee-muted">
            <Link href="/belajar" className="hover:text-coffee-dark transition-colors">
              Alur Belajar
            </Link>
            <Link href="/courses" className="hover:text-coffee-dark transition-colors">
              Course
            </Link>
            <Link href="/guides" className="hover:text-coffee-dark transition-colors">
              Coffee Guide
            </Link>
            <Link href="/recipes" className="hover:text-coffee-dark transition-colors">
              Recipe
            </Link>
            <Link href="/membership" className="hover:text-coffee-dark transition-colors">
              Membership
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-coffee-dark hover:text-coffee-accent transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/courses"
              className="px-5 py-2.5 rounded-2xl bg-coffee-dark text-coffee-cream text-sm font-semibold hover:bg-coffee-accent transition-all shadow-sm hover:shadow-md"
            >
              Mulai Belajar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 pt-16 pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="badge-playful bg-coffee-card text-coffee-accent border border-coffee-border">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Platform Belajar Kopi Rumah & Barista Pemula
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-coffee-dark leading-[1.15] tracking-tight">
              Belajar kopi jadi lebih mudah, terstruktur &amp; menyenangkan.
            </h1>

            <p className="text-lg text-coffee-muted leading-relaxed max-w-2xl">
              Hubungkan teori ekstraksi, teknik manual brew, dan alur kerja coffee shop nyata melalui video lesson gratis, panduan praktis, dan resep siap pakai.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/courses"
                className="px-7 py-4 rounded-3xl bg-coffee-accent text-white font-bold hover:bg-coffee-dark transition-all shadow-bento hover:shadow-bento-hover flex items-center gap-2 group"
              >
                <span>Mulai Dari Materi Gratis</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/belajar"
                className="px-7 py-4 rounded-3xl bg-coffee-card text-coffee-dark font-bold border border-coffee-border hover:border-coffee-accent transition-all"
              >
                Lihat Alur Belajar
              </Link>
            </div>
          </div>

          {/* Hero Bento Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bento-card bg-white border-coffee-border">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-coffee-dark mb-1">Lesson Gratis</h3>
              <p className="text-xs text-coffee-muted">Tonton dan praktikkankan dasar menyeduh tanpa perlu mendaftar bayar.</p>
            </div>

            <div className="bento-card bg-coffee-card border-coffee-border">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-coffee-dark mb-1">Kurikulum Praktis</h3>
              <p className="text-xs text-coffee-muted">Barista Fundamentals, Espresso Foundations, dan Manual Brew Essentials.</p>
            </div>

            <div className="sm:col-span-2 bento-card bg-coffee-dark text-coffee-cream">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Tanpa Klaim Palsu</span>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                "Dibuat untuk menemani proses belajar kopi yang nyata — konsisten, jujur, dan mudah diterapkan di rumah."
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-coffee-light/80 bg-coffee-card py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-coffee-muted">
          <div>
            &copy; {new Date().getFullYear()} Foreign Coffee Academy. Demonstration Project.
          </div>
          <div className="flex items-center gap-6">
            <span>Midtrans Sandbox Mode</span>
            <span>Bahasa Indonesia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
