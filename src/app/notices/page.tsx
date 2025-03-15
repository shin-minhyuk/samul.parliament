"use client";

import React, { useState } from "react";
import { Megaphone, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NOTICES, formatDate } from "@/data";

export default function NoticesPage() {
  // 표시할 공지사항 개수 상태
  const [visibleCount, setVisibleCount] = useState(3);
  const noticesPerLoad = 3; // 한 번에 로드할 공지사항 수

  // 현재 표시할 공지사항 계산
  const currentNotices = NOTICES.slice(0, visibleCount);

  // 더 보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + noticesPerLoad, NOTICES.length));
  };

  // 더 보여줄 공지사항이 있는지 확인
  const hasMoreNotices = visibleCount < NOTICES.length;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-nature-forest mb-4 text-4xl font-bold md:text-5xl">
            공지사항
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            사물의 의회 관련 소식과 안내사항을 확인하세요.
          </p>
        </div>

        {/* 공지사항 목록 */}
        <div className="mb-8 space-y-6">
          {currentNotices.map((notice) => (
            <div
              key={notice.id}
              className={`rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg ${
                notice.isImportant ? "border-nature-spring border-l-4" : ""
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {notice.isImportant && (
                    <div className="bg-nature-spring rounded-full p-1.5 text-white">
                      <Megaphone className="h-4 w-4" />
                    </div>
                  )}
                  <h2 className="text-nature-forest text-xl font-bold">
                    {notice.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm whitespace-nowrap text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(notice.date)}</span>
                </div>
              </div>
              <div className="whitespace-pre-line text-gray-700">
                {notice.content}
              </div>

              {/* 필요한 경우 상세 페이지 링크 추가 */}
              <div className="mt-4 flex justify-end">
                <Link
                  href={`/notices/${notice.id}`}
                  className="text-nature-spring flex items-center gap-1 text-sm font-medium hover:underline"
                >
                  자세히 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 더 보기 버튼 */}
        {hasMoreNotices && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="bg-nature-spring hover:bg-nature-forest flex items-center gap-2 rounded-full px-6 py-2 font-medium text-white transition-all"
            >
              더 보기 ({visibleCount}/{NOTICES.length})
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* 모든 공지사항이 로드되었을 때 메시지 표시 */}
        {!hasMoreNotices && visibleCount > 3 && (
          <div className="mt-8 text-center text-gray-500">
            모든 공지사항을 확인하셨습니다.
          </div>
        )}
      </div>
    </div>
  );
}
