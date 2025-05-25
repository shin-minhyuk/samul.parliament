"use client";

import { Menu, Clock, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useBanner } from "@/context/BannerContext";
import { Button } from "./Button";
import { openExternalLink } from "@/util/url";
import Logo from "./Logo";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isBannerVisible, setIsBannerVisible } = useBanner();

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-30 flex flex-col">
        {/* Announcement Banner */}
        {isBannerVisible && (
          <div className="border-ocean-deep/20 text-ocean-deep relative border-b bg-white/60 px-4 py-2 text-center text-sm backdrop-blur-md">
            <div className="flex animate-pulse items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <p>
                <span className="font-semibold">본회의 일정:</span> 2025년 11월
                1일 ~ 2일 (토, 일) 10:00 - 17:00 KST
              </p>
              <button
                onClick={() => setIsBannerVisible(false)}
                className="hover:bg-ocean-deep/10 absolute right-2 rounded-full p-1 transition-colors"
                aria-label="배너 닫기"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main Header */}
        <div className="border-ocean-blue/20 flex h-16 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-sm">
          {/* Left - Sidebar Button */}
          <div className="w-[100px]">
            <button
              className="text-ocean-deep hover:bg-ocean-deep/10 rounded-lg p-2 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Center - Title */}
          <Logo className="mb-1" />

          {/* Right - Apply Button */}
          <div className="w-[100px] text-end">
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
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
