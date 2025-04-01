"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { SCHEDULE_EVENTS } from "@/data";
import { migrateScheduleEventsToFirebase } from "@/services/scheduleService";

export default function ScheduleMigrationPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [migratedIds, setMigratedIds] = useState<string[]>([]);

  const staticEventCount = SCHEDULE_EVENTS.length;

  const handleMigration = async () => {
    if (loading || success) return;

    try {
      setLoading(true);
      setError(null);

      // 마이그레이션 서비스 호출
      const ids = await migrateScheduleEventsToFirebase(SCHEDULE_EVENTS);
      setMigratedIds(ids);
      setSuccess(true);
    } catch (err) {
      console.error("일정 마이그레이션 중 오류가 발생했습니다:", err);
      setError(
        err instanceof Error
          ? err.message
          : "일정 데이터 마이그레이션 중 오류가 발생했습니다.",
      );
    } finally {
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
        <h1 className="text-2xl font-bold">일정 데이터 마이그레이션</h1>
      </div>

      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          정적 데이터를 Firestore로 마이그레이션
        </h2>

        <div className="mb-6">
          <p className="mb-2">
            src/data/schedule.ts에 정의된 {staticEventCount}개의 정적 일정
            항목을 Firebase Firestore 데이터베이스로 이전합니다.
          </p>
          <p className="text-sm text-gray-600">
            이 작업은 일회성 작업으로, 정적 데이터를 실시간 데이터베이스로
            옮기는 용도입니다.
            <br />
            중복 실행 시 동일한 데이터가 여러 번 등록될 수 있으니 주의하세요.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
            <p>{error}</p>
          </div>
        )}

        {success ? (
          <div className="mb-4 rounded-md bg-green-50 p-4 text-green-700">
            <div className="mb-2 flex items-center">
              <Check className="mr-2 h-5 w-5" />
              <p className="font-medium">
                마이그레이션이 성공적으로 완료되었습니다!
              </p>
            </div>
            <p>총 {migratedIds.length}개의 일정이 등록되었습니다.</p>
          </div>
        ) : (
          <button
            onClick={handleMigration}
            disabled={loading}
            className={`flex items-center rounded-md px-4 py-2 font-medium text-white ${
              loading
                ? "cursor-not-allowed bg-blue-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                마이그레이션 중...
              </>
            ) : (
              "마이그레이션 시작"
            )}
          </button>
        )}
      </div>

      {success && migratedIds.length > 0 && (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">등록된 일정 ID</h3>
          <div className="max-h-60 overflow-y-auto rounded-md bg-gray-50 p-4">
            <ul className="space-y-1">
              {migratedIds.map((id, index) => (
                <li key={id} className="font-mono text-sm">
                  {index + 1}. {id}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <Link
              href="/admin/schedule"
              className="text-blue-500 hover:text-blue-700"
            >
              일정 관리 페이지로 이동
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
