import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "일정",
  description:
    "사물의 의회 2025의 전체 일정을 확인하세요. 워크숍, 세미나, 회의 등 모든 행사 일정을 한눈에 볼 수 있습니다.",
  alternates: {
    canonical: "https://samulparliament.com/schedule",
  },
  openGraph: {
    title: "일정 | 사물의 의회 2025",
    description: "사물의 의회 2025의 전체 일정을 확인하세요.",
    url: "https://samulparliament.com/schedule",
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
