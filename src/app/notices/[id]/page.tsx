"use client";

import React, { useEffect, useState } from "react";
import { Megaphone, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { formatDate } from "@/util/date";
import { getNoticeById } from "@/services/noticeService";
import { Notice } from "@/types";

export default function NoticeDetailPage() {
  const params = useParams();
  const noticeId = params.id as string;

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setLoading(true);
        const noticeData = await getNoticeById(noticeId);

        if (!noticeData) {
          notFound();
          return;
        }

        setNotice(noticeData);
        setLoading(false);
      } catch (err) {
        console.error("공지사항을 불러오는 중 오류가 발생했습니다:", err);
        setError("공지사항을 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchNotice();
  }, [noticeId]);

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-16 md:py-24">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
          <p>공지사항을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Link
              href="/notices"
              className="text-ocean-surf flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              공지사항 목록으로 돌아가기
            </Link>
          </div>
          <div className="rounded-xl bg-red-50 p-8 text-red-700">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!notice) {
    return null; // notFound()가 호출되었거나 처리 중인 경우
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* 뒤로 가기 링크 */}
        <div className="mb-8">
          <Link
            href="/notices"
            className="text-ocean-surf flex items-center gap-1 text-sm font-medium hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            공지사항 목록으로 돌아가기
          </Link>
        </div>

        {/* 공지사항 상세 내용 */}
        <div
          className={`rounded-xl bg-white p-8 shadow-md ${
            notice.important ? "border-nature-spring border-l-4" : ""
          }`}
        >
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {notice.important && (
                <div className="bg-primary-500 rounded-full p-1.5 text-white">
                  <Megaphone className="h-5 w-5" />
                </div>
              )}
              <h1 className="text-ocean-deep text-2xl font-bold md:text-3xl">
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

        {/* 목록으로 돌아가기 버튼 */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/notices"
            className="text-ocean-surf flex items-center gap-1 text-sm font-medium hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
