import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/modules/auth/guards";
import { Sparkles, ArrowLeft, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminRecipesPage() {
  const adminRes = await requireAdmin();
  if (!adminRes.ok) {
    redirect("/login?callbackUrl=/admin/recipes");
  }

  const recipes = [
    { slug: "japanese-iced-coffee-v60", title: "Japanese Iced Coffee V60 Segar & Rich", ratio: "1:15 (Dosis 18g)", time: "3.5 Menit" },
    { slug: "classic-iced-latte-espresso", title: "Classic Iced Latte Barista Standard", ratio: "Double Shot Espresso + 150ml Milk", time: "2 Menit" },
    { slug: "aeropress-inverted-sweetness", title: "Aeropress Inverted Method untuk Body Tebal", ratio: "1:14 (Dosis 15g)", time: "2.5 Menit" },
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

          <Button size="sm" className="bg-coffee-dark text-white hover:bg-coffee-accent rounded-full font-bold shadow-sm">
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Tambah Resep Baru</span>
          </Button>
        </div>

        <div className="bg-white border border-coffee-border p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-coffee-light pb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-coffee-dark">
                Manajemen Resep Kopi Praktis
              </h1>
              <p className="text-xs text-coffee-muted mt-1">
                Kelola takaran gramasi, rasio air, suhu, dan langkah ekstraksi.
              </p>
            </div>
            <span className="badge-playful bg-coffee-card text-coffee-dark border border-coffee-border">
              {recipes.length} Resep
            </span>
          </div>

          <div className="space-y-3">
            {recipes.map((r) => (
              <div
                key={r.slug}
                className="p-4 rounded-2xl bg-coffee-cream border border-coffee-border flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-sm text-coffee-dark">{r.title}</h3>
                  <span className="text-xs text-coffee-muted">{r.ratio} &bull; {r.time}</span>
                </div>

                <Link href="/recipes">
                  <Button variant="outline" size="sm" className="rounded-full text-xs font-bold">
                    <Eye className="w-3.5 h-3.5 mr-1" /> Lihat Resep
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
