import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/modules/auth/guards";
import { CreditCard, ArrowLeft, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminOverrideButton } from "@/components/admin/AdminOverrideButton";

export default async function AdminCommercePage() {
  const adminRes = await requireAdmin();
  if (!adminRes.ok) {
    redirect("/login?callbackUrl=/admin/commerce");
  }

  const demoStudents = [
    { id: "usr-free-1", email: "student-free@example.com", name: "Budi (Free Student)", status: "FREE" },
    { id: "usr-active-1", email: "student-active@example.com", name: "Siti (Active Premium)", status: "ACTIVE" },
    { id: "usr-exp-1", email: "student-expired@example.com", name: "Rudi (Expired Premium)", status: "EXPIRED" },
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
                Commerce &amp; Manual Membership Override
              </h1>
              <p className="text-xs text-coffee-muted mt-1">
                Inspeksi transaksi dan jalankan pemberian hak akses manual untuk bantuan pelanggan.
              </p>
            </div>
            <span className="badge-playful bg-amber-100 text-amber-900 border border-amber-300">
              Customer Support Tool
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-coffee-dark">
              Daftar Siswa &amp; Tindakan Override Manual
            </h2>

            <div className="space-y-3">
              {demoStudents.map((st) => (
                <div
                  key={st.id}
                  className="p-5 rounded-2xl bg-coffee-cream border border-coffee-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-extrabold text-sm text-coffee-dark">{st.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          st.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : "bg-stone-200 text-stone-700 border-stone-300"
                        }`}
                      >
                        {st.status === "ACTIVE" ? "Active Premium" : "Free Learner"}
                      </span>
                    </div>
                    <span className="text-xs text-coffee-muted">{st.email}</span>
                  </div>

                  <AdminOverrideButton userId={st.id} email={st.email} currentStatus={st.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
