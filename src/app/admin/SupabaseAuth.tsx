"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { isAdminEmail } from "@/constants/const";

export default function SupabaseAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // 이미 로그인된 경우 대시보드로 리다이렉트
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (
        session?.user &&
        session.user.email &&
        isAdminEmail(session.user.email)
      ) {
        router.push("/admin/dashboard");
      }
    };

    checkSession();
  }, [router]);

  const handleKakaoLogin = async () => {
    setError("");
    setLoading(true);

    try {
      console.log("카카오톡 로그인 시도...");
      console.log("Redirect URL:", `${window.location.origin}/admin/dashboard`);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}/admin/dashboard`,
        },
      });

      console.log("OAuth response:", { data, error });

      if (error) {
        console.error("OAuth error details:", {
          message: error.message,
          status: error.status,
          details: error,
        });
        throw error;
      }
    } catch (error) {
      console.error("Kakao login error:", error);
      setError(
        error instanceof Error
          ? `카카오톡 로그인 오류: ${error.message}`
          : "카카오톡 로그인 중 오류가 발생했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          사물의 의회 관리자
        </h1>
        <p className="text-gray-600">카카오톡으로 관리자 로그인</p>
      </div>

      {error && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>
      )}

      <div className="space-y-4">
        <button
          onClick={handleKakaoLogin}
          disabled={loading}
          className="flex w-full items-center justify-center rounded-md bg-yellow-400 px-4 py-3 font-medium text-gray-900 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-900 border-t-transparent"></div>
              로그인 중...
            </div>
          ) : (
            <div className="flex items-center">
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
              </svg>
              카카오톡으로 로그인
            </div>
          )}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="mb-4 text-sm text-gray-500">
          관리자 권한이 있는 카카오톡 계정으로만 로그인이 가능합니다.
        </p>
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-500">
          ← 메인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
