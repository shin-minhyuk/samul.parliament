import React from "react";

export default function Maintenance() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-24 w-24 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          사이트 점검 중
        </h1>
        <p className="mt-2 text-gray-600">
          현재 서비스 개선을 위한 점검 작업을 진행 중입니다. 빠른 시일 내에 더
          나은 서비스로 찾아뵙겠습니다.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          예상 완료 시간: 곧 서비스가 재개됩니다.
        </p>
      </div>
    </div>
  );
}
