import React from "react";
import Link from "next/link";
import { ArrowRight, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-20 bg-coffee-cream border-t border-coffee-light/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="w-14 h-14 rounded-3xl bg-coffee-accent text-white flex items-center justify-center mx-auto shadow-sm">
          <Coffee className="w-7 h-7" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-coffee-dark tracking-tight">
          Mulai seduhan kopimu hari ini tanpa rasa ragu.
        </h2>

        <p className="text-base sm:text-lg text-coffee-muted max-w-2xl mx-auto">
          Coba lesson gratis pertama dan rasakan kemudahan belajar kopi dengan alur terstruktur berbahasa Indonesia.
        </p>

        <div className="pt-4 flex justify-center">
          <Link href="/courses">
            <Button size="lg" className="bg-coffee-dark text-white hover:bg-coffee-accent rounded-full h-14 px-9 font-bold text-base shadow-md transition-all">
              <span>Mulai Belajar Sekarang — Gratis</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
