"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Coffee, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Alur Belajar", href: "/belajar" },
    { name: "Course", href: "/courses" },
    { name: "Coffee Guide", href: "/guides" },
    { name: "Recipe", href: "/recipes" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Membership", href: "/membership" },
  ];

  return (
    <header className="w-full border-b border-coffee-light/70 bg-coffee-cream/80 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-coffee-accent rounded-2xl p-1">
          <div className="w-10 h-10 rounded-2xl bg-coffee-accent flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-sm">
            <Coffee className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-coffee-dark">
            foreign coffee academy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-coffee-muted">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-coffee-dark transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-coffee-accent rounded-lg px-2"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-coffee-dark font-semibold">
              Masuk
            </Button>
          </Link>
          <Link href="/courses">
            <Button size="sm" className="bg-coffee-dark text-coffee-cream hover:bg-coffee-accent shadow-sm">
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-2xl bg-coffee-card border border-coffee-light text-coffee-dark hover:bg-coffee-light transition-colors focus:outline-none focus:ring-2 focus:ring-coffee-accent"
          aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-coffee-light bg-coffee-cream px-6 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-coffee-dark hover:text-coffee-accent py-2 border-b border-coffee-light/40"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Masuk
              </Button>
            </Link>
            <Link href="/courses" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center bg-coffee-accent text-white">
                Mulai Belajar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
