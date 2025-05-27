import type { Metadata } from "next";
import "./globals.css";
import { BannerProvider } from "@/context/BannerContext";
import MainLayout from "@/components/MainLayout";
import { Analytics } from "@vercel/analytics/react";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://samulparliament.com"),
  title: "사물의 의회 2025 | 미래의 공존을 위한 새로운 논의",
  description:
    "비인간 존재들의 권리와 발언권을 고민하는 '사물의 의회 2025'에서 자연과 기술이 조화롭게 공존하는 미래를 함께 만들어갑니다.",
  keywords: [
    "사물의 의회",
    "사물의회",
    "2025 사물의 의회",
    "환경",
    "지속가능성",
    "미래",
    "공존",
    "자연",
    "기술",
    "비인간 존재",
    "권리",
    "환경 보호",
    "기후위기",
    "브뤼노 라투르",
    "탈인간중심주의",
    "생태주의",
    "환경 컨퍼런스",
    "사물과 인간",
    "의회 2025",
    "환경 논의",
  ],
  authors: [{ name: "사물의 의회 조직위원회" }],
  creator: "사물의 의회",
  publisher: "사물의 의회",
  openGraph: {
    title: "사물의 의회 2025 | 미래의 공존을 위한 새로운 논의",
    description:
      "비인간 존재들의 권리와 발언권을 고민하는 '사물의 의회 2025'에서 자연과 기술이 조화롭게 공존하는 미래를 함께 만들어갑니다.",
    url: "https://samulparliament.com",
    siteName: "사물의 의회",
    images: [
      {
        url: "/images/twitter-image.png",
        width: 1200,
        height: 630,
        alt: "사물의 의회 2025",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "사물의 의회 2025 | 미래의 공존을 위한 새로운 논의",
    description: "비인간 존재들의 권리와 발언권을 고민하는 '사물의 의회 2025'",
    images: ["/images/twitter-image.png"],
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
    other: {
      "naver-site-verification": [process.env.NAVER_SITE_VERIFICATION || ""],
    },
  },
  alternates: {
    canonical: "https://samulparliament.com",
    languages: {
      "ko-KR": "https://samulparliament.com",
    },
  },
  category: "환경,지속가능성,사회운동",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`flex min-h-screen flex-col antialiased`}>
        <BannerProvider>
          <MainLayout>{children}</MainLayout>
        </BannerProvider>
      </body>
      <Analytics />
    </html>
  );
}
