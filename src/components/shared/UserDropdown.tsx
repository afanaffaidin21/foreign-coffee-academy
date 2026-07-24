"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User, ChevronDown, LayoutDashboard, Shield, LogOut, Sparkles, CheckCircle2 } from "lucide-react";

interface UserDropdownProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role: "STUDENT" | "ADMIN";
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format short name for header pill button
  const firstName = user.name ? user.name.split(" ")[0] : "Akun";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Header Pill Button with ChevronDown Indicator */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-coffee-border hover:border-coffee-accent text-coffee-dark font-bold text-xs transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-coffee-accent"
        aria-expanded={open}
      >
        <div className="w-6 h-6 rounded-full bg-coffee-accent text-white flex items-center justify-center font-bold text-[11px] shrink-0">
          {firstName[0]?.toUpperCase()}
        </div>
        <span className="max-w-[100px] truncate">{firstName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-coffee-muted transition-transform duration-200 ${open ? "rotate-180 text-coffee-accent" : ""}`} />
      </button>

      {/* Floating Submenu Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-3xl bg-white border border-coffee-border shadow-bento p-3 text-coffee-dark z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
          {/* Header Profile Box */}
          <div className="p-3 bg-coffee-cream rounded-2xl border border-coffee-light/60 space-y-1">
            <span className="block font-extrabold text-sm text-coffee-dark truncate">
              {user.name || "Siswa"}
            </span>
            <span className="block text-[11px] text-coffee-muted truncate">
              {user.email}
            </span>
            <div className="pt-1.5 flex items-center gap-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coffee-dark text-white">
                {user.role === "ADMIN" ? "Administrator" : "Student Learner"}
              </span>
            </div>
          </div>

          {/* Submenu Links */}
          <div className="pt-1 space-y-1">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl hover:bg-coffee-cream text-xs font-bold text-coffee-dark hover:text-coffee-accent transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-coffee-accent" />
              <span>Dashboard Learner</span>
            </Link>

            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl hover:bg-coffee-cream text-xs font-bold text-coffee-dark hover:text-coffee-accent transition-colors"
              >
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Admin CMS Portal</span>
              </Link>
            )}

            <div className="my-1 border-t border-coffee-light/50" />

            {/* Logout Button */}
            <button
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/login" });
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl hover:bg-rose-50 text-xs font-bold text-rose-700 hover:text-rose-900 transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Keluar (Logout)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
