import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 개발 환경에서만 Supabase 연결 상태 확인
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.log("🔗 Supabase URL:", supabaseUrl);
  console.log("🔑 Supabase Key:", supabaseAnonKey?.substring(0, 20) + "...");

  // 환경변수 확인
  if (!supabaseUrl) {
    console.error("❌ NEXT_PUBLIC_SUPABASE_URL이 설정되지 않았습니다!");
  }
  if (!supabaseAnonKey) {
    console.error("❌ NEXT_PUBLIC_SUPABASE_ANON_KEY가 설정되지 않았습니다!");
  }
}

// Supabase 클라이언트 연결 상태 테스트
if (typeof window !== "undefined") {
  // 클라이언트 사이드에서만 실행
  console.log("🔗 Supabase client initialized on client side");
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
