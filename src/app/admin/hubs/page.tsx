import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/modules/auth/guards";
import { Layers, ArrowLeft, MoveUp, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminHubsPage() {
  const adminRes = await requireAdmin();
  if (!adminRes.ok) {
    redirect("/login?callbackUrl=/admin/hubs");
  }

  const hubs = [
    { slug: "home-barista-starter", name: "Home Barista Starter", order: 1 },
    { slug: "espresso-mastery", name: "Espresso Mastery", order: 2 },
    { slug: "manual-brew-explorer", name: "Manual Brew Explorer", order: 3 },
    { slug: "latte-art-milk", name: "Latte Art & Milk Microfoam", order: 4 },
    { slug: "sensory-cupping", name: "Sensory & Tasting Kopi", order: 5 },
    { slug: "coffee-shop-prep", name: "Coffee Shop Career Prep", order: 6 },
  ];

  return (
    <div className="min-h-screen bg-coffee-cream py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-bold text-coffee-accent hover:text-coffee-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Admin Overview</span>
          </Link>
        </div>

        <div className="bg-white border border-coffee-border p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-coffee-light pb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-coffee-dark">
                Kurasi Alur Belajar (Learning Hubs)
              </h1>
              <p className="text-xs text-coffee-muted mt-1">
                Atur urutan dan susunan 6 alur belajar utama di halaman utama &amp; katalog.
              </p>
            </div>
            <span className="badge-playful bg-coffee-card text-coffee-dark border border-coffee-border">
              6 Hubs Terdaftar
            </span>
          </div>

          <div className="space-y-3">
            {hubs.map((h) => (
              <div
                key={h.slug}
                className="p-4 rounded-2xl bg-coffee-cream border border-coffee-border flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-coffee-dark text-white font-extrabold text-xs flex items-center justify-center">
                    #{h.order}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-coffee-dark">{h.name}</h3>
                    <span className="text-xs text-coffee-muted font-mono">/belajar/{h.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-full p-2">
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full p-2">
                    <MoveDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
