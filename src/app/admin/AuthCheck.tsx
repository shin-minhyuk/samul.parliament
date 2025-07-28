"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogoutButton } from "./auth";

interface AdminAuthCheckProps {
  children: React.ReactNode;
  excludePaths?: string[];
}

export default function AdminAuthCheck({
  children,
  excludePaths = [],
}: AdminAuthCheckProps) {
  const { userProfile, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
          <p>권한을 확인하는 중...</p>
        </div>
      </div>
    );
  }

  // 제외 경로에 있을 경우 인증 확인 스킵
  if (excludePaths.includes(pathname)) {
    return <>{children}</>;
  }

  // 로그인되지 않았거나 admin 권한이 없는 경우
  if (!userProfile || !isAdmin) {
    router.push("/admin");
    return null;
  }

  // admin 권한이 있는 경우 관리자 UI와 함께 자식 컴포넌트 렌더링
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
              <span className="text-sm text-gray-600">{userProfile.email}</span>
              <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                {userProfile.role}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
