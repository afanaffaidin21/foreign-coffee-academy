import bcrypt from "bcryptjs";
import { db } from "../client";
import {
  users as usersTable,
  membershipPlans as plansTable,
  memberships as membershipsTable,
  learningHubs as hubsTable,
  courses as coursesTable,
  modules as modulesTable,
  lessons as lessonsTable,
} from "../schema";

export async function generateSeedData() {
  const passwordHash = await bcrypt.hash("demo123456", 10);

  const users = [
    {
      email: "student-free@example.com",
      name: "Budi (Free Learner)",
      role: "STUDENT" as const,
      passwordHash,
    },
    {
      email: "student-active@example.com",
      name: "Siti (Active Premium)",
      role: "STUDENT" as const,
      passwordHash,
    },
    {
      email: "student-expired@example.com",
      name: "Andi (Expired Premium)",
      role: "STUDENT" as const,
      passwordHash,
    },
    {
      email: "admin@example.com",
      name: "Foreign Coffee Admin",
      role: "ADMIN" as const,
      passwordHash,
    },
  ];

  const plans = [
    {
      slug: "monthly",
      name: "Paket Monthly",
      priceIdr: 49000,
      durationDays: 30,
    },
    {
      slug: "yearly",
      name: "Paket Yearly",
      priceIdr: 399000,
      durationDays: 365,
    },
  ];

  const hubs = [
    { slug: "espresso", title: "Espresso & Dial In", description: "Variabel ekstraksi espresso konsisten", orderIndex: 1 },
    { slug: "manual-brew", title: "Manual Brew V60", description: "Rasio seduh dan pouring technique", orderIndex: 2 },
    { slug: "latte-art", title: "Latte Art & Milk Texturing", description: "Microfoam dan pola heart tulip", orderIndex: 3 },
    { slug: "coffee-beans", title: "Biji Kopi & Sangrai", description: "Origin dan proses pasca panen", orderIndex: 4 },
    { slug: "barista-fundamentals", title: "Fondasi Barista", description: "Alur kerja standar coffee shop", orderIndex: 5 },
    { slug: "sensory-tasting", title: "Sensory & Tasting Kopi", description: "Cupping score dan flavor wheel", orderIndex: 6 },
  ];

  return { users, plans, hubs };
}

