import bcrypt from "bcryptjs";

export async function generateSeedData() {
  const passwordHash = await bcrypt.hash("demo123456", 10);

  const users = [
    {
      email: "student-free@example.com",
      name: "Budi (Free Learner)",
      role: "STUDENT",
      passwordHash,
    },
    {
      email: "student-active@example.com",
      name: "Siti (Active Premium)",
      role: "STUDENT",
      passwordHash,
    },
    {
      email: "student-expired@example.com",
      name: "Andi (Expired Premium)",
      role: "STUDENT",
      passwordHash,
    },
    {
      email: "admin@example.com",
      name: "Foreign Coffee Admin",
      role: "ADMIN",
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
    { slug: "espresso", title: "Espresso & Dial In", orderIndex: 1 },
    { slug: "manual-brew", title: "Manual Brew V60", orderIndex: 2 },
    { slug: "latte-art", title: "Latte Art & Milk Texturing", orderIndex: 3 },
    { slug: "coffee-beans", title: "Biji Kopi & Sangrai", orderIndex: 4 },
    { slug: "barista-fundamentals", title: "Fondasi Barista", orderIndex: 5 },
    { slug: "sensory-tasting", title: "Sensory & Tasting Kopi", orderIndex: 6 },
  ];

  return { users, plans, hubs };
}

console.log("🌱 Seed generator prepared for Foreign Coffee Academy database.");
