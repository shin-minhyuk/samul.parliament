"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AdminAuth() {
  const { userProfile, loading, isAdmin, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userProfile && isAdmin) {
      // admin 권한이 있으면 대시보드로 이동
      router.push("/admin/dashboard");
    }
  }, [loading, userProfile, isAdmin, router]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto mt-10 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
          <p>권한을 확인하는 중...</p>
        </div>
      </div>
    );
  }

  // admin 권한이 있는 경우 (대시보드로 이동 중)
  if (userProfile && isAdmin) {
    return (
      <div className="mx-auto mt-10 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <p className="mb-4 text-green-600">관리자 권한이 확인되었습니다.</p>
          <p className="mb-4 text-sm text-gray-600">
            로그인: {userProfile.email}
          </p>
          <p className="text-sm text-gray-500">대시보드로 이동 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold">관리자 페이지</h1>

      <div className="mb-4 rounded-lg bg-red-50 p-4">
        <div className="text-center">
          {!userProfile ? (
            <>
              <p className="mb-4 text-red-700">로그인이 필요합니다.</p>
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  className="block w-full rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
                >
                  로그인하기
                </Link>
                <p className="text-sm text-gray-600">
                  로그인 후 관리자 권한이 있는지 확인됩니다.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="mb-4 text-red-700">관리자 권한이 없습니다.</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  현재 로그인: {userProfile.email}
                </p>
                <p className="text-sm text-gray-600">
                  권한: {userProfile.role}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
                >
                  로그아웃
                </button>
                <Link
                  href="/"
                  className="block w-full rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
                >
                  메인 페이지로
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function LogoutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
    >
      로그아웃
    </button>
  );
}
