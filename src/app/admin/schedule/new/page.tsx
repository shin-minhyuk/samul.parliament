"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Save,
  AlertCircle,
} from "lucide-react";
import { EVENT_TYPES } from "@/data";
import { createScheduleEvent } from "@/services/scheduleService";
import { ScheduleEvent } from "@/types";

export default function AddScheduleEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 폼 상태 관리
  const [formData, setFormData] = useState<
    Omit<ScheduleEvent, "id" | "createdAt" | "updatedAt">
  >({
    title: "",
    date: new Date().toISOString().split("T")[0], // 오늘 날짜를 기본값으로
    time: "",
    location: "",
    description: "",
    type: "other",
    important: false,
  });

  // 폼 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("일정 제목을 입력하세요.");
      return;
    }

    if (!formData.date) {
      setError("일정 날짜를 입력하세요.");
      return;
    }

    if (!formData.location.trim()) {
      setError("장소를 입력하세요.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createScheduleEvent(formData);
      router.push("/admin/schedule");
    } catch (err) {
      console.error("일정 생성 중 오류가 발생했습니다:", err);
      setError("일정을 저장하는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center">
        <Link
          href="/admin/schedule"
          className="mr-4 flex items-center text-blue-500 hover:text-blue-700"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          일정 관리로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold">새 일정 추가</h1>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-red-700">
          <p className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            {error}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-lg border bg-white p-6 shadow-sm"
      >
        {/* 제목 */}
        <div className="mb-6">
          <label htmlFor="title" className="mb-2 block font-medium">
            일정 제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="일정 제목을 입력하세요"
            className="w-full rounded-md border p-2"
            required
          />
        </div>

        {/* 날짜 및 시간 */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="date"
              className="mb-2 flex items-center font-medium"
            >
              <Calendar className="mr-2 h-4 w-4" />
              날짜 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="mb-2 flex items-center font-medium"
            >
              <Clock className="mr-2 h-4 w-4" />
              시간
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
            />
          </div>
        </div>

        {/* 장소 */}
        <div className="mb-6">
          <label
            htmlFor="location"
            className="mb-2 flex items-center font-medium"
          >
            <MapPin className="mr-2 h-4 w-4" />
            장소 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="장소를 입력하세요"
            className="w-full rounded-md border p-2"
            required
          />
        </div>

        {/* 일정 유형 */}
        <div className="mb-6">
          <label htmlFor="type" className="mb-2 flex items-center font-medium">
            <Tag className="mr-2 h-4 w-4" />
            일정 유형
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-md border p-2"
          >
            {EVENT_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* 설명 */}
        <div className="mb-6">
          <label htmlFor="description" className="mb-2 block font-medium">
            설명
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="일정에 대한 자세한 설명을 입력하세요"
            className="w-full rounded-md border p-2"
            rows={4}
          />
        </div>

        {/* 중요 여부 */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="important"
              checked={formData.important}
              onChange={handleCheckboxChange}
              className="mr-2 h-4 w-4 rounded border-gray-300"
            />
            <span className="font-medium">중요 일정으로 표시</span>
          </label>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end">
          <Link
            href="/admin/schedule"
            className="mr-2 rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center rounded-md bg-blue-500 px-4 py-2 text-white ${
              loading ? "cursor-not-allowed opacity-70" : "hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                저장 중...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                저장
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
