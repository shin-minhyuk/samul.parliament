import { supabase } from "@/lib/supabase";
import { Notice } from "@/types";

// admin 권한 확인 함수
async function checkAdminPermission() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { data: userProfile, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || userProfile?.role !== "admin") {
    throw new Error("관리자 권한이 필요합니다.");
  }
}

// 공지사항 목록 조회 (페이지네이션)
export async function getNotices(
  page = 1,
  pageSize = 10,
): Promise<{ notices: Notice[]; total: number; hasMore: boolean }> {
  const offset = (page - 1) * pageSize;

  const {
    data: notices,
    error,
    count,
  } = await supabase
    .from("notices")
    .select("*", { count: "exact" })
    .order("date", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (error) {
    console.error("Error fetching notices:", error);
    throw new Error("공지사항을 불러오는데 실패했습니다.");
  }

  return {
    notices: notices || [],
    total: count || 0,
    hasMore: (count || 0) > offset + pageSize,
  };
}

// 공지사항 상세 조회
export async function getNoticeById(id: string): Promise<Notice | null> {
  const { data: notice, error } = await supabase
    .from("notices")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // 데이터를 찾을 수 없음
    }
    console.error("Error getting notice:", error);
    throw new Error("공지사항을 불러오는데 실패했습니다.");
  }

  return notice;
}

// 공지사항 생성 (admin만 가능)
export async function createNotice(
  notice: Omit<Notice, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  await checkAdminPermission();

  const { data: newNotice, error } = await supabase
    .from("notices")
    .insert({
      title: notice.title,
      content: notice.content,
      date: notice.date,
      category: notice.category,
      important: notice.important || false,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating notice:", error);
    throw new Error("공지사항 생성에 실패했습니다.");
  }

  return newNotice.id;
}

// 공지사항 수정 (admin만 가능)
export async function updateNotice(
  id: string,
  notice: Partial<Omit<Notice, "id" | "createdAt" | "updatedAt">>,
): Promise<boolean> {
  await checkAdminPermission();

  const updateData: Partial<{
    title: string;
    content: string;
    date: string;
    category: string;
    important: boolean;
  }> = {};

  if (notice.title !== undefined) updateData.title = notice.title;
  if (notice.content !== undefined) updateData.content = notice.content;
  if (notice.date !== undefined) updateData.date = notice.date;
  if (notice.category !== undefined) updateData.category = notice.category;
  if (notice.important !== undefined) updateData.important = notice.important;

  const { error } = await supabase
    .from("notices")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating notice:", error);
    throw new Error("공지사항 수정에 실패했습니다.");
  }

  return true;
}

// 공지사항 삭제 (admin만 가능)
export async function deleteNotice(id: string): Promise<boolean> {
  await checkAdminPermission();

  const { error } = await supabase.from("notices").delete().eq("id", id);

  if (error) {
    console.error("Error deleting notice:", error);
    throw new Error("공지사항 삭제에 실패했습니다.");
  }

  return true;
}
