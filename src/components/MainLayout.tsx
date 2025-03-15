"use client";

import { useBanner } from "@/context/BannerContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBannerVisible } = useBanner();

  return (
    <>
      <Header />
      <main className={`flex-grow ${isBannerVisible ? "pt-24" : "pt-16"}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
