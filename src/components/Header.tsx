"use client";

import { Menu, Clock, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-30 flex flex-col">
        {/* Announcement Banner */}
        {isBannerVisible && (
          <div className="relative flex animate-pulse items-center justify-center gap-2 border-b border-gray-200 bg-black px-4 py-2 text-center text-sm text-white">
            <Clock className="h-4 w-4" />
            <p>
              <span className="font-semibold">컨퍼런스 일정:</span> 2025년 10월
              15일 (월) 12:00 - 18:00 KST
            </p>
            <button
              onClick={() => setIsBannerVisible(false)}
              className="absolute right-2 rounded-full p-1 transition-colors hover:bg-white/10"
              aria-label="배너 닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Main Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-black px-4">
          {/* Left - Sidebar Button */}
          <button
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Center - Title */}
          <h1 className="text-xl font-semibold text-white">2025 사물의 의회</h1>

          {/* Right - Apply Button */}
          <button className="rounded-full bg-[#f54fdc] px-4 py-2 text-[#171717] transition-colors hover:bg-[#e9e76f]">
            신청하기
          </button>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
