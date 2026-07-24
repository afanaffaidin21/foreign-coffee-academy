import React from "react";
import { Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-coffee-dark text-coffee-cream px-4 py-2.5 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2.5 shadow-inner">
      <span className="bg-coffee-terracotta text-white px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 shadow-sm">
        <Sparkles className="w-3 h-3" />
        Demo Sandbox Mode
      </span>
      <span className="text-coffee-cream/90">
        Pembelajaran gratis aktif. Uji coba Midtrans Sandbox tanpa penagihan riil.
      </span>
    </div>
  );
}
