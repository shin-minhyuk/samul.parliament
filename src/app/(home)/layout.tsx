import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://samulparliament.com",
  },
  other: {
    // 네이버 검색 최적화
    NaverBot: "All",
    Yeti: "All",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
