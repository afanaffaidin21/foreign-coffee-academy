"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Coffee, Sparkles, UserCheck, Shield, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setErrorMsg("Email atau password tidak cocok. Silakan coba lagi.");
    } else {
      router.push(callbackUrl);
    }
  };

  const handleQuickDemoLogin = async (demoEmail: string) => {
    setLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      email: demoEmail,
      password: "demo123456",
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setErrorMsg("Gagal masuk dengan akun demo.");
    } else {
      router.push(callbackUrl);
    }
  };

  const demoAccounts = [
    {
      roleTitle: "Free Student",
      email: "student-free@example.com",
      badge: "Gratis",
      badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description: "Akses materi gratis & simpan progres",
      icon: UserCheck,
    },
    {
      roleTitle: "Active Premium",
      email: "student-active@example.com",
      badge: "Premium Aktif",
      badgeStyle: "bg-amber-100 text-amber-900 border-amber-200",
      description: "Akses penuh seluruh video course & resep",
      icon: Sparkles,
    },
    {
      roleTitle: "Expired Premium",
      email: "student-expired@example.com",
      badge: "Kedaluwarsa",
      badgeStyle: "bg-stone-100 text-stone-800 border-stone-200",
      description: "Simulasi status membership expired",
      icon: Clock,
    },
    {
      roleTitle: "Admin Portal",
      email: "admin@example.com",
      badge: "Administrator",
      badgeStyle: "bg-coffee-dark text-white border-coffee-dark",
      description: "Akses CMS manajemen course & audit",
      icon: Shield,
    },
  ];

  return (
    <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 my-8 items-start">
      {/* Left Column: Form Login */}
      <div className="md:col-span-6 bento-card bg-white border border-coffee-border p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold text-coffee-dark mb-2">
          Selamat Datang Kembali
        </h1>
        <p className="text-sm text-coffee-muted mb-6">
          Masuk ke akunmu untuk melanjutkan alur pembelajaran kopi.
        </p>

        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-coffee-dark uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full h-11 px-4 rounded-2xl bg-coffee-cream border border-coffee-border text-sm text-coffee-dark focus:outline-none focus:ring-2 focus:ring-coffee-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-coffee-dark uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-4 rounded-2xl bg-coffee-cream border border-coffee-border text-sm text-coffee-dark focus:outline-none focus:ring-2 focus:ring-coffee-accent"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full bg-coffee-dark text-white hover:bg-coffee-accent font-bold transition-all shadow-md mt-2"
          >
            {loading ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-coffee-muted">
          Belum punya akun?{" "}
          <Link href="/register" className="font-bold text-coffee-accent hover:underline">
            Daftar Gratis
          </Link>
        </div>
      </div>

      {/* Right Column: 1-Click Quick Demo Login Selector */}
      <div className="md:col-span-6 space-y-4">
        <div className="bg-coffee-card border border-coffee-border rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-coffee-accent">
            <Sparkles className="w-4 h-4" />
            <span>Opsi Uji Coba Portofolio</span>
          </div>
          <h2 className="text-xl font-bold text-coffee-dark mb-1">
            Akun Demo 1-Click
          </h2>
          <p className="text-xs text-coffee-muted mb-4">
            Pilih salah satu peran di bawah untuk menguji alur aplikasi secara instan tanpa perlu mengetik kredensial.
          </p>

          <div className="space-y-3">
            {demoAccounts.map((account) => {
              const Icon = account.icon;
              return (
                <button
                  key={account.email}
                  onClick={() => handleQuickDemoLogin(account.email)}
                  disabled={loading}
                  className="w-full text-left bg-white border border-coffee-border hover:border-coffee-accent rounded-2xl p-3.5 transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-coffee-cream text-coffee-dark flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-coffee-dark group-hover:text-coffee-accent transition-colors">
                          {account.roleTitle}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${account.badgeStyle}`}>
                          {account.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-coffee-muted">
                        {account.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-coffee-muted group-hover:text-coffee-accent group-hover:translate-x-1 transition-all" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-coffee-cream flex flex-col justify-between py-12 px-4 sm:px-6">
      {/* Header Brand */}
      <div className="max-w-md w-full mx-auto text-center">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-coffee-accent flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Coffee className="w-6 h-6" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-coffee-dark">
            foreign coffee academy
          </span>
        </Link>
      </div>

      <Suspense fallback={<div className="text-center text-coffee-muted py-12 text-sm">Memuat form login...</div>}>
        <LoginForm />
      </Suspense>

      {/* Footer */}
      <div className="text-center text-xs text-coffee-muted">
        &copy; {new Date().getFullYear()} Foreign Coffee Academy. Portfolio Demo.
      </div>
    </div>
  );
}
