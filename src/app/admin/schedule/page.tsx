"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  Search,
} from "lucide-react";
import {
  getScheduleEvents,
  deleteScheduleEvent,
} from "@/services/scheduleService";
import { ScheduleEvent } from "@/types";
import { EVENT_TYPES } from "@/data/schedule";

type ScheduleCategory = "event" | "research" | "media" | "other";

export default function AdminSchedulePage() {
  const [schedules, setSchedules] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [typeFilter, setTypeFilter] = useState<ScheduleCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 일정 데이터 불러오기
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const { events } = await getScheduleEvents(50); // 한번에 최대 50개 가져오기
        setSchedules(events);
      } catch (err) {
        console.error("일정을 불러오는 중 오류가 발생했습니다:", err);
        setError("일정을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  // 일정 삭제 처리
  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 이 일정을 삭제하시겠습니까?")) {
      try {
        setIsDeleting(id);
        await deleteScheduleEvent(id);
        setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
      } catch (err) {
        console.error("일정 삭제 중 오류가 발생했습니다:", err);
        alert("일정 삭제 중 오류가 발생했습니다.");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  // 정렬 처리
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // 필터링된 및 정렬된 일정 목록
  const filteredSchedules = schedules
    .filter((schedule) => {
      // 검색어 필터링
      const matchesSearch =
        searchQuery === "" ||
        schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (schedule.description &&
          schedule.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        schedule.location.toLowerCase().includes(searchQuery.toLowerCase());

      // 유형 필터링
      const matchesType = typeFilter === "all" || schedule.type === typeFilter;

      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // 이벤트 타입에 따른 색상 및 이름 찾기
  const getEventTypeData = (type: string) => {
    const eventType = EVENT_TYPES.find((t) => t.id === type);
    return eventType || { id: type, name: type, color: "bg-gray-500" };
  };

  // 날짜 형식화 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 검색 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/admin/dashboard"
        className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
      >
        <ChevronLeft size={16} className="mr-1" /> 대시보드로 돌아가기
      </Link>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">일정 관리</h1>
        <Link
          href="/admin/schedule/new"
          className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" />새 일정 추가
        </Link>
      </div>

      {/* 검색 및 필터 - 아카이브 스타일로 수정 */}
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="일정 검색 (제목, 설명, 장소)"
              className="w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:w-auto">
          <span className="text-sm font-medium text-gray-500">카테고리:</span>
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as ScheduleCategory | "all")
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="all">전체</option>
            {EVENT_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2 md:w-auto">
          <span className="text-sm font-medium text-gray-500">정렬:</span>
          <button
            onClick={toggleSortOrder}
            className="flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm text-nowrap hover:bg-gray-100"
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {sortOrder === "desc" ? "최신순" : "과거순"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredSchedules.length === 0 ? (
        <div className="rounded-md bg-gray-50 p-8 text-center">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-blue-500 hover:text-blue-700"
              >
                검색어 지우기
              </button>
            )}
            {typeFilter !== "all" && (
              <button
                onClick={() => setTypeFilter("all")}
                className="text-blue-500 hover:text-blue-700"
              >
                유형 필터 지우기
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  일정
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  날짜 및 시간
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  장소
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  유형
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredSchedules.map((schedule) => {
                const eventType = getEventTypeData(schedule.type);
                return (
                  <tr key={schedule.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        {schedule.important && (
                          <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                            !
                          </span>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {schedule.title}
                          </div>
                          {schedule.description && (
                            <div className="mt-1 max-w-md truncate text-sm text-gray-500">
                              {schedule.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      <div>{formatDate(schedule.date)}</div>
                      {schedule.time && (
                        <div className="text-xs text-gray-400">
                          {schedule.time}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {schedule.location}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${eventType.color} text-white`}
                      >
                        {eventType.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/schedule/edit/${schedule.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(schedule.id)}
                          disabled={isDeleting === schedule.id}
                          className={`text-red-600 hover:text-red-900 ${
                            isDeleting === schedule.id
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
