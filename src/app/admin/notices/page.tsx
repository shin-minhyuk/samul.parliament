"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ChevronLeft, Search } from "lucide-react";
// Firebase 연동 시 주석 해제
import { getNotices, deleteNotice } from "@/services/noticeService";
import { Notice } from "@/types";
import { formatDate } from "@/data";

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      // Firebase 연동 후 아래 코드로 대체
      const { notices: fetchedNotices } = await getNotices(100);
      setNotices(fetchedNotices);

      // // 임시로 정적 데이터 사용 (타입 변환)
      // const convertedNotices: Notice[] = DataNotices.map((notice) => ({
      //   id: String(notice.id),
      //   title: notice.title,
      //   content: notice.content,
      //   date: notice.date,
      //   important: notice.isImportant,
      // }));

      // setNotices(convertedNotices);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notices:", error);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!window.confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
      return;
    }

    try {
      // Firebase 연동 후 아래 코드로 대체
      await deleteNotice(id);

      // 임시로 클라이언트 상태만 업데이트
      setNotices(notices.filter((notice) => notice.id !== id));
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/dashboard"
            className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
          >
            <ChevronLeft size={16} className="mr-1" /> 대시보드로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold">공지사항 관리</h1>
        </div>
        <Link
          href="/admin/notices/new"
          className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          <Plus size={16} className="mr-2" /> 새 공지사항
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="공지사항 검색..."
            className="w-full rounded-lg border p-3 pr-4 pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-3 left-3 text-gray-400" size={20} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
            <p>공지사항을 불러오는 중...</p>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      ) : filteredNotices.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-12 text-center">
          <p className="text-lg text-gray-500">공지사항이 없습니다.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
