"use client";

import React, { useState } from "react";
import { Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminOverrideButtonProps {
  userId: string;
  email: string;
  currentStatus: string;
}

export function AdminOverrideButton({
  userId,
  email,
  currentStatus,
}: AdminOverrideButtonProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleOverride = async () => {
    if (!confirm(`Konfirmasi pemberian akses 30 Hari Premium manual ke ${email}?`)) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/override-membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, durationDays: 30 }),
      });

      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus("ACTIVE");
        alert(`Berhasil memberikan hak akses 30 Hari Premium ke ${email}!`);
      } else {
        alert(json.error?.message || "Gagal menjalankan override.");
      }
    } catch (e) {
      console.error(e);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleOverride}
      disabled={loading || status === "ACTIVE"}
      size="sm"
      className={`rounded-full font-bold text-xs shadow-sm transition-all ${
        status === "ACTIVE"
          ? "bg-emerald-600 text-white cursor-default"
          : "bg-coffee-dark text-white hover:bg-coffee-accent"
      }`}
    >
      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
      <span>
        {loading
          ? "Memproses Override..."
          : status === "ACTIVE"
          ? "Akses Premium Aktif"
          : "Beri 30 Hari Premium Manual"}
      </span>
    </Button>
  );
}
