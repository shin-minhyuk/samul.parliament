import React from "react";
import AdminAuthCheck from "./AuthCheck";
import { SimpleAuthProvider } from "@/context/SimpleAuthContext";

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
    <SimpleAuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminAuthCheck excludePaths={["/admin"]}>{children}</AdminAuthCheck>
      </div>
    </SimpleAuthProvider>
  );
}
