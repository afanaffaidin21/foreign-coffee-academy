"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-full bg-white border-coffee-border hover:bg-coffee-card text-coffee-dark text-xs font-bold flex items-center gap-1.5"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>Keluar</span>
    </Button>
  );
}
