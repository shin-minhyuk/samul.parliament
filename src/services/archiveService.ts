import { supabase } from "@/lib/supabase";
import { ArchiveItem } from "@/types";
import { isAdminEmail } from "@/constants/const";

// admin 권한 확인 함수 (이메일 기반)
async function checkAdminPermission() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  if (!user.email || !isAdminEmail(user.email)) {
    throw new Error("관리자 권한이 필요합니다.");
  }
}

// 아카이브 항목 목록 조회 (페이지네이션)
export async function getArchiveItems(
  page = 1,
  pageSize = 10,
): Promise<{ archives: ArchiveItem[]; total: number; hasMore: boolean }> {
  try {
    const offset = (page - 1) * pageSize;

    const {
      data: archives,
      error,
      count,
    } = await supabase
      .from("archives")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.error("Error fetching archives:", error);
      throw new Error("아카이브를 불러오는데 실패했습니다.");
    }

    return {
      archives: archives || [],
      total: count || 0,
      hasMore: (count || 0) > offset + pageSize,
    };
  } catch (error) {
    console.error("getArchiveItems 함수에서 예외 발생:", error);
    throw error;
  }
}

// 아카이브 항목 상세 조회
export async function getArchiveItemById(id: string): Promise<ArchiveItem> {
  const { data: archive, error } = await supabase
    .from("archives")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching archive:", error);
    throw new Error("아카이브를 불러오는데 실패했습니다.");
  }

  return archive;
}

// 파일 업로드 (이미지, PDF 등 - admin만 가능)
export async function uploadArchiveFile(
  file: File,
  fileType: "image" | "pdf",
): Promise<{ name: string; url: string }> {
  await checkAdminPermission();

  // 파일 타입 검증
  if (fileType === "image") {
    const allowedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    if (!allowedImageTypes.includes(file.type)) {
      throw new Error(
        "지원하지 않는 이미지 형식입니다. (JPEG, PNG, WebP만 지원)",
      );
    }
  } else if (fileType === "pdf") {
    if (file.type !== "application/pdf") {
      throw new Error("PDF 파일만 업로드 가능합니다.");
    }
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  // 파일 타입에 따라 다른 스토리지 버킷 사용
  const bucketName = fileType === "pdf" ? "archive-pdfs" : "archive-images";

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file);

  if (error) {
    console.error(`Error uploading ${fileType}:`, error);
    throw new Error(
      `${fileType === "pdf" ? "PDF" : "이미지"} 업로드에 실패했습니다.`,
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(data.path);

  return { name: fileName, url: publicUrl };
}

// 이미지 업로드 (기존 함수와의 호환성을 위해 유지)
export async function uploadArchiveImage(
  file: File,
): Promise<{ name: string; url: string }> {
  return uploadArchiveFile(file, "image");
}

// PDF 업로드 함수
export async function uploadArchivePDF(
  file: File,
): Promise<{ name: string; url: string }> {
  return uploadArchiveFile(file, "pdf");
}

// 아카이브 항목 생성 (admin만 가능)
export async function createArchiveItem(
  archiveItem: Omit<ArchiveItem, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  await checkAdminPermission();

  const { data: archive, error } = await supabase
    .from("archives")
    .insert({
      title: archiveItem.title,
      date: archiveItem.date,
      description: archiveItem.description,
      type: archiveItem.type,
      url: archiveItem.url,
      thumbnail_url: archiveItem.thumbnailUrl,
      tags: archiveItem.tags,
      category: archiveItem.category,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating archive:", error);
    throw new Error("아카이브 생성에 실패했습니다.");
  }

  return archive.id;
}

// 아카이브 항목 수정 (admin만 가능)
export async function updateArchiveItem(
  id: string,
  archiveItem: Partial<Omit<ArchiveItem, "id" | "createdAt" | "updatedAt">>,
): Promise<boolean> {
  await checkAdminPermission();

  const updateData: Partial<{
    title: string;
    date: string;
    description: string;
    type: string;
    url: string;
    thumbnail_url: string;
    tags: string[];
    category: string;
  }> = {};

  if (archiveItem.title !== undefined) updateData.title = archiveItem.title;
  if (archiveItem.date !== undefined) updateData.date = archiveItem.date;
  if (archiveItem.description !== undefined)
    updateData.description = archiveItem.description;
  if (archiveItem.type !== undefined) updateData.type = archiveItem.type;
  if (archiveItem.url !== undefined) updateData.url = archiveItem.url;
  if (archiveItem.thumbnailUrl !== undefined)
    updateData.thumbnail_url = archiveItem.thumbnailUrl;
  if (archiveItem.tags !== undefined) updateData.tags = archiveItem.tags;
  if (archiveItem.category !== undefined)
    updateData.category = archiveItem.category;

  const { error } = await supabase
    .from("archives")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating archive:", error);
    throw new Error("아카이브 수정에 실패했습니다.");
  }

  return true;
}

// 아카이브 항목 삭제 (admin만 가능)
export async function deleteArchiveItem(
  id: string,
  fileName?: string,
  fileType?: "image" | "pdf",
): Promise<boolean> {
  await checkAdminPermission();

  // Supabase에서 아카이브 삭제
  const { error } = await supabase.from("archives").delete().eq("id", id);

  if (error) {
    console.error("Error deleting archive:", error);
    throw new Error("아카이브 삭제에 실패했습니다.");
  }

  // Storage에서 파일 삭제 (필요한 경우)
  if (fileName && fileType) {
    try {
      const bucketName = fileType === "pdf" ? "archive-pdfs" : "archive-images";
      await supabase.storage.from(bucketName).remove([fileName]);
    } catch (storageError) {
      console.error(`Error deleting ${fileType} from storage:`, storageError);
      // 파일 삭제 오류는 무시하고 계속 진행 (문서 삭제는 성공)
    }
  }

  return true;
}

// PDF 다운로드 링크 생성 함수
export async function getPDFDownloadUrl(fileName: string): Promise<string> {
  const { data } = supabase.storage.from("archive-pdfs").getPublicUrl(fileName);

  return data.publicUrl;
}
