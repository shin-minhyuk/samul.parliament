import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://samulparliament.com",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
