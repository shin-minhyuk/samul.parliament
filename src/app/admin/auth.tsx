"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (error) {
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold">관리자 로그인</h1>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>

        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
    >
      로그아웃
    </button>
  );
}
