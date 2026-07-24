# ☕ Foreign Coffee Academy

> **Platform Belajar Kopi Terstruktur & Menyenangkan Berbahasa Indonesia**  
> Didesain khusus untuk *Home Brewer* dan *Barista Pemula* melalui Course Video, Coffee Guide, dan Resep Praktis yang saling terhubung.

---

## 🌟 Fitur Utama & Keunggulan

- **🎓 Curated Learning Hubs**: 6 Alur Belajar berdasarkan tujuan (Espresso Mastery, Manual Brew V60, Latte Art, Biji Kopi & Sangrai, Fondasi Barista, Sensory & Tasting).
- **🔒 Paywall & Video Viewer Rules**: Lesson gratis vs premium dengan proteksi otorisasi server-side real-time.
- **💳 Midtrans Snap Sandbox Payment**: Integrasi pembayaran simulasi instan dengan verifikasi signature SHA-512 & pemrosesan entitlement idempoten.
- **⚡ Dynamic User Profile Header**: Header interaktif dengan User Profile Dropdown Menu ringkas dan fleksibel.
- **🛡️ Admin CMS Portal**: Pengelolaan status publikasi course, pustaka guide/resep, kurasi hub, manual membership override, dan Audit Log Viewer.
- **📊 Real-time Progress Tracker**: Pelacak persentase progres belajar dan lesson yang baru diselesaikan di Learner Dashboard.

---

## 🛠️ Stack Teknologi & Arsitektur

- **Framework**: Next.js 14 (App Router, Server Components & Server Actions)
- **Bahasa**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Plus Jakarta Sans + Playful Coffee Design System
- **Database & ORM**: Neon PostgreSQL + Drizzle ORM
- **Autentikasi**: NextAuth.js (Credentials Provider + JWT Extension)
- **Payment Gateway**: Midtrans Snap JS SDK (Sandbox Mode)
- **Testing**: Vitest (17 Tests Passing) + TypeScript `tsc --noEmit`
- **Deployment**: Vercel Hobby Platform (`sin1` Region)

---

## 🚀 Panduan Memulai (Local Development)

### 1. Prasyarat System
- Node.js v18.x atau versi lebih baru
- Database Neon PostgreSQL (atau PostgreSQL 15+)

### 2. Kloning Repository & Instalasi Dependensi
```bash
git clone https://github.com/afanaffaidin21/foreign-coffee-academy.git
cd foreign-coffee-academy
npm install
```

### 3. Konfigurasi Environment Variables (`.env`)
Buat file `.env` di root direktori proyek dan isi variabel berikut:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_ENV=development

DATABASE_URL=postgresql://neondb_owner:YOUR_NEON_PASSWORD@ep-twilight-band-az00ebz5.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
AUTH_SECRET=supersecret_auth_key_for_development_only

MIDTRANS_IS_PRODUCTION=false
MIDTRANS_SERVER_KEY=SB-Mid-server-YOUR_SANDBOX_KEY
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-YOUR_SANDBOX_KEY
NEXT_PUBLIC_MIDTRANS_SNAP_SCRIPT_URL=https://app.sandbox.midtrans.com/snap/snap.js

DEMO_ACCOUNT_PASSWORD=demo123456
```

### 4. Eksekusi Migrasi & Seeder Database
```bash
npm run db:push
npm run db:seed
```

### 5. Jalankan Server Lokal
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## 🔑 Kredensial Akun Portfolio Demo

| Peran Akun | Email | Password | Status Akses |
|---|---|---|---|
| **Free Student** | `student-free@example.com` | `demo123456` | Lesson Gratis |
| **Active Premium** | `student-active@example.com` | `demo123456` | Seluruh Content Unlocked 🔓 |
| **Expired Premium** | `student-expired@example.com` | `demo123456` | Paywall Active |
| **Super Admin** | `admin@example.com` | `demo123456` | Full CMS Portal Control 🛡️ |

---

## 🧪 Perintah Pengujian & Quality Assurance

```bash
# Validasi TypeScript Types
npm run type-check

# Jalankan Unit & Integration Test Suite (Vitest)
npm run test

# Jalankan Build Kompilasi Produksi
npm run build
```

---

## 🌐 Deployment di Vercel Hobby

1. Push repository ke GitHub.
2. Import repository di [Vercel Dashboard](https://vercel.com).
3. Masukkan seluruh variabel lingkungan `.env` pada menu **Project Settings -> Environment Variables**.
4. Klik **Deploy**.

---

## 📄 Lisensi & Kredit

Dibuat dengan ❤️ oleh **Foreign Coffee Academy Team**.  
*Lisensi MIT — Bebas digunakan dan dikembangkan.*
