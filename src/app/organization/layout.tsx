import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "조직위원회",
  description:
    "사물의 의회 2025를 기획하고 운영하는 조직위원회를 소개합니다. 다양한 분야의 전문가들이 함께 만들어가는 프로젝트입니다.",
  alternates: {
    canonical: "https://samulparliament.com/organization",
  },
  openGraph: {
    title: "조직위원회 | 사물의 의회 2025",
    description:
      "사물의 의회 2025를 기획하고 운영하는 조직위원회를 소개합니다.",
    url: "https://samulparliament.com/organization",
  },
  other: {
    // 네이버 검색 최적화
    NaverBot: "All",
    Yeti: "All",
  },
};

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
