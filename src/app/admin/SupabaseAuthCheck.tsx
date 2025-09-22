"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { isAdminEmail } from "@/constants/const";

interface AdminAuthCheckProps {
  children: React.ReactNode;
  excludePaths?: string[];
}

export default function SupabaseAuthCheck({
  children,
  excludePaths = [],
}: AdminAuthCheckProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 현재 사용자 세션 확인
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          console.error("Session error:", error);
          setUser(null);
          setIsAdmin(false);
        } else if (session?.user) {
          setUser(session.user);

          // 사용자가 관리자인지 이메일로 확인
          const adminStatus = session.user.email
            ? isAdminEmail(session.user.email)
            : false;
          setIsAdmin(adminStatus);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Auth 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);

        // 사용자가 관리자인지 이메일로 확인
        const adminStatus = session.user.email
          ? isAdminEmail(session.user.email)
          : false;
        setIsAdmin(adminStatus);

        // OAuth 로그인 후 관리자 권한이 없으면 자동 로그아웃
        if (event === "SIGNED_IN" && !adminStatus) {
          console.log("관리자 권한이 없는 사용자입니다. 로그아웃합니다.");
          // 비동기 작업을 별도로 실행
          setTimeout(async () => {
            await supabase.auth.signOut();
          }, 0);
          setUser(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!loading && !user && !excludePaths.includes(pathname)) {
      router.push("/admin");
    }
  }, [loading, user, router, excludePaths, pathname]);

  // 제외 경로에 있을 경우 인증 확인 스킵
  if (excludePaths.includes(pathname)) {
    return <>{children}</>;
  }

  // 로딩 중
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">로그인 페이지로 이동 중...</p>
      </div>
    );
  }

  // 관리자가 아닌 경우
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-8 text-center">
          <h2 className="mb-4 text-xl font-bold text-red-800">
            접근 권한이 없습니다
          </h2>
          <p className="mb-4 text-red-600">관리자 권한이 필요합니다.</p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  }

  // 관리자로 인증된 경우 관리자 헤더와 함께 자식 컴포넌트 렌더링
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/admin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
              <span className="text-sm text-gray-600">{user.email}</span>
              <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                관리자 모드
              </span>
              <button
                onClick={handleLogout}
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
