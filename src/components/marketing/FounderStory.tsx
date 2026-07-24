import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * INTERNAL NOTE:
 * Authentic founder portrait photograph is required before real commercial launch.
 * Stock photos or AI-generated human portraits must NOT be used per founder truthfulness rules.
 */
export function FounderStory() {
  return (
    <section className="py-20 bg-coffee-card border-t border-coffee-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bento-card bg-white border border-coffee-border p-8 md:p-12 shadow-sm rounded-3xl">
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
                  <Button variant="outline" className="rounded-full border-coffee-border hover:bg-coffee-card text-coffee-dark font-bold">
                    <span>Baca Cerita Lengkap Founder</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Neutral Brand Logo Visual */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-coffee-cream rounded-3xl border border-coffee-light text-center space-y-4 shadow-inner">
              <Image
                src="/foreign-coffee-academy-playful-logo.png"
                alt="Foreign Coffee Academy Logo"
                width={200}
                height={50}
                className="h-12 w-auto object-contain"
              />
              <p className="text-xs text-coffee-muted font-medium">Practical Coffee Learning Companion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
