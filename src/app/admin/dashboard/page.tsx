"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  HelpCircle,
  Archive,
  Image as ImageIcon,
  Settings,
} from "lucide-react";

export default function AdminDashboard() {
  const adminSections = [
    {
      title: "공지사항 관리",
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      description: "공지사항을 추가, 수정, 삭제합니다.",
      link: "/admin/notices",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "일정 관리",
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      description: "행사 및 일정을 추가, 수정, 삭제합니다.",
      link: "/admin/schedule",
      color: "bg-green-50 border-green-200",
    },
    {
      title: "FAQ 관리",
      icon: <HelpCircle className="h-8 w-8 text-purple-500" />,
      description: "자주 묻는 질문을 추가, 수정, 삭제합니다.",
      link: "/admin/faqs",
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "아카이브 관리",
      icon: <Archive className="h-8 w-8 text-orange-500" />,
      description: "아카이브 항목을 추가, 수정, 삭제합니다.",
      link: "/admin/archives",
      color: "bg-orange-50 border-orange-200",
    },
    {
      title: "이미지 업로드",
      icon: <ImageIcon className="h-8 w-8 text-pink-500" />,
      description: "웹사이트에 사용될 이미지를 업로드합니다.",
      link: "/admin/images",
      color: "bg-pink-50 border-pink-200",
    },
    {
      title: "설정",
      icon: <Settings className="h-8 w-8 text-gray-500" />,
      description: "관리자 계정 및 기타 설정을 관리합니다.",
      link: "/admin/settings",
      color: "bg-gray-50 border-gray-200",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">관리자 대시보드</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminSections.map((section, index) => (
          <Link
            href={section.link}
            key={index}
            className={`flex flex-col rounded-lg border p-6 transition-all duration-300 hover:shadow-md ${section.color}`}
          >
            <div className="mb-4">{section.icon}</div>
            <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
            <p className="text-gray-600">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
