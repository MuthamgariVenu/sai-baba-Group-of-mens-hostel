import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopContactBar from "@/components/TopContactBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sai Baba Men's PG | Best Men's Hostel in Hyderabad",
  description:
    "Sai Baba Men's PG offers safe, clean and affordable men's hostel accommodation in Hyderabad with food and modern facilities.",
  keywords: [
    "Sai Baba Men's PG",
    "Men's PG in Hyderabad",
    "Men's Hostel in Hyderabad",
    "Boys PG Hyderabad",
    "PG near me",
    "Affordable Men's PG Hyderabad",
  ],
  openGraph: {
    title: "Sai Baba Men's PG | Best Men's Hostel in Hyderabad",
    description:
      "Safe, clean and affordable men's PG in Hyderabad with food and modern facilities.",
    url: "https://www.saibabagroupofhostels.in",
    siteName: "Sai Baba Group Of Hostel's",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Top Contact Bar */}
        <TopContactBar />

        {/* ✅ Main App Content */}
        {children}
      </body>
    </html>
  );
}
