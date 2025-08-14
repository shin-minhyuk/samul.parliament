import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://vjqshkehfgkipvcwceag.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqcXNoa2VoZmdraXB2Y3djZWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTQ2MDYsImV4cCI6MjA2OTA5MDYwNn0.3xuwCWHs9bz5trAPuuas9sKeW3qZJ5x1IKflEbraYiY";

// 배포 환경 디버깅을 위해 임시로 모든 환경에서 로그 출력
if (typeof window !== "undefined") {
  console.log("🔗 Supabase URL:", supabaseUrl);
  console.log("🔑 Supabase Key:", supabaseAnonKey.substring(0, 20) + "...");
  console.log("🌍 Window Location:", window.location.origin);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
