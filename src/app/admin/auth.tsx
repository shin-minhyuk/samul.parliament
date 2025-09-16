"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSimpleAuth } from "@/context/SimpleAuthContext";

export default function AdminAuth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, login } = useSimpleAuth();
  const router = useRouter();

  // 이미 로그인된 경우 대시보드로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const success = login(username, password);
    if (success) {
      router.push("/admin/dashboard");
    } else {
      setError("잘못된 아이디 또는 비밀번호입니다.");
      setPassword(""); // 비밀번호 필드 초기화
    }
  };

  // 이미 로그인된 경우 로딩 화면 표시
  if (isAuthenticated) {
    return (
      <div className="mx-auto mt-10 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
          <p>대시보드로 이동 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold">관리자 로그인</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-center text-red-700">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            아이디
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="관리자 아이디"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="비밀번호"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          로그인
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-blue-500 hover:text-blue-700">
          ← 메인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
