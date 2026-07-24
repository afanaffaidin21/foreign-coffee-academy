import React from "react";
import Link from "next/link";
import { Coffee } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-coffee-card border-t border-coffee-light/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-coffee-light/60">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-2xl bg-coffee-accent flex items-center justify-center text-white">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-coffee-dark">
                foreign coffee academy
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-coffee-muted leading-relaxed max-w-sm">
              Platform belajar kopi berbahasa Indonesia yang menghubungkan teori, praktik, dan pengalaman coffee shop nyata.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs sm:text-sm">
            <div className="space-y-3">
              <h4 className="font-bold text-coffee-dark uppercase tracking-wider text-xs">
                Pembelajaran
              </h4>
              <ul className="space-y-2 text-coffee-muted">
                <li>
                  <Link href="/belajar" className="hover:text-coffee-dark transition-colors">
                    Alur Belajar
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-coffee-dark transition-colors">
                    Course Catalog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-coffee-dark transition-colors">
                    Coffee Guide
                  </Link>
                </li>
                <li>
                  <Link href="/recipes" className="hover:text-coffee-dark transition-colors">
                    Recipe Library
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-coffee-dark uppercase tracking-wider text-xs">
                Platform
              </h4>
              <ul className="space-y-2 text-coffee-muted">
                <li>
                  <Link href="/about" className="hover:text-coffee-dark transition-colors">
                    Tentang Founder
                  </Link>
                </li>
                <li>
                  <Link href="/membership" className="hover:text-coffee-dark transition-colors">
                    Membership
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-coffee-dark transition-colors">
                    Akun Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="font-bold text-coffee-dark uppercase tracking-wider text-xs">
                Informasi Portfolio
              </h4>
              <p className="text-xs text-coffee-muted leading-relaxed">
                Proyek demonstrasi non-komersial. Integrasi pembayaran menggunakan Midtrans Snap Sandbox.
              </p>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-coffee-muted">
          <div>
            &copy; {new Date().getFullYear()} Foreign Coffee Academy. Hak Cipta Dilindungi.
          </div>
          <div className="flex items-center gap-6">
            <span>Playful Coffee Learning UI v1.1</span>
            <span>Bahasa Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
