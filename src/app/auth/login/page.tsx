"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { userProfile } = useAuth();

  const handleKakaoLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("카카오 로그인 에러:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("카카오 로그인 에러:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (userProfile) {
    return router.replace("/");
  }

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="mx-auto w-full max-w-md px-4 py-10">
        {/* 로고 및 헤더 섹션 */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">환영합니다!</h1>
          <p className="text-lg text-gray-600">
            간편하게 로그인하고 시작해보세요
          </p>
        </div>

        {/* 로그인 카드 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">로그인</h2>
            <p className="text-sm text-gray-500">
              카카오톡으로 3초만에 시작하기
            </p>
          </div>

          {/* 카카오 로그인 버튼 */}
          <button
            type="button"
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#feec49] px-6 py-4 font-medium text-gray-900 transition-all duration-200 hover:scale-[1.02] hover:bg-[#feec49]/80 hover:shadow-lg active:scale-[0.98]"
            onClick={handleKakaoLogin}
          >
            <div className="flex h-4 w-4 items-center justify-center rounded-full transition-transform group-hover:scale-110 lg:h-6 lg:w-6">
              <Image
                src="/images/ico_kakao_logo.png"
                alt="카카오 로그인"
                width={16}
                height={16}
              />
            </div>
            <span className="text-sm font-semibold lg:text-base">
              카카오로 3초 만에 시작하기
            </span>
          </button>

          {/* 추가 정보 */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              로그인 시 <span className="text-gray-600">이용약관</span> 및{" "}
              <span className="text-gray-600">개인정보처리방침</span>에 동의하게
              됩니다.
            </p>
          </div>
        </div>

        {/* 하단 장식 */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-300"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400 delay-100"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500 delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
