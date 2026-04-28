import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthTokenHandler } from "@/components/AuthTokenHandler";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'),
  title: {
    default: "Bagdja Store - Temukan Aplikasi Terbaik untuk Bisnis Anda",
    template: "%s | Bagdja Store",
  },
  description: "Jelajahi koleksi aplikasi berkualitas tinggi yang siap membantu meningkatkan produktivitas dan efisiensi bisnis Anda.",
  keywords: ["aplikasi bisnis", "software indonesia", "aplikasi produktivitas", "bagdja store"],
  authors: [{ name: "Bagdja Digital" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://store.bagdja.com",
    siteName: "Bagdja Store",
    title: "Bagdja Store - Temukan Aplikasi Terbaik untuk Bisnis Anda",
    description: "Jelajahi koleksi aplikasi berkualitas tinggi yang siap membantu meningkatkan produktivitas dan efisiensi bisnis Anda.",
    images: [
      {
        url: "/icon-logo.png",
        width: 1200,
        height: 630,
        alt: "Bagdja Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bagdja Store - Temukan Aplikasi Terbaik untuk Bisnis Anda",
    description: "Jelajahi koleksi aplikasi berkualitas tinggi yang siap membantu meningkatkan produktivitas dan efisiensi bisnis Anda.",
    images: ["/icon-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <AuthTokenHandler />
        {children}
      </body>
    </html>
  );
}
