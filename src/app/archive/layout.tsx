import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "아카이브",
  description:
    "사물의 의회 활동 기록을 사진, 영상으로 확인하세요. 과거 행사와 활동의 소중한 순간들을 보관하고 있습니다.",
  alternates: {
    canonical: "https://samulparliament.com/archive",
  },
  openGraph: {
    title: "아카이브 | 사물의 의회 2025",
    description: "사물의 의회 활동 기록을 사진, 영상으로 확인하세요.",
    url: "https://samulparliament.com/archive",
  },
  other: {
    // 네이버 검색 최적화
    NaverBot: "All",
    Yeti: "All",
  },
};

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