async function runSeed() {
  console.log("⏳ Starting database seeding to Neon PostgreSQL...");

  try {
    const { users, plans, hubs } = await generateSeedData();

    // 1. Seed Users
    console.log("👤 Seeding 4 portfolio user accounts...");
    const insertedUsers: Record<string, string> = {};
    for (const u of users) {
      const [inserted] = await db
        .insert(usersTable)
        .values(u)
        .onConflictDoUpdate({
          target: usersTable.email,
          set: { name: u.name, role: u.role, passwordHash: u.passwordHash },
        })
        .returning({ id: usersTable.id, email: usersTable.email });
      insertedUsers[inserted.email] = inserted.id;
    }

    // 2. Seed Membership Plans
    console.log("💳 Seeding 2 membership plans (Monthly & Yearly)...");
    const insertedPlans: Record<string, string> = {};
    for (const p of plans) {
      const [inserted] = await db
        .insert(plansTable)
        .values(p)
        .onConflictDoUpdate({
          target: plansTable.slug,
          set: { name: p.name, priceIdr: p.priceIdr, durationDays: p.durationDays },
        })
        .returning({ id: plansTable.id, slug: plansTable.slug });
      insertedPlans[inserted.slug] = inserted.id;
    }

    // 3. Seed User Memberships
    console.log("🎟️ Seeding active and expired memberships...");
    const now = new Date();
    const activeEndsAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 days
    const expiredEndsAt = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000); // -10 days

    // Active student membership
    if (insertedUsers["student-active@example.com"] && insertedPlans["monthly"]) {
      await db
        .insert(membershipsTable)
        .values({
          userId: insertedUsers["student-active@example.com"],
          planId: insertedPlans["monthly"],
          status: "ACTIVE",
          startsAt: now,
          endsAt: activeEndsAt,
        })
        .onConflictDoNothing();
    }

    // Expired student membership
    if (insertedUsers["student-expired@example.com"] && insertedPlans["monthly"]) {
      await db
        .insert(membershipsTable)
        .values({
          userId: insertedUsers["student-expired@example.com"],
          planId: insertedPlans["monthly"],
          status: "REVOKED",
          startsAt: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000),
          endsAt: expiredEndsAt,
        })
        .onConflictDoNothing();
    }

    // 4. Seed Learning Hubs
    console.log("🎯 Seeding 6 Learning Hubs...");
    for (const h of hubs) {
      await db
        .insert(hubsTable)
        .values(h)
        .onConflictDoUpdate({
          target: hubsTable.slug,
          set: { title: h.title, description: h.description, orderIndex: h.orderIndex },
        });
    }

    // 5. Seed Courses, Modules & Lessons
    console.log("📚 Seeding initial courses, modules, and lessons...");
    const initialCourses = [
      {
        slug: "barista-fundamentals",
        title: "Barista Fundamentals: Dari Nol ke Barista",
        description: "Fondasi lengkap seputar jenis biji kopi, pengenalan mesin espresso, kebersihan bar, dan alur pelayanan.",
        level: "Pemula",
        durationMinutes: 120,
        publicationStatus: "PUBLISHED" as const,
        isFeatured: true,
      },
      {
        slug: "espresso-foundations",
        title: "Espresso Foundations: Dial In & Extraction",
        description: "Kuasai seni mengendalikan variabel ekstraksi espresso untuk hasil shot yang kaya aroma, balance, dan konsisten.",
        level: "Pemula - Menengah",
        durationMinutes: 150,
        publicationStatus: "PUBLISHED" as const,
        isFeatured: true,
      },
      {
        slug: "manual-brew-essentials",
        title: "Manual Brew Essentials: V60 & Pour-Over",
        description: "Teknik menyeduh manual brew menggunakan alat populer seperti Hario V60, Kalita Wave, dan Aeropress.",
        level: "Pemula",
        durationMinutes: 90,
        publicationStatus: "PUBLISHED" as const,
        isFeatured: true,
      },
    ];

    for (const c of initialCourses) {
      const [insertedCourse] = await db
        .insert(coursesTable)
        .values(c)
        .onConflictDoUpdate({
          target: coursesTable.slug,
          set: { title: c.title, description: c.description, level: c.level },
        })
        .returning({ id: coursesTable.id });

      // Insert Module 1
      const [module1] = await db
        .insert(modulesTable)
        .values({
          courseId: insertedCourse.id,
          title: "Modul 1: Pengenalan & Ekstraksi",
          orderIndex: 1,
        })
        .returning({ id: modulesTable.id });

      // Insert Lesson 1 (Free) & Lesson 2 (Premium)
      await db
        .insert(lessonsTable)
        .values([
          {
            moduleId: module1.id,
            slug: `${c.slug}-lesson-1`,
            title: `Pengenalan Ekstraksi - ${c.title}`,
            description: "Lesson pengantar dasar ekstraksi dan perbandingan rasa.",
            durationMinutes: 15,
            accessType: "FREE",
            youtubeVideoId: "dQw4w9WgXcQ", // Free sample video
            orderIndex: 1,
            publicationStatus: "PUBLISHED",
          },
          {
            moduleId: module1.id,
            slug: `${c.slug}-lesson-2`,
            title: `Praktik Lanjutan & Troubleshooting - ${c.title}`,
            description: "Lesson premium penyetelan rasa dan solusi masalah seduh.",
            durationMinutes: 25,
            accessType: "PREMIUM",
            youtubeVideoId: "dQw4w9WgXcQ",
            orderIndex: 2,
            publicationStatus: "PUBLISHED",
          },
        ])
        .onConflictDoNothing();
    }

    console.log("✅ All seed data inserted into Neon PostgreSQL successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

if (require.main === module || process.argv[1]?.endsWith("seed/index.ts")) {
  runSeed();
}
