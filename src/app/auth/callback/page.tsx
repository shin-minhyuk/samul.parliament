"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("인증 콜백 에러:", error);
          router.push("/?error=auth_failed");
          return;
        }

        if (data.session) {
          // 로그인 성공 시 메인 페이지로 리다이렉트
          router.push("/?login=success");
        } else {
          router.push("/?error=no_session");
        }
      } catch (error) {
        console.error("인증 처리 중 에러:", error);
        router.push("/?error=auth_error");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-yellow-500"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}
