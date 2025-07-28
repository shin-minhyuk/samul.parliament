"use client";

import React from "react";
import AdminAuth from "./auth";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">사물의 의회</h1>
        <p className="text-gray-600">관리자 페이지</p>
      </div>
      <AdminAuth />
    </div>
  );
}
