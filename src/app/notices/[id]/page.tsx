"use client";

import React from "react";
import { Megaphone, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { NOTICES, formatDate } from "@/data";

export default function NoticeDetailPage() {
  const params = useParams();
  const noticeId = parseInt(params.id as string);

  // 해당 ID의 공지사항 찾기
  const notice = NOTICES.find((n) => n.id === noticeId);

  // 공지사항이 없으면 404 페이지로 이동
  if (!notice) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* 뒤로 가기 링크 */}
        <div className="mb-8">
          <Link
            href="/notices"
            className="text-nature-spring flex items-center gap-1 text-sm font-medium hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            공지사항 목록으로 돌아가기
          </Link>
        </div>

        {/* 공지사항 상세 내용 */}
        <div
          className={`rounded-xl bg-white p-8 shadow-md ${
            notice.isImportant ? "border-nature-spring border-l-4" : ""
          }`}
        >
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {notice.isImportant && (
                <div className="bg-nature-spring rounded-full p-1.5 text-white">
                  <Megaphone className="h-5 w-5" />
                </div>
              )}
              <h1 className="text-nature-forest text-2xl font-bold md:text-3xl">
                {notice.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(notice.date)}</span>
            </div>
          </div>

          <div className="text-lg leading-relaxed whitespace-pre-line text-gray-700">
            {notice.content}
          </div>
        </div>

        {/* 이전/다음 공지사항 네비게이션 */}
        <div className="mt-12 flex justify-between">
          {noticeId > 1 && (
            <Link
              href={`/notices/${noticeId - 1}`}
              className="text-nature-spring flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              이전 공지사항
            </Link>
          )}
          {noticeId < NOTICES.length && (
            <Link
              href={`/notices/${noticeId + 1}`}
              className="text-nature-spring ml-auto flex items-center gap-1 text-sm font-medium hover:underline"
            >
              다음 공지사항
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
