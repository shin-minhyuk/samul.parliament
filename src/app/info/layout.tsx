import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로젝트 소개",
  description:
    "사물의 의회 2025 프로젝트에 대한 자세한 정보를 확인해보세요. 비인간 존재들의 권리와 발언권을 고민하는 새로운 기후 민주주의 실험입니다.",
  alternates: {
    canonical: "https://samulparliament.com/info",
  },
  openGraph: {
    title: "프로젝트 소개 | 사물의 의회 2025",
    description: "사물의 의회 2025 프로젝트에 대한 자세한 정보를 확인해보세요.",
    url: "https://samulparliament.com/info",
  },
  other: {
    // 네이버 검색 최적화
    NaverBot: "All",
    Yeti: "All",
  },
};

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
