import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오시는 길",
  description:
    "사물의 의회 2025 행사 장소와 오시는 길을 안내합니다. 대중교통 이용 방법과 주변 정보를 확인하세요.",
  alternates: {
    canonical: "https://samulparliament.com/location",
  },
  openGraph: {
    title: "오시는 길 | 사물의 의회 2025",
    description: "사물의 의회 2025 행사 장소와 오시는 길을 안내합니다.",
    url: "https://samulparliament.com/location",
  },
};

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
