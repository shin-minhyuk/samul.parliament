import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항",
  description:
    "사물의 의회 2025의 최신 공지사항과 소식을 확인하세요. 참가자 모집, 일정 안내 등 중요한 정보를 놓치지 마세요.",
  alternates: {
    canonical: "https://samulparliament.com/notices",
  },
  openGraph: {
    title: "공지사항 | 사물의 의회 2025",
    description: "사물의 의회 2025의 최신 공지사항과 소식을 확인하세요.",
    url: "https://samulparliament.com/notices",
  },
};

export default function NoticesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
