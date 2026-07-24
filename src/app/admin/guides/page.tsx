import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/modules/auth/guards";
import { Coffee, ArrowLeft, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminGuidesPage() {
  const adminRes = await requireAdmin();
  if (!adminRes.ok) {
    redirect("/login?callbackUrl=/admin/guides");
  }

  const guides = [
    { slug: "panduan-grind-size-espresso", title: "Panduan Grind Size & Calibration Espresso", category: "Grinder", readTime: "8 Menit" },
    { slug: "mengenal-proses-pasca-panen", title: "Proses Pasca Panen: Natural, Wash, & Honey", category: "Biji Kopi", readTime: "10 Menit" },
    { slug: "suhu-air-dan-ekstraksi-v60", title: "Pengaruh Suhu Air pada Ekstraksi V60", category: "Brewing", readTime: "6 Menit" },
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
            <span>Tambah Guide Baru</span>
          </Button>
        </div>

        <div className="bg-white border border-coffee-border p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-coffee-light pb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-coffee-dark">
                Manajemen Coffee Guide Library
              </h1>
              <p className="text-xs text-coffee-muted mt-1">
                Kelola artikel panduan teknis alat, biji kopi, dan metode seduh.
              </p>
            </div>
            <span className="badge-playful bg-coffee-card text-coffee-dark border border-coffee-border">
              {guides.length} Panduan
            </span>
          </div>

          <div className="space-y-3">
            {guides.map((g) => (
              <div
                key={g.slug}
                className="p-4 rounded-2xl bg-coffee-cream border border-coffee-border flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-coffee-accent border border-coffee-border block mb-1 w-max">
                    {g.category}
                  </span>
                  <h3 className="font-bold text-sm text-coffee-dark">{g.title}</h3>
                </div>

                <Link href="/guides">
                  <Button variant="outline" size="sm" className="rounded-full text-xs font-bold">
                    <Eye className="w-3.5 h-3.5 mr-1" /> Lihat Guide
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
