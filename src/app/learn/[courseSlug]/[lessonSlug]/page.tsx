import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/modules/auth/config";
import { requirePremiumEntitlement } from "@/modules/auth/guards";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Play, Lock, Unlock, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompleteLessonButton } from "@/components/learning/CompleteLessonButton";

export default async function LessonViewerPage({
  params,
}: {
  params: { courseSlug: string; lessonSlug: string };
}) {
  const session = await getServerSession(authOptions);

  const lessonDataMap: Record<
    string,
    {
      id: string;
      title: string;
      courseTitle: string;
      duration: string;
      isFree: boolean;
      youtubeVideoId: string;
      description: string;
      siblingLessons: { slug: string; title: string; isFree: boolean }[];
    }
  > = {
    "pengenalan-ekstraksi-kopi": {
      id: "lesson-free-1",
      title: "Prinsip Dasar Ekstraksi Kopi: Under & Over Extraction",
      courseTitle: "Barista Fundamentals",
      duration: "12 Menit",
      isFree: true,
      youtubeVideoId: "dQw4w9WgXcQ",
      description:
        "Memahami keseimbangan rasa asam, manis, dan pahit dalam cangkir espresso serta variabel yang memengaruhinya.",
      siblingLessons: [
        {
          slug: "pengenalan-ekstraksi-kopi",
          title: "Prinsip Dasar Ekstraksi Kopi",
          isFree: true,
        },
        {
          slug: "mengenal-arabika-robusta",
          title: "Perbedaan Arabika & Robusta",
          isFree: true,
        },
        {
          slug: "pengoperasian-grinder-dasar",
          title: "Cara Kerja & Penyetelan Grinder",
          isFree: false,
        },
      ],
    },
    "mengenal-arabika-robusta": {
      id: "lesson-free-2",
      title: "Perbedaan Karakter Biji Arabika & Robusta",
      courseTitle: "Barista Fundamentals",
      duration: "15 Menit",
      isFree: true,
      youtubeVideoId: "dQw4w9WgXcQ",
      description:
        "Mengenali bentuk fisik, ketinggian tanam, kadar kafein, dan profil aroma biji kopi.",
      siblingLessons: [
        {
          slug: "pengenalan-ekstraksi-kopi",
          title: "Prinsip Dasar Ekstraksi Kopi",
          isFree: true,
        },
        {
          slug: "mengenal-arabika-robusta",
          title: "Perbedaan Arabika & Robusta",
          isFree: true,
        },
        {
          slug: "pengoperasian-grinder-dasar",
          title: "Cara Kerja & Penyetelan Grinder",
          isFree: false,
        },
      ],
    },
    "pengoperasian-grinder-dasar": {
      id: "lesson-premium-1",
      title: "Cara Kerja & Penyetelan Dosis Grinder Espresso",
      courseTitle: "Barista Fundamentals",
      duration: "18 Menit",
      isFree: false,
      youtubeVideoId: "dQw4w9WgXcQ",
      description:
        "Panduan teknis menyetel mikro & makro grind size pada grinder profesional.",
      siblingLessons: [
        {
          slug: "pengenalan-ekstraksi-kopi",
          title: "Prinsip Dasar Ekstraksi Kopi",
          isFree: true,
        },
        {
          slug: "mengenal-arabika-robusta",
          title: "Perbedaan Arabika & Robusta",
          isFree: true,
        },
        {
          slug: "pengoperasian-grinder-dasar",
          title: "Cara Kerja & Penyetelan Grinder",
          isFree: false,
        },
      ],
    },
  };

  const lesson = lessonDataMap[params.lessonSlug] || {
    id: `lesson-${params.lessonSlug}`,
    title: `Lesson: ${params.lessonSlug}`,
    courseTitle: params.courseSlug.toUpperCase(),
    duration: "15 Menit",
    isFree: false,
    youtubeVideoId: "dQw4w9WgXcQ",
    description: "Materi video pembelajaran kopi terstruktur.",
    siblingLessons: [
      {
        slug: params.lessonSlug,
        title: `Lesson: ${params.lessonSlug}`,
        isFree: false,
      },
    ],
  };

  // Check Paywall Access Rules
  let isPremiumUser = false;
  if (session?.user?.id) {
    const entitlementRes = await requirePremiumEntitlement(session.user.id);
    isPremiumUser = entitlementRes.ok;
  }

  const hasAccess = lesson.isFree || isPremiumUser;

  return (
    <div className="min-h-screen bg-coffee-cream flex flex-col justify-between">
      <Header />

      <main className="py-10 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-coffee-muted">
          <Link href="/courses" className="hover:text-coffee-accent">
            Courses
          </Link>
          <span>/</span>
          <Link href={`/courses/${params.courseSlug}`} className="hover:text-coffee-accent">
            {lesson.courseTitle}
          </Link>
          <span>/</span>
          <span className="text-coffee-dark font-bold truncate max-w-xs">{lesson.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Video Screen Container */}
          <div className="lg:col-span-8 space-y-6">
            {hasAccess ? (
              <div className="bg-black rounded-3xl overflow-hidden shadow-bento aspect-video relative">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeVideoId}?autoplay=0&rel=0`}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              /* High Contrast Paywall Card for Non-Premium Users */
              <div className="bg-coffee-dark text-white rounded-3xl p-8 sm:p-12 border border-coffee-dark shadow-bento space-y-6 text-center sm:text-left relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Konten Berbayar (Premium Lesson)</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Tingkatkan Membership untuk Mengakses Video Ini
                </h2>

                <p className="text-sm sm:text-base text-coffee-cream/80 leading-relaxed max-w-xl">
                  Materi ini khusus untuk anggota aktif Foreign Coffee Academy. Nikmati akses tanpa batas ke seluruh video course dan resep praktis hanya dengan Rp49.000/bulan.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <Link href="/membership">
                    <Button size="lg" className="bg-amber-500 text-coffee-dark hover:bg-amber-400 rounded-full h-12 px-7 font-extrabold shadow-md">
                      <span>Bandingkan Paket Membership</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/login" className="text-xs text-coffee-cream/80 hover:text-white font-semibold underline">
                    Sudah berlangganan? Masuk Akun
                  </Link>
                </div>
              </div>
            )}

            {/* Lesson Title & Description */}
            <div className="bento-card bg-white border border-coffee-border p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-coffee-light pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-coffee-accent block mb-1">
                    {lesson.courseTitle}
                  </span>
                  <h1 className="text-2xl font-extrabold text-coffee-dark">
                    {lesson.title}
                  </h1>
                </div>

                {hasAccess && (
                  <CompleteLessonButton
                    lessonId={lesson.id}
                    isLoggedIn={!!session?.user}
                  />
                )}
              </div>

              <p className="text-sm text-coffee-muted leading-relaxed">
                {lesson.description}
              </p>
            </div>
          </div>

          {/* Sidebar Sibling Lessons List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bento-card bg-white border border-coffee-border p-6 shadow-sm">
              <h3 className="font-bold text-base text-coffee-dark mb-4 border-b border-coffee-light pb-2">
                Materi dalam Course Ini
              </h3>

              <div className="space-y-2.5">
                {lesson.siblingLessons.map((sib) => {
                  const sibHasAccess = sib.isFree || isPremiumUser;

                  return (
                    <Link
                      key={sib.slug}
                      href={`/learn/${params.courseSlug}/${sib.slug}`}
                      className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all ${
                        sib.slug === params.lessonSlug
                          ? "bg-coffee-dark text-white border-coffee-dark shadow-sm"
                          : "bg-coffee-cream text-coffee-dark border-coffee-border hover:bg-coffee-card"
                      }`}
                    >
                      <span className="truncate max-w-[180px]">{sib.title}</span>

                      {sib.isFree ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-100 text-emerald-800 border-emerald-200">
                          Free
                        </span>
                      ) : isPremiumUser ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-amber-100 text-amber-900 border-amber-300 flex items-center gap-1">
                          <Unlock className="w-3 h-3 text-amber-700" /> Premium
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-stone-200 text-stone-700 border-stone-300 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Lock
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
