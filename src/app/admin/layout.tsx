import React from "react";
import SupabaseAuthCheck from "./SupabaseAuthCheck";

export const metadata = {
  title: "관리자 대시보드 - 사물의 의회",
  description: "사물의 의회 관리자 대시보드",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SupabaseAuthCheck excludePaths={["/admin"]}>{children}</SupabaseAuthCheck>
    </div>
  );
}
