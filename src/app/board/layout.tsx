import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "게시판",
  description:
    "사물의 의회 참가자들과 소통하고 의견을 나누는 공간입니다. 자유롭게 글을 작성하고 댓글로 소통해보세요.",
  alternates: {
    canonical: "https://samulparliament.com/board",
  },
  openGraph: {
    title: "게시판 | 사물의 의회 2025",
    description: "사물의 의회 참가자들과 소통하고 의견을 나누는 공간입니다.",
    url: "https://samulparliament.com/board",
  },
  other: {
    // 네이버 검색 최적화
    NaverBot: "All",
    Yeti: "All",
  },
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
