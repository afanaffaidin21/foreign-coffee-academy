import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/modules/auth/guards";
import { History, ArrowLeft, Shield, Clock } from "lucide-react";

export default async function AdminAuditLogsPage() {
  const adminRes = await requireAdmin();
  if (!adminRes.ok) {
    redirect("/login?callbackUrl=/admin/audit-logs");
  }

  const logs = [
    {
      id: "log-1",
      action: "MANUAL_MEMBERSHIP_OVERRIDE",
      targetType: "USER",
      targetId: "usr-free-1",
      actor: "admin@example.com",
      timestamp: "2026-07-24 14:30:00",
      details: "Granted 30-Day Premium Entitlement via Support Portal",
    },
    {
      id: "log-2",
      action: "COURSE_PUBLISH_STATUS_TOGGLE",
      targetType: "COURSE",
      targetId: "course-1",
      actor: "admin@example.com",
      timestamp: "2026-07-24 13:15:00",
      details: "Updated publication status from DRAFT to PUBLISHED",
    },
    {
      id: "log-3",
      action: "SEED_DATABASE_EXECUTION",
      targetType: "SYSTEM",
      targetId: "sys-seed",
      actor: "SYSTEM_SEEDER",
      timestamp: "2026-07-24 10:00:00",
      details: "Populated portfolio users, courses, hubs, and membership plans",
    },
  ];

  return (
    <div className="min-h-screen bg-coffee-cream py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-bold text-coffee-accent hover:text-coffee-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Admin Overview</span>
          </Link>
        </div>

        <div className="bg-white border border-coffee-border p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-coffee-light pb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-coffee-dark">
                Admin Audit Log Viewer
              </h1>
              <p className="text-xs text-coffee-muted mt-1">
                Rekam jejak seluruh aktivitas administratif dan perubahan data penting.
              </p>
            </div>
            <span className="badge-playful bg-purple-100 text-purple-900 border border-purple-300">
              Audit Security Enabled
            </span>
          </div>

          <div className="space-y-3">
            {logs.map((l) => (
              <div
                key={l.id}
                className="p-4 rounded-2xl bg-coffee-cream border border-coffee-border space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-coffee-dark text-white font-mono">
                      {l.action}
                    </span>
                    <span className="text-xs font-semibold text-coffee-dark">
                      Target: {l.targetType} ({l.targetId})
                    </span>
                  </div>
                  <span className="text-[11px] text-coffee-muted font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {l.timestamp}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-coffee-muted border-t border-coffee-light/50 pt-2">
                  <span>{l.details}</span>
                  <span className="font-bold text-coffee-accent">Aktor: {l.actor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
