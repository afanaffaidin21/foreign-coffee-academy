import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/modules/auth/config";
import { requirePremiumEntitlement } from "@/modules/auth/guards";
import { Coffee, User, Sparkles, Shield, PlayCircle, Layers, CheckCircle2, ArrowRight, BookOpen } from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const entitlementRes = await requirePremiumEntitlement(session.user.id);
  const isPremium = entitlementRes.ok;

  const enrolledCourses = [
    {
      slug: "barista-fundamentals",
      title: "Barista Fundamentals: Dari Nol ke Barista",
      level: "Pemula",
      totalLessons: 16,
      completedLessons: isPremium ? 4 : 2,
      lastLessonSlug: "pengenalan-ekstraksi-kopi",
      statusText: isPremium ? "Akses Premium Aktif" : "Materi Gratis Terbuka",
    },
    {
      slug: "espresso-foundations",
      title: "Espresso Foundations: Dial In & Extraction",
      level: "Pemula - Menengah",
      totalLessons: 18,
      completedLessons: isPremium ? 3 : 1,
      lastLessonSlug: "dial-in-espresso-dasar",
      statusText: isPremium ? "Akses Premium Aktif" : "Materi Gratis Terbuka",
    },
    {
      slug: "manual-brew-essentials",
      title: "Manual Brew Essentials: V60 & Pour-Over",
      level: "Pemula",
      totalLessons: 14,
      completedLessons: isPremium ? 2 : 1,
      lastLessonSlug: "v60-pouring-technique",
      statusText: isPremium ? "Akses Premium Aktif" : "Materi Gratis Terbuka",
    },
  ];

  return (
    <div className="min-h-screen bg-coffee-cream py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between bg-white border border-coffee-border p-6 rounded-3xl shadow-sm">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-coffee-accent flex items-center justify-center text-white font-bold">
              <Coffee className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-coffee-dark">
              foreign coffee academy
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {session.user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-full text-xs font-bold bg-coffee-dark text-white hover:bg-coffee-accent transition-all"
              >
                Ke Admin Portal &rarr;
              </Link>
            )}
            <SignOutButton />
          </div>
        </div>

        {/* User Profile Banner */}
        <div className="bg-white border border-coffee-border rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-coffee-card border border-coffee-border text-coffee-accent flex items-center justify-center font-extrabold text-xl">
                {session.user.name ? session.user.name[0] : "U"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-coffee-dark">
                    {session.user.name}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-coffee-card text-coffee-accent border border-coffee-border">
                    {session.user.role}
                  </span>
                </div>
                <p className="text-sm text-coffee-muted">{session.user.email}</p>
              </div>
            </div>

            {/* Live Entitlement Status Card */}
            <div className="bg-coffee-cream border border-coffee-border p-4 rounded-2xl flex items-center gap-3 shrink-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isPremium
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-stone-200 text-stone-700"
                }`}
              >
                {isPremium ? <Sparkles className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-coffee-muted">
                  Status Keanggotaan
                </span>
                <span className="font-extrabold text-sm text-coffee-dark">
                  {isPremium ? "Active Premium Student" : "Free Student Learner"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/courses"
            className="bento-card bg-white border border-coffee-border p-6 shadow-sm hover:shadow-bento hover:-translate-y-0.5 transition-all group block"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-lg text-coffee-dark group-hover:text-coffee-accent transition-colors">
                Progres Pembelajaran
              </h2>
              <BookOpen className="w-5 h-5 text-coffee-accent" />
            </div>
            <p className="text-xs text-coffee-muted leading-relaxed mb-4">
              Klik untuk melihat seluruh kurikulum course yang sedang dipelajari.
            </p>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-coffee-cream border border-coffee-light group-hover:border-coffee-accent transition-colors">
              <span className="text-xs font-semibold text-coffee-dark">Course Diikuti</span>
              <span className="text-xs font-bold text-coffee-accent flex items-center gap-1">
                <span>3 Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          <div className="bento-card bg-white border border-coffee-border p-6 shadow-sm">
            <h2 className="font-bold text-lg text-coffee-dark mb-2">
              Akses Materi Video
            </h2>
            <p className="text-xs text-coffee-muted leading-relaxed mb-4">
              {isPremium
                ? "Kamu memiliki akses penuh ke seluruh video premium dan Coffee Guide."
                : "Kamu saat ini dapat mengakses seluruh video lesson berlabel GRATIS."}
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-xs font-bold text-coffee-accent hover:text-coffee-dark transition-colors"
            >
              <span>Jelajahi Katalog Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Interactive Enrolled Courses List Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-coffee-dark">
              Course yang Sedang Dipelajari
            </h2>
            <Link
              href="/courses"
              className="text-xs font-bold text-coffee-accent hover:text-coffee-dark transition-colors flex items-center gap-1"
            >
              <span>Katalog Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {enrolledCourses.map((course) => {
              const progressPercent = Math.round(
                (course.completedLessons / course.totalLessons) * 100
              );

              return (
                <div
                  key={course.slug}
                  className="bento-card bg-white border border-coffee-border p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-bento transition-all"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-coffee-card text-coffee-dark border border-coffee-border">
                        {course.level}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          isPremium
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-amber-50 text-amber-900 border-amber-200"
                        }`}
                      >
                        {course.statusText}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-coffee-dark leading-snug">
                      {course.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-coffee-muted">
                        <span>{course.completedLessons} dari {course.totalLessons} Lesson Selesai</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-coffee-cream h-2 rounded-full overflow-hidden border border-coffee-light">
                        <div
                          className="bg-coffee-accent h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link href={`/learn/${course.slug}/${course.lastLessonSlug}`}>
                      <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-coffee-dark text-white hover:bg-coffee-accent font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2">
                        <PlayCircle className="w-4 h-4" />
                        <span>Lanjutkan Belajar</span>
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
