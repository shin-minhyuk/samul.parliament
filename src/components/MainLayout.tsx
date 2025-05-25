"use client";

import { useBanner } from "@/context/BannerContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstagramFAB from "@/components/InstagramFAB";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBannerVisible } = useBanner();

  // 실제 인스타그램 URL을 여기에 입력하세요
  const instagramUrl = "https://www.instagram.com/samul.parliament/";

  return (
    <>
      <Header />
      <main className={`flex-grow ${isBannerVisible ? "pt-24" : "pt-16"}`}>
        {children}
      </main>
      <Footer />
      <InstagramFAB instagramUrl={instagramUrl} />
    </>
  );
}
