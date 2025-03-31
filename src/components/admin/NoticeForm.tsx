"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Notice } from "@/types";

export interface NoticeFormProps {
  initialData?: Partial<Notice>;
  isEditing?: boolean;
  onSubmit: (
    data: Omit<Notice, "id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
}

export default function NoticeForm({
  initialData,
  isEditing = false,
  onSubmit,
}: NoticeFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    date: initialData?.date || new Date().toISOString().split("T")[0],
    important: initialData?.important || false,
    category: initialData?.category || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

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

      await onSubmit(formData);
      router.push("/admin/notices");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("공지사항 저장 중 오류가 발생했습니다.");
      }
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          제목 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          날짜 <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          카테고리
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
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
          className="block text-sm font-medium text-gray-700"
        >
          내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={10}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
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
          {isSubmitting ? "저장 중..." : isEditing ? "수정하기" : "등록하기"}
        </button>
      </div>
    </form>
  );
}
