"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  userProfile: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserProfile = async (userId: string) => {
    try {
      // 배포 환경 디버깅
      console.log("🔍 getUserProfile 시작:", userId);

      const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("❌ Error fetching user profile:", error);
        throw error;
      }

      // 배포 환경 디버깅
      console.log("✅ getUserProfile 성공:", profile);
      return profile;
    } catch (error) {
      console.error("💥 Exception in getUserProfile:", error);
      throw error;
    }
  };

  useEffect(() => {
    // 현재 세션 가져오기
    const getSession = async () => {
      // 배포 환경 디버깅을 위해 임시로 모든 환경에서 로그 출력
      console.log(
        "🚀 AuthContext: getSession 시작 (ENV:",
        process.env.NODE_ENV,
        ")",
      );
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          if (process.env.NODE_ENV === "development") {
            console.error("❌ Session 에러:", sessionError);
          }
          setLoading(false);
          return;
        }

        const currentUser = session?.user || null;

        if (currentUser) {
          if (process.env.NODE_ENV === "development") {
            console.log(
              "🔍 Attempting to get profile for user:",
              currentUser.id,
            );
            console.log("🌐 Environment:", process.env.NODE_ENV);
            console.log(
              "🔗 Current URL:",
              typeof window !== "undefined" ? window.location.href : "server",
            );
          }

          try {
            const profile = await getUserProfile(currentUser.id);

            if (process.env.NODE_ENV === "development") {
              console.log("✅ Profile loaded successfully:", profile);
            }

            setUserProfile(profile);
          } catch (error) {
            console.error(
              "❌ 사용자 프로필 로드 실패 - 자동 로그아웃 처리:",
              error,
            );

            // 프로필 로드 실패 시 자동 로그아웃
            try {
              await supabase.auth.signOut();
              console.log("🚪 자동 로그아웃 완료");
            } catch (signOutError) {
              console.error("❌ 로그아웃 중 오류:", signOutError);
            }

            setUserProfile(null);
          }
        } else {
          if (process.env.NODE_ENV === "development") {
            console.log("🚫 No current user");
          }
          setUserProfile(null);
        }

        // 배포 환경 디버깅
        console.log("✅ AuthContext: getSession 완료");
        setLoading(false);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("💥 getSession 에러:", error);
        }
        setLoading(false);
      }
    };

    getSession();

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null;

      if (currentUser) {
        try {
          const profile = await getUserProfile(currentUser.id);
          setUserProfile(profile);
        } catch (error) {
          console.error(
            "❌ 인증 상태 변경 시 프로필 로드 실패 - 자동 로그아웃 처리:",
            error,
          );

          // 프로필 로드 실패 시 자동 로그아웃
          try {
            await supabase.auth.signOut();
            console.log("🚪 자동 로그아웃 완료 (onAuthStateChange)");
          } catch (signOutError) {
            console.error("❌ 로그아웃 중 오류:", signOutError);
          }

          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
  };

  const value = {
    userProfile,
    loading,
    isAdmin: userProfile?.role === "admin",
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
