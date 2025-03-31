"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminAuth from "./auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminLoginPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 이미 로그인 된 경우 대시보드로 리디렉션
        router.push("/admin/dashboard");
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [router]);

  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">사물의 의회</h1>
        <p className="text-gray-600">관리자 페이지</p>
      </div>
      <AdminAuth />
    </div>
  );
}
