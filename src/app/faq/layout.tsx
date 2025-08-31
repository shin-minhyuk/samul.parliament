import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주묻는질문",
  description:
    "사물의 의회 2025에 대해 자주 묻는 질문과 답변을 확인하세요. 참가 방법, 일정, 활동 내용 등에 대한 궁금증을 해결해드립니다.",
  alternates: {
    canonical: "https://samulparliament.com/faq",
  },
  openGraph: {
    title: "자주묻는질문 | 사물의 의회 2025",
    description: "사물의 의회 2025에 대해 자주 묻는 질문과 답변을 확인하세요.",
    url: "https://samulparliament.com/faq",
  },
  other: {
    // 네이버 검색 최적화
    NaverBot: "All",
    Yeti: "All",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
