import { supabase } from "@/lib/supabase";
import { FAQ } from "@/types";

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

// FAQ 목록 조회 (생성일 순)
export async function getFaqs(): Promise<FAQ[]> {
  try {
    const { data: faqs, error } = await supabase
      .from("faqs")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching FAQs:", error);
      // 테이블이 존재하지 않거나 접근 권한이 없는 경우 빈 배열 반환
      if (error.code === "42P01" || error.code === "42501") {
        return [];
      }
      throw new Error("FAQ를 불러오는데 실패했습니다.");
    }

    return faqs || [];
  } catch (error) {
    console.error("getFaqs 함수에서 예외 발생:", error);
    // 에러가 발생해도 빈 배열 반환하여 페이지가 로딩되도록 함
    return [];
  }
}

// FAQ 상세 조회
export async function getFaqById(id: string): Promise<FAQ | null> {
  const { data: faq, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // 데이터를 찾을 수 없음
    }
    console.error(`Error getting FAQ with ID ${id}:`, error);
    throw new Error("FAQ를 불러오는데 실패했습니다.");
  }

  return faq;
}

// FAQ 생성 (admin만 가능)
export async function createFaq(
  faq: Omit<FAQ, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  await checkAdminPermission();

  const { data: newFaq, error } = await supabase
    .from("faqs")
    .insert({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "uncategorized",
      tags: faq.tags || [],
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating FAQ:", error);
    throw new Error("FAQ 생성에 실패했습니다.");
  }

  return newFaq.id;
}

// FAQ 수정 (admin만 가능)
export async function updateFaq(
  id: string,
  faq: Partial<Omit<FAQ, "id" | "createdAt" | "updatedAt">>,
): Promise<void> {
  await checkAdminPermission();

  const updateData: Partial<{
    question: string;
    answer: string;
    category: string;
    tags: string[];
  }> = {};

  if (faq.question !== undefined) updateData.question = faq.question;
  if (faq.answer !== undefined) updateData.answer = faq.answer;
  if (faq.category !== undefined) updateData.category = faq.category;
  if (faq.tags !== undefined) updateData.tags = faq.tags;

  const { error } = await supabase.from("faqs").update(updateData).eq("id", id);

  if (error) {
    console.error(`Error updating FAQ with ID ${id}:`, error);
    throw new Error("FAQ 수정에 실패했습니다.");
  }
}

// FAQ 삭제 (admin만 가능)
export async function deleteFaq(id: string): Promise<void> {
  await checkAdminPermission();

  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting FAQ with ID ${id}:`, error);
    throw new Error("FAQ 삭제에 실패했습니다.");
  }
}
