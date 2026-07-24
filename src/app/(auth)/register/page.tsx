"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Registration action simulation
    setTimeout(() => {
      setLoading(false);
      router.push("/login?registered=true");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-coffee-cream flex flex-col justify-between py-12 px-4 sm:px-6">
      <div className="max-w-md w-full mx-auto text-center">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <Image
            src="/foreign-coffee-academy-playful-logo.png"
            alt="Foreign Coffee Academy"
            width={200}
            height={48}
            className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-8">
        <div className="bento-card bg-white border border-coffee-border p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold text-coffee-dark mb-2">
            Mulai Belajar Kopi
          </h1>
          <p className="text-sm text-coffee-muted mb-6">
            Daftar akun gratis untuk menyimpan progres belajar dan mengakses materi terpilih.
          </p>

          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-coffee-dark uppercase tracking-wider mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu"
                className="w-full h-11 px-4 rounded-2xl bg-coffee-cream border border-coffee-border text-sm text-coffee-dark focus:outline-none focus:ring-2 focus:ring-coffee-accent"
              />
            </div>

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
              {loading ? "Membuat Akun..." : "Daftar Akun Gratis"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-coffee-muted">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-bold text-coffee-accent hover:underline">
              Masuk
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-coffee-muted">
        &copy; {new Date().getFullYear()} Foreign Coffee Academy. Portfolio Demo.
      </div>
    </div>
  );
}
