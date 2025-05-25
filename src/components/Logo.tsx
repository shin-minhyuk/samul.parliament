"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div
      className={twMerge(
        "text-primary-500 hover:text-primary-400 -rotate-4 text-xl md:text-3xl",
        className,
      )}
      style={{ fontFamily: "var(--font-logo)" }}
    >
      <Link href="/">사물의 의회</Link>
    </div>
  );
}
