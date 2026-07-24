import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/modules/auth/guards";
import { BookOpen, ArrowLeft, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPublishToggle } from "@/components/admin/AdminPublishToggle";

export default async function AdminCoursesPage() {
  const adminRes = await requireAdmin();
  if (!adminRes.ok) {
    redirect("/login?callbackUrl=/admin/courses");
  }

  const courses = [
    {
      id: "course-1",
      slug: "barista-fundamentals",
      title: "Barista Fundamentals: Dari Nol ke Barista",
      level: "Pemula",
      lessonsCount: 4,
      status: "PUBLISHED",
    },
    {
      id: "course-2",
      slug: "espresso-foundations",
      title: "Espresso Foundations: Dial In & Extraction",
      level: "Pemula - Menengah",
      lessonsCount: 3,
      status: "PUBLISHED",
    },
    {
      id: "course-3",
      slug: "manual-brew-essentials",
      title: "Manual Brew Essentials: V60 & Pour-Over",
      level: "Pemula",
      lessonsCount: 3,
      status: "PUBLISHED",
    },
    {
      id: "course-4",
      slug: "latte-art-microfoam",
      title: "Latte Art & Microfoam Technique",
      level: "Menengah",
      lessonsCount: 5,
      status: "DRAFT",
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

          <Button size="sm" className="bg-coffee-dark text-white hover:bg-coffee-accent rounded-full font-bold shadow-sm">
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Tambah Course Baru</span>
          </Button>
        </div>

        <div className="bg-white border border-coffee-border p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-coffee-light pb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-coffee-dark">
                Manajemen Course &amp; Lesson
              </h1>
              <p className="text-xs text-coffee-muted mt-1">
                Kelola status publikasi, kurikulum, dan label akses video course.
              </p>
            </div>
            <span className="badge-playful bg-coffee-card text-coffee-dark border border-coffee-border">
              Total {courses.length} Course
            </span>
          </div>

          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-5 rounded-2xl bg-coffee-cream border border-coffee-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-coffee-dark border border-coffee-border">
                      {course.level}
                    </span>
                    <span className="text-xs text-coffee-muted">
                      {course.lessonsCount} Lesson Video
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-coffee-dark">
                    {course.title}
                  </h3>
                  <span className="text-xs text-coffee-muted font-mono block">
                    /courses/{course.slug}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <AdminPublishToggle
                    targetId={course.id}
                    targetType="course"
                    initialStatus={course.status}
                  />

                  <Link href={`/courses/${course.slug}`}>
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-bold">
                      <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
