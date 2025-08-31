import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "참가자 모집",
  description:
    "사물의 의회 2025에 참여할 참가자를 모집합니다. 새로운 기후 민주주의를 함께 만들어갈 분들의 지원을 기다립니다.",
  alternates: {
    canonical: "https://samulparliament.com/recruitment",
  },
  openGraph: {
    title: "참가자 모집 | 사물의 의회 2025",
    description:
      "사물의 의회 2025에 참여할 참가자를 모집합니다. 새로운 기후 민주주의를 함께 만들어갈 분들의 지원을 기다립니다.",
    url: "https://samulparliament.com/recruitment",
  },
};

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
