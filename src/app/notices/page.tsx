"use client";

import React, { useState, useEffect } from "react";
import { Megaphone, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/util/date";
import { getNotices } from "@/services/noticeService";
import { Notice } from "@/types";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export default function NoticesPage() {
  // 상태 정의
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<
    QueryDocumentSnapshot<DocumentData> | undefined
  >(undefined);
  const [allLoaded, setAllLoaded] = useState(false);
  const noticesPerLoad = 3; // 한 번에 로드할 공지사항 수

  // 처음 페이지 로드시 데이터 가져오기
  useEffect(() => {
    fetchNotices();
  }, []);

  // 공지사항 가져오기 함수
  const fetchNotices = async () => {
    try {
      setLoading(true);
      const { notices: fetchedNotices, lastVisible: lastDoc } =
        await getNotices(noticesPerLoad, lastVisible);

      if (
        fetchedNotices.length === 0 ||
        fetchedNotices.length < noticesPerLoad
      ) {
        setAllLoaded(true);
      }

      if (!lastVisible) {
        // 처음 로드
        setNotices(fetchedNotices);
      } else {
        // 추가 로드
        setNotices((prev) => [...prev, ...fetchedNotices]);
      }

      setLastVisible(lastDoc);
      setLoading(false);
    } catch (error) {
      console.error("공지사항을 불러오는 중 오류가 발생했습니다:", error);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  // 더 보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    if (!allLoaded && !loading) {
      fetchNotices();
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-ocean-deep mb-4 text-4xl font-bold md:text-5xl">
            공지사항
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            사물의 의회 관련 소식과 안내사항을 확인하세요.
          </p>
        </div>

        {/* 로딩 상태 표시 */}
        {loading && notices.length === 0 && (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
              <p>공지사항을 불러오는 중...</p>
            </div>
          </div>
        )}

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="mb-8 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* 공지사항이 없는 경우 */}
        {!loading && !error && notices.length === 0 && (
          <div className="mb-8 rounded-lg bg-gray-50 p-8 text-center">
            <p className="text-lg text-gray-500">등록된 공지사항이 없습니다.</p>
          </div>
        )}

        {/* 공지사항 목록 */}
        {notices.length > 0 && (
          <div className="mb-8 space-y-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg ${
                  notice.important ? "border-nature-spring border-l-4" : ""
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {notice.important && (
                      <div className="bg-primary-500 rounded-full p-1.5 text-white">
                        <Megaphone className="h-4 w-4" />
                      </div>
                    )}
                    <h2 className="text-ocean-deep text-xl font-bold">
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
                    className="text-ocean-surf flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                    자세히 보기
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 더 보기 버튼 */}
        {!allLoaded && notices.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className={`flex items-center gap-2 rounded-full px-6 py-2 font-medium text-white transition-all ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-nature-spring hover:bg-nature-forest"
              }`}
            >
              {loading ? "로딩 중..." : "더 보기"}
              {!loading && <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        )}

        {/* 모든 공지사항이 로드되었을 때 메시지 표시 */}
        {allLoaded && notices.length > 0 && (
          <div className="mt-8 text-center text-gray-500">
            모든 공지사항을 확인하셨습니다.
          </div>
        )}
      </div>
    </div>
  );
}
