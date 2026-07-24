import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/modules/auth/config";
import { requirePremiumEntitlement } from "@/modules/auth/guards";
import { Coffee, User, Sparkles, Shield, LogOut, CheckCircle2, ArrowRight } from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const entitlementRes = await requirePremiumEntitlement(session.user.id);
  const isPremium = entitlementRes.ok;

  return (
    <div className="min-h-screen bg-coffee-cream py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between bg-white border border-coffee-border p-6 rounded-3xl shadow-sm">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-coffee-accent flex items-center justify-center text-white font-bold">
              <Coffee className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-coffee-dark">
              foreign coffee academy
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {session.user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-full text-xs font-bold bg-coffee-dark text-white hover:bg-coffee-accent transition-all"
              >
                Ke Admin Portal &rarr;
              </Link>
            )}
            <SignOutButton />
          </div>
        </div>

        {/* User Profile Banner */}
        <div className="bg-white border border-coffee-border rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-coffee-card border border-coffee-border text-coffee-accent flex items-center justify-center font-extrabold text-xl">
                {session.user.name ? session.user.name[0] : "U"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-coffee-dark">
                    {session.user.name}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-coffee-card text-coffee-accent border border-coffee-border">
                    {session.user.role}
                  </span>
                </div>
                <p className="text-sm text-coffee-muted">{session.user.email}</p>
              </div>
            </div>

            {/* Live Entitlement Status Card */}
            <div className="bg-coffee-cream border border-coffee-border p-4 rounded-2xl flex items-center gap-3 shrink-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isPremium
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-stone-200 text-stone-700"
                }`}
              >
                {isPremium ? <Sparkles className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-coffee-muted">
                  Status Keanggotaan
                </span>
                <span className="font-extrabold text-sm text-coffee-dark">
                  {isPremium ? "Active Premium Student" : "Free Student Learner"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content Teaser */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bento-card bg-white border border-coffee-border p-6 shadow-sm">
            <h2 className="font-bold text-lg text-coffee-dark mb-2">
              Progres Pembelajaran
            </h2>
            <p className="text-xs text-coffee-muted leading-relaxed mb-4">
              Semua progres video lesson dan kuis kamu tersimpan secara otomatis di akun ini.
            </p>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-coffee-cream border border-coffee-light">
              <span className="text-xs font-semibold text-coffee-dark">Course Diikuti</span>
              <span className="text-xs font-bold text-coffee-accent">3 Course</span>
            </div>
          </div>

          <div className="bento-card bg-white border border-coffee-border p-6 shadow-sm">
            <h2 className="font-bold text-lg text-coffee-dark mb-2">
              Akses Materi Video
            </h2>
            <p className="text-xs text-coffee-muted leading-relaxed mb-4">
              {isPremium
                ? "Kamu memiliki akses penuh ke seluruh video premium dan Coffee Guide."
                : "Kamu saat ini dapat mengakses seluruh video lesson berlabel GRATIS."}
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-xs font-bold text-coffee-accent hover:text-coffee-dark transition-colors"
            >
              <span>Jelajahi Katalog Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
