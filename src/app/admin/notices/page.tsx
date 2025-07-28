"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ChevronLeft, Search } from "lucide-react";
import { getNotices, deleteNotice } from "@/services/noticeService";
import { Notice } from "@/types";
import { formatDate } from "@/util/date";

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const noticesPerPage = 20;

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async (page = 1) => {
    setLoading(true);
    try {
      const { notices: fetchedNotices, total } = await getNotices(
        page,
        noticesPerPage,
      );

      if (page === 1) {
        setNotices(fetchedNotices);
      } else {
        setNotices((prev) => [...prev, ...fetchedNotices]);
      }

      setTotalCount(total);
      setHasMore(fetchedNotices.length === noticesPerPage);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching notices:", error);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreNotices = () => {
    if (hasMore && !loading) {
      fetchNotices(currentPage + 1);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!window.confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteNotice(id);
      setNotices(notices.filter((notice) => notice.id !== id));
      setTotalCount((prev) => prev - 1);
      alert("공지사항이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting notice:", error);
      alert("공지사항 삭제 중 오류가 발생했습니다.");
    }
  };

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/admin/dashboard"
        className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
      >
        <ChevronLeft size={16} className="mr-1" /> 대시보드로 돌아가기
      </Link>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">공지사항 관리</h1>
          <p className="text-sm text-gray-600">총 {totalCount}개의 공지사항</p>
        </div>
        <Link
          href="/admin/notices/new"
          className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          <Plus size={16} className="mr-2" /> 새 공지사항
        </Link>
      </div>

      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="공지사항 검색 (제목, 내용)"
              className="w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {loading && currentPage === 1 ? (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
            <p>공지사항을 불러오는 중...</p>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      ) : filteredNotices.length === 0 ? (
        <div className="rounded-md bg-gray-50 p-8 text-center">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
          {searchQuery && (
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSearchQuery("")}
                className="text-blue-500 hover:text-blue-700"
              >
                검색어 지우기
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    날짜
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    중요
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredNotices.map((notice) => (
                  <tr key={notice.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {notice.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(notice.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {notice.important ? (
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                            중요
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                            일반
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/notices/edit/${notice.id}`}
                          className="rounded p-1 text-blue-500 hover:bg-blue-100"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeleteNotice(notice.id)}
                          className="rounded p-1 text-red-500 hover:bg-red-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasMore && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={loadMoreNotices}
                disabled={loading}
                className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "로딩 중..." : "더 보기"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
