"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { LogoutButton } from "./auth";

interface AdminAuthCheckProps {
  children: React.ReactNode;
  excludePaths?: string[];
}

interface UserProfile {
  role: string;
}

export default function AdminAuthCheck({
  children,
  excludePaths = [],
}: AdminAuthCheckProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuthAndRole();

    // Auth 상태 변화 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        setUser(null);
        setUserProfile(null);
        setLoading(false);
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        await checkAuthAndRole();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthAndRole = async () => {
    try {
      setLoading(true);
      setError(null);

      // 현재 로그인된 사용자 확인
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setUser(null);
        setUserProfile(null);
        setLoading(false);
        return;
      }

      setUser(user);

      // 사용자의 role 확인
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      if (!profile) {
        setError("사용자 프로필을 찾을 수 없습니다.");
        setUserProfile(null);
      } else {
        setUserProfile(profile);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setError("권한 확인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

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

  // 에러가 있거나 로그인되지 않은 경우 또는 admin 권한이 없는 경우
  if (error || !user || !userProfile || userProfile.role !== "admin") {
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
              <span className="text-sm text-gray-600">{user.email}</span>
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
