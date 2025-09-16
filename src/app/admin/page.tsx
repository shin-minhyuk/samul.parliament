"use client";

import React from "react";
import AdminAuth from "./auth";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <AdminAuth />
    </div>
  );
}
