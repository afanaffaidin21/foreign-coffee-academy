import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Foreign Coffee Academy — Belajar Kopi Terstruktur & Menyenangkan",
  description:
    "Platform belajar kopi berbahasa Indonesia untuk home brewer dan barista pemula melalui course, Coffee Guide, dan recipe yang saling terhubung.",
  icons: {
    icon: "/favicon-foreign.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id-ID" className={`${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-coffee-cream text-coffee-dark">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
