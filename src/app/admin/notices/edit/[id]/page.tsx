"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import NoticeForm from "@/components/admin/NoticeForm";
// Firebase 연동 시 주석 해제
import { getNoticeById, updateNotice } from "@/services/noticeService";
import { Notice } from "@/types";

export default function EditNoticePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotice();
  }, [id]);

  const fetchNotice = async () => {
    setLoading(true);
    try {
      // Firebase 연동 시 아래 코드로 대체
      const fetchedNotice = await getNoticeById(id);

      // 임시로 정적 데이터에서 공지사항 찾기
      // const fetchedNotice = NOTICES.find((n) => n.id === Number(id));

      if (!fetchedNotice) {
        setError("공지사항을 찾을 수 없습니다.");
        setLoading(false);
        return;
      }

      // 타입 변환
      setNotice({
        id: String(fetchedNotice.id),
        title: fetchedNotice.title,
        content: fetchedNotice.content,
        date: fetchedNotice.date,
        important: fetchedNotice.important,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notice:", error);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleSubmit = async (
    data: Omit<Notice, "id" | "createdAt" | "updatedAt">,
  ) => {
    try {
      // Firebase 연동 시 아래 코드로 대체
      await updateNotice(id, data);

      console.log("공지사항 수정:", { id, ...data });

      // 임시 알림
      alert("공지사항이 수정되었습니다. (Firebase 연동 시 실제로 저장됩니다)");
      router.push("/admin/notices");
    } catch (error) {
      console.error("Error updating notice:", error);
      throw new Error("공지사항 수정 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 py-12">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" />
          <p>공지사항을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/admin/notices"
            className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
          >
            <ChevronLeft size={16} className="mr-1" /> 공지사항 목록으로
            돌아가기
          </Link>
        </div>
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/admin/notices"
            className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
          >
            <ChevronLeft size={16} className="mr-1" /> 공지사항 목록으로
            돌아가기
          </Link>
        </div>
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
          공지사항을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/notices"
          className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <ChevronLeft size={16} className="mr-1" /> 공지사항 목록으로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold">공지사항 수정</h1>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <NoticeForm
          initialData={notice}
          isEditing={true}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
