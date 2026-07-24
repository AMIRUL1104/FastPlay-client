// src/app/layout.tsx
import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import { AIChatButton } from "../components/ai/AIChatButton";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "FastPlay — Sports Equipment Store",
  description: "Discover and purchase premium sports equipment quickly and efficiently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} scroll-smooth`}>
      {/* 
        Tailwind v4/v3 ভ্যারিয়েবল কল করার স্ট্যান্ডার্ড নিয়ম: bg-bg-page
        pb-16 md:pb-0 যোগ করা হয়েছে যাতে মোবাইলে ফিক্সড বটম ন্যাভবারের কারণে মেইন কনটেন্ট বা ফুটার ঢেকে না যায়।
      */}
      <body className="flex min-h-screen flex-col bg-bg-page text-text-body antialiased pb-16 md:pb-0">
        <Suspense fallback={<div className="h-16 bg-navy" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 flex flex-col w-full">
          {children}
          <AIChatButton />
        </main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}