# 📓 Case Study — Foreign Coffee Academy

## 1. Visi Produk & Tantangan
Banyak pemula yang ingin belajar kopi merasa bingung oleh istilah teknis yang terlalu rumit dan ketiadaan kurikulum terstruktur berbahasa Indonesia. Foreign Coffee Academy hadir sebagai platform pembelajaran kopi komprehensif yang menghubungkan alur belajar berbasis tujuan (*Learning Hubs*), course video interaktif, pustaka alat (*Coffee Guide*), dan resep praktis.

## 2. Pilihan Arsitektur & Performa
- **Next.js 14 App Router**: Memanfaatkan Server Components untuk rendering halaman publik cepat (SEO-friendly) dan Client Components khusus untuk interaktivitas pengguna (seperti User Dropdown Header dan Midtrans Snap Popup).
- **Neon PostgreSQL & Drizzle ORM**: Database serverless Neon memastikan koneksi cepat melalui WebSocket (`@neondatabase/serverless`), dipadu dengan Drizzle ORM untuk type-safety SQL 100%.

## 3. Sistem Desain & Estetika (Playful Coffee Learning UI)
- **Palet Warna**: Mengombinasikan `coffee-cream` (#FAF7F2), `coffee-dark` (#1C1613), dan `coffee-accent` (#C85A17) dengan kontras tinggi.
- **Mikro-Interaksi**: Hover transition pada bento card, badge keanggotaan interaktif, serta User Profile Dropdown yang bersih di Header.

## 4. Keamanan & Pembayaran (Midtrans Sandbox Integrasi)
- **Otorisasi Entitlement Live**: Tidak pernah mengandalkan JWT session token statis untuk memeriksa status premium. Sistem selalu memeriksa status keanggotaan live di database Neon (`requirePremiumEntitlement`).
- **Verifikasi Signature SHA-512**: Webhook Midtrans diuji dengan verifikasi signature SHA-512 `SHA512(order_id + status_code + gross_amount + server_key)` untuk mencegah tampering data.
- **Idempotensi Entitlement**: Webhook memverifikasi kolom `entitlementAppliedAt` untuk memastikan perpanjangan masa aktif hanya dihitung sekali meskipun webhook dipanggil berulang kali.

## 5. Ringkasan Hasil Pengujian (Quality Assurance)
- **100% Type-Safe**: 0 error pada TypeScript type check (`tsc --noEmit`).
- **17 Unit & Integration Tests**: Seluruh modul auth, schema, learning, payment, admin, dan E2E suite lulus tanpa kegagalan.
- **24 Halaman Terkompilasi**: Seluruh rute terkompilasi dengan mulus pada Next.js production build.
