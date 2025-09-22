"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSimpleAuth } from "@/context/SimpleAuthContext";

interface AdminAuthCheckProps {
  children: React.ReactNode;
  excludePaths?: string[];
}

export default function AdminAuthCheck({
  children,
  excludePaths = [],
}: AdminAuthCheckProps) {
  const { isAuthenticated, logout } = useSimpleAuth();
  const router = useRouter();
  const pathname = usePathname();

  // 제외 경로에 있을 경우 인증 확인 스킵
  if (excludePaths.includes(pathname)) {
    return <>{children}</>;
  }

  // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return router.push("/admin");
  }

  // 인증된 경우 관리자 헤더와 함께 자식 컴포넌트 렌더링
  return (
    <>
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">
                사물의 의회 관리자
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                관리자 모드
              </span>
              <button
                onClick={logout}
                className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
