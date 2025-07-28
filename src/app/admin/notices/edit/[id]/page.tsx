"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { getNoticeById, updateNotice } from "@/services/noticeService";
import { Notice } from "@/types";

export default function EditNoticePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 폼 상태
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    important: false,
    category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotice();
  }, [id]);

  const fetchNotice = async () => {
    setLoading(true);
    try {
      const fetchedNotice = await getNoticeById(id);

      if (!fetchedNotice) {
        setError("공지사항을 찾을 수 없습니다.");
        setLoading(false);
        return;
      }

      // Notice 상태와 폼 데이터 둘 다 설정
      setNotice(fetchedNotice);
      setFormData({
        title: fetchedNotice.title,
        content: fetchedNotice.content,
        date: fetchedNotice.date,
        important: fetchedNotice.important || false,
        category: fetchedNotice.category || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notice:", error);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      // 양식 검증
      if (!formData.title) {
        throw new Error("제목을 입력해주세요.");
      }

      if (!formData.content) {
        throw new Error("내용을 입력해주세요.");
      }

      if (!formData.date) {
        throw new Error("날짜를 입력해주세요.");
      }

      await updateNotice(id, formData);
      alert("공지사항이 수정되었습니다.");
      router.push("/admin/notices");
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("공지사항 수정 중 오류가 발생했습니다.");
      }
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {formError && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
              {formError}
            </div>
          )}

          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-medium text-gray-700"
            >
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="mb-2 block font-medium text-gray-700"
            >
              날짜 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block font-medium text-gray-700"
            >
              카테고리
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">선택하세요</option>
              <option value="event">행사</option>
              <option value="announcement">공지</option>
              <option value="recruitment">모집</option>
              <option value="news">소식</option>
            </select>
          </div>

          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="important"
                name="important"
                checked={formData.important}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="important"
                className="ml-2 block text-sm text-gray-700"
              >
                중요 공지사항으로 표시
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="content"
              className="mb-2 block font-medium text-gray-700"
            >
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push("/admin/notices")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-blue-300"
            >
              {isSubmitting ? "저장 중..." : "수정하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
