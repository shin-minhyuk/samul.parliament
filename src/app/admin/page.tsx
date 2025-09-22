"use client";

import React from "react";
import SupabaseAuth from "./SupabaseAuth";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <SupabaseAuth />
    </div>
  );
}
