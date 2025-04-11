"use client";

import { Menu, Clock, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { useBanner } from "@/context/BannerContext";
import { Button } from "./Button";
import { openExternalLink } from "@/util/url";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isBannerVisible, setIsBannerVisible } = useBanner();

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-30 flex flex-col">
        {/* Announcement Banner */}
        {isBannerVisible && (
          <div className="border-nature-forest/20 text-nature-forest relative border-b bg-white/60 px-4 py-2 text-center text-sm backdrop-blur-md">
            <div className="flex animate-pulse items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <p>
                <span className="font-semibold">컨퍼런스 일정:</span> 2025년
                10월 15일 (월) 12:00 - 18:00 KST
              </p>
              <button
                onClick={() => setIsBannerVisible(false)}
                className="hover:bg-nature-forest/10 absolute right-2 rounded-full p-1 transition-colors"
                aria-label="배너 닫기"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main Header */}
        <div className="border-nature-forest/20 flex h-16 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-sm">
          {/* Left - Sidebar Button */}
          <button
            className="text-nature-forest hover:bg-nature-forest/10 rounded-lg p-2 transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Center - Title */}
          <h1 className="text-nature-forest hover:text-nature-spring text-xl font-semibold">
            <Link href="/">2025 사물의 의회</Link>
          </h1>

          {/* Right - Apply Button */}
          <Button
            type="button"
            className="text-sm hover:scale-105"
            onClick={() =>
              openExternalLink("https://www.instagram.com/samul.parliament")
            }
          >
            지원하기
          </Button>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
