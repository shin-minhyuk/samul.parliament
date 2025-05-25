"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import NoticeForm from "@/components/admin/NoticeForm";
// Firebase 연동 시 주석 해제
import { createNotice } from "@/services/noticeService";
import { Notice } from "@/types";

export default function NewNoticePage() {
  const handleSubmit = async (
    data: Omit<Notice, "id" | "createdAt" | "updatedAt">,
  ) => {
    try {
      // Firebase 연동 시 주석 해제
      await createNotice(data);

      // 임시 알림
      alert(
        "새 공지사항이 생성되었습니다. (Firebase 연동 시 실제로 저장됩니다)",
      );
    } catch (error) {
      console.error("Error creating notice:", error);
      throw new Error("공지사항 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/notices"
          className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <ChevronLeft size={16} className="mr-1" /> 공지사항 목록으로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold">새 공지사항 작성</h1>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <NoticeForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
