"use client";

import { Menu, Clock, X, LogOut } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useBanner } from "@/context/BannerContext";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import Link from "next/link";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isBannerVisible, setIsBannerVisible } = useBanner();
  const { userProfile, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

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

          {/* Center - Title and Navigation */}
          <div className="flex items-center gap-8">
            <Logo className="mb-1" />
          </div>

          {/* Right - Login/User Info */}
          <div className="flex w-[100px] items-center justify-end text-end">
            {loading ? (
              <div className="h-8 w-16 animate-pulse rounded bg-gray-200"></div>
            ) : userProfile ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  {userProfile.name || "사용자"}
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-ocean-deep hover:bg-ocean-deep/10 rounded-lg p-1 transition-colors"
                  title="로그아웃"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:scale-105 hover:bg-gray-300"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
