"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Save,
  Loader2,
} from "lucide-react";
import { EVENT_TYPES } from "@/data";
import {
  getScheduleEventById,
  updateScheduleEvent,
} from "@/services/scheduleService";
import { ScheduleEvent } from "@/types";

export default function EditScheduleEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 폼 상태 관리
  const [formData, setFormData] = useState<
    Omit<ScheduleEvent, "id" | "createdAt" | "updatedAt">
  >({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    location: "",
    description: "",
    type: "other",
    important: false,
  });

  // 데이터 로드
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const event = await getScheduleEventById(eventId);

        if (!event) {
          notFound();
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, createdAt, updatedAt, ...eventData } = event;
        setFormData(eventData);
        setLoading(false);
      } catch (err) {
        console.error("일정을 불러오는 중 오류가 발생했습니다:", err);
        setError("일정을 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

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
      setSubmitting(true);
      setError(null);

      await updateScheduleEvent(eventId, formData);
      router.push("/admin/schedule");
    } catch (err) {
      console.error("일정 수정 중 오류가 발생했습니다:", err);
      setError("일정을 저장하는 중 오류가 발생했습니다.");
      setSubmitting(false);
    }
  };

  // 로딩 화면
  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 py-12">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" />
          <p>일정 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/schedule"
          className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <ChevronLeft size={16} className="mr-1" /> 일정 관리로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold">일정 수정</h1>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* 제목 */}
          <div className="mb-4">
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
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          {/* 날짜 및 시간 */}
          <div className="mb-4 grid gap-4 md:grid-cols-2">
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
                className="w-full rounded-md border border-gray-300 p-2"
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
                value={formData.time || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
          </div>

          {/* 장소 */}
          <div className="mb-4">
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
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          {/* 일정 유형 */}
          <div className="mb-4">
            <label
              htmlFor="type"
              className="mb-2 flex items-center font-medium"
            >
              <Tag className="mr-2 h-4 w-4" />
              일정 유형
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              {EVENT_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* 설명 */}
          <div className="mb-4">
            <label htmlFor="description" className="mb-2 block font-medium">
              설명
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="일정에 대한 상세 설명을 입력하세요"
              className="h-32 w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* 중요 여부 */}
          <div className="mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="important"
                checked={formData.important}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">중요 일정으로 표시</span>
            </label>
          </div>

          {/* 버튼 */}
          <div className="mt-6 flex justify-end space-x-2">
            <Link
              href="/admin/schedule"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className={`flex items-center rounded-md bg-blue-500 px-4 py-2 text-white ${
                submitting
                  ? "cursor-not-allowed opacity-70"
                  : "hover:bg-blue-600"
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  변경사항 저장
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
