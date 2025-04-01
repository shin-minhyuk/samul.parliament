"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { EVENT_TYPES, formatEventDate, formatEventTime } from "@/data";
import { getScheduleEvents } from "@/services/scheduleService";
import { ScheduleEvent } from "@/types";

export default function SchedulePage() {
  // 상태 관리
  const [activeType, setActiveType] = useState<string>("all");
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 데이터 로드
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { events: fetchedEvents } = await getScheduleEvents(50); // 한 번에 최대 50개 일정 불러오기
        setEvents(fetchedEvents);
        setLoading(false);
      } catch (err) {
        console.error("일정을 불러오는 중 오류가 발생했습니다:", err);
        setError("일정을 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 이벤트 타입 필터링
  const filteredEvents = events.filter(
    (event) => activeType === "all" || event.type === activeType,
  );

  // 날짜별로 이벤트 그룹화
  const groupedEvents = filteredEvents.reduce<Record<string, ScheduleEvent[]>>(
    (groups, event) => {
      const date = event.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    },
    {},
  );

  // 날짜 정렬
  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  // 로딩 상태 화면
  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-16 md:py-24">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
          <p>일정을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 화면
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-nature-forest mb-4 text-4xl font-bold md:text-5xl">
              행사 일정
            </h1>
          </div>
          <div className="rounded-lg bg-red-50 p-8 text-red-700">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-nature-forest mb-4 text-4xl font-bold md:text-5xl">
            행사 일정
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            사물의 의회 관련 모든 일정을 확인하세요.
          </p>
        </div>

        {/* 이벤트 타입 필터 */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveType("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeType === "all"
                ? "bg-nature-spring text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            전체 일정
          </button>
          {EVENT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeType === type.id
                  ? "bg-nature-spring text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* 일정 목록 */}
        <div className="space-y-12">
          {events.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-lg text-gray-500">등록된 일정이 없습니다.</p>
            </div>
          ) : sortedDates.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-lg text-gray-500">해당하는 일정이 없습니다.</p>
              <p className="mt-2 text-sm text-gray-400">
                다른 이벤트 유형을 선택해 보세요.
              </p>
            </div>
          ) : (
            sortedDates.map((date) => (
              <div key={date} className="relative">
                {/* 날짜 헤더 */}
                <div className="mb-4 flex items-center">
                  <div className="bg-nature-spring mr-4 flex h-12 w-12 items-center justify-center rounded-full text-white">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold">{formatEventDate(date)}</h2>
                </div>

                {/* 타임라인 */}
                <div className="ml-6 border-l-2 border-dashed border-gray-200 pl-8">
                  {groupedEvents[date].map((event) => (
                    <div
                      key={event.id}
                      className={`mb-8 rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                        event.important ? "border-nature-spring border-l-4" : ""
                      }`}
                    >
                      <h3 className="text-nature-forest mb-3 text-xl font-bold">
                        {event.title}
                      </h3>

                      <div className="mb-4 space-y-2 text-sm text-gray-600">
                        {/* 시간 */}
                        {event.time && (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{formatEventTime(event.time)}</span>
                          </div>
                        )}

                        {/* 장소 */}
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{event.location}</span>
                        </div>

                        {/* 이벤트 유형 */}
                        <div className="flex items-center">
                          <Tag className="mr-2 h-4 w-4" />
                          <span>
                            {EVENT_TYPES.find((t) => t.id === event.type)?.name}
                          </span>
                        </div>
                      </div>

                      {/* 설명 */}
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
