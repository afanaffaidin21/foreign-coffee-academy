import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/modules/auth/guards";
import { Coffee, Shield, Users, BookOpen, Layers, CreditCard, History, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default async function AdminDashboardPage() {
  const adminRes = await requireAdmin();
  if (!adminRes.ok) {
    redirect("/login?callbackUrl=/admin");
  }

  const user = adminRes.data;

  const stats = [
    { label: "Total Pengguna", value: "4 Akun", icon: Users, color: "bg-blue-100 text-blue-800" },
    { label: "Katalog Course", value: "6 Course", icon: BookOpen, color: "bg-emerald-100 text-emerald-800" },
    { label: "Learning Hubs", value: "6 Alur", icon: Layers, color: "bg-amber-100 text-amber-900" },
    { label: "Total Transaksi", value: "8 Checkout", icon: CreditCard, color: "bg-purple-100 text-purple-800" },
  ];

  const adminModules = [
    { title: "Manajemen Course", desc: "Kelola kurikulum, daftar lesson, dan status publikasi (Draft / Publish).", href: "/admin/courses", icon: BookOpen },
    { title: "Coffee Guide Library", desc: "Tambah & edit panduan grinder, ekstraksi, dan jenis biji kopi.", href: "/admin/guides", icon: Coffee },
    { title: "Resep Kopi Praktis", desc: "Kelola takaran gramasi, rasio air, dan instruksi langkah resep.", href: "/admin/recipes", icon: Sparkles },
    { title: "Kurasi Learning Hubs", desc: "Atur urutan 6 Alur Belajar berdasarkan tujuan home brewer & barista.", href: "/admin/hubs", icon: Layers },
    { title: "Commerce & Membership", desc: "Inspeksi transaksi Midtrans dan jalankan Manual Membership Override.", href: "/admin/commerce", icon: CreditCard },
    { title: "Audit Log Viewer", desc: "Rekam dan pantau seluruh aktivitas perubahan yang dilakukan Admin.", href: "/admin/audit-logs", icon: History },
  ];

  return (
    <div className="min-h-screen bg-coffee-cream py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Admin Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-coffee-border p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white font-bold shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-coffee-dark">Admin CMS Portal</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  Super Admin
                </span>
              </div>
              <span className="text-xs text-coffee-muted">{user.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-full text-xs font-bold bg-coffee-cream hover:bg-coffee-card border border-coffee-border text-coffee-dark transition-all"
            >
              &larr; Ke Dashboard Learner
            </Link>
            <SignOutButton />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bento-card bg-white border border-coffee-border p-5 rounded-3xl shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-coffee-muted">{s.label}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-2xl font-black text-coffee-dark block">{s.value}</span>
              </div>
            );
          })}
        </div>

        {/* Quick Modules Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-coffee-dark">
            Modul Pengelolaan CMS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.title}
                  href={m.href}
                  className="bento-card bg-white border border-coffee-border p-6 shadow-sm hover:shadow-bento hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-coffee-cream border border-coffee-border text-coffee-accent flex items-center justify-center group-hover:bg-coffee-dark group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-base text-coffee-dark group-hover:text-coffee-accent transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-coffee-muted leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-coffee-accent group-hover:text-coffee-dark transition-colors">
                    <span>Buka Modul</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
