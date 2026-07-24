import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/modules/auth/config";
import { requireAdmin } from "@/modules/auth/guards";
import { Shield, Coffee, Users, BookOpen, Layers, DollarSign, ArrowLeft } from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/admin");
  }

  const adminGuard = await requireAdmin();
  if (!adminGuard.ok) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-coffee-cream py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="flex items-center justify-between bg-coffee-dark text-white border border-coffee-dark p-6 rounded-3xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-coffee-dark flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block">
                Admin CMS Portal
              </span>
              <span className="text-xs text-amber-300">Foreign Coffee Academy</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ke Dashboard Learner</span>
            </Link>
            <SignOutButton />
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bento-card bg-white border border-coffee-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-coffee-muted">Total Student</span>
              <Users className="w-5 h-5 text-coffee-accent" />
            </div>
            <span className="text-3xl font-extrabold text-coffee-dark">4 User</span>
          </div>

          <div className="bento-card bg-white border border-coffee-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-coffee-muted">Total Course</span>
              <BookOpen className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-3xl font-extrabold text-coffee-dark">3 Course</span>
          </div>

          <div className="bento-card bg-white border border-coffee-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-coffee-muted">Learning Hubs</span>
              <Layers className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-3xl font-extrabold text-coffee-dark">6 Hubs</span>
          </div>

          <div className="bento-card bg-white border border-coffee-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-coffee-muted">Paket Membership</span>
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-3xl font-extrabold text-coffee-dark">2 Paket</span>
          </div>
        </div>
      </div>
    </div>
  );
}
