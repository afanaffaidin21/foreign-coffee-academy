"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CompleteLessonButton({
  lessonId,
  isLoggedIn,
}: {
  lessonId: string;
  isLoggedIn: boolean;
}) {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleComplete = async () => {
    if (!isLoggedIn) {
      alert("Silakan masuk terlebih dahulu untuk menyimpan progres belajar.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lessons/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, completed: !completed }),
      });
      if (res.ok) {
        setCompleted(!completed);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={toggleComplete}
      disabled={loading}
      className={`rounded-full h-11 px-5 text-xs font-bold transition-all flex items-center gap-2 ${
        completed
          ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
          : "bg-coffee-dark text-white hover:bg-coffee-accent shadow-sm"
      }`}
    >
      <CheckCircle2 className="w-4 h-4" />
      <span>{completed ? "Selesai Dipelajari" : "Tandai Selesai"}</span>
    </Button>
  );
}
