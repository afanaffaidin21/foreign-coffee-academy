"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface AdminPublishToggleProps {
  targetId: string;
  targetType: string;
  initialStatus: string;
}

export function AdminPublishToggle({
  targetId,
  targetType,
  initialStatus,
}: AdminPublishToggleProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const newStatus = status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

    try {
      const res = await fetch("/api/admin/publish-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId, targetType, status: newStatus }),
      });

      if (res.ok) {
        setStatus(newStatus);
      } else {
        const json = await res.json();
        alert(json.error?.message || "Gagal mengubah status publikasi.");
      }
    } catch (e) {
      console.error(e);
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={loading}
      variant="outline"
      size="sm"
      className={`rounded-full text-xs font-bold transition-all ${
        status === "PUBLISHED"
          ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
          : "bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200"
      }`}
    >
      {loading ? "Menyimpan..." : status === "PUBLISHED" ? "PUBLISHED ✅" : "DRAFT 📝"}
    </Button>
  );
}
