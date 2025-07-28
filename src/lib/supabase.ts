import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vjqshkehfgkipvcwceag.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqcXNoa2VoZmdraXB2Y3djZWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTQ2MDYsImV4cCI6MjA2OTA5MDYwNn0.3xuwCWHs9bz5trAPuuas9sKeW3qZJ5x1IKflEbraYiY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
