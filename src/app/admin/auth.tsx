"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface UserProfile {
  role: string;
}

export default function AdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkUserAndRole();
  }, []);

  const checkUserAndRole = async () => {
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
        setError("로그인이 필요합니다.");
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

      if (!profile || profile.role !== "admin") {
        setError("관리자 권한이 없습니다.");
        setLoading(false);
        return;
      }

      setUserProfile(profile);

      // admin 권한이 있으면 대시보드로 이동
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Admin auth check error:", error);
      setError("권한 확인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
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

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold">관리자 페이지</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4">
          <div className="text-center">
            <p className="mb-4 text-red-700">{error}</p>

            {!user ? (
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
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  현재 로그인: {user.email}
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
            )}
          </div>
        </div>
      )}

      {user && userProfile && (
        <div className="text-center">
          <p className="mb-4 text-green-600">관리자 권한이 확인되었습니다.</p>
          <p className="mb-4 text-sm text-gray-600">로그인: {user.email}</p>
          <p className="text-sm text-gray-500">대시보드로 이동 중...</p>
        </div>
      )}
    </div>
  );
}

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
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
