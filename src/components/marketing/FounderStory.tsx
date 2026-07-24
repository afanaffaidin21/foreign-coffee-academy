import React from "react";
import Link from "next/link";
import { Coffee, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FounderStory() {
  return (
    <section className="py-20 bg-coffee-card border-t border-coffee-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bento-card bg-white border-coffee-border p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="badge-playful bg-coffee-card text-coffee-accent border border-coffee-border">
                <HeartHandshake className="w-4 h-4 mr-1.5" />
                Kisah &amp; Filosofi
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-coffee-dark tracking-tight">
                Mengapa Foreign Coffee Academy didirikan?
              </h2>

              <p className="text-sm sm:text-base text-coffee-muted leading-relaxed">
                Platform ini bermula dari pengalaman riil mengelola Foreign Coffee. Kami melihat begitu banyak home brewer dan calon barista yang kebingungan karena informasi di media sosial saling bertentangan dan terlalu rumit.
              </p>

              <p className="text-sm sm:text-base text-coffee-muted leading-relaxed">
                Tujuan kami sederhana: menyediakan ruang belajar yang ramah, berbahasa Indonesia, tanpa jargon berlebihan, dan berfokus pada hasil cangkir kopi yang benar-benar enak.
              </p>

              <div className="pt-2">
                <Link href="/about">
                  <Button variant="outline" className="rounded-2xl border-coffee-border">
                    <span>Baca Cerita Lengkap Founder</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-coffee-cream rounded-3xl border border-coffee-light text-center">
              <div className="w-16 h-16 rounded-3xl bg-coffee-accent text-white flex items-center justify-center mb-4 shadow-sm">
                <Coffee className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-lg text-coffee-dark mb-1">Foreign Coffee</h3>
              <p className="text-xs text-coffee-muted">Practical Coffee Learning Companion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
