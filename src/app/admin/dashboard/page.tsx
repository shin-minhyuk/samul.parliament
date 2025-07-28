"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  HelpCircle,
  Archive,
  Settings,
  TrendingUp,
} from "lucide-react";
import { getNotices } from "@/services/noticeService";
import { getScheduleEvents } from "@/services/scheduleService";
import { getFaqs } from "@/services/faqService";
import { getArchiveItems } from "@/services/archiveService";

interface DashboardStats {
  notices: number;
  schedules: number;
  faqs: number;
  archives: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    notices: 0,
    schedules: 0,
    faqs: 0,
    archives: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // 각 서비스에서 데이터 개수 가져오기
      const [noticesData, schedulesData, faqsData, archivesData] =
        await Promise.all([
          getNotices(1, 1), // 첫 페이지 1개만 가져와서 total 확인
          getScheduleEvents(1, 1),
          getFaqs(),
          getArchiveItems(1, 1),
        ]);

      setStats({
        notices: noticesData.total,
        schedules: schedulesData.total,
        faqs: faqsData.length,
        archives: archivesData.total,
      });
    } catch (error) {
      console.error("Dashboard stats loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  const adminSections = [
    {
      title: "공지사항 관리",
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      description: "공지사항을 추가, 수정, 삭제합니다.",
      link: "/admin/notices",
      color: "bg-blue-50 border-blue-200",
      count: stats.notices,
    },
    {
      title: "일정 관리",
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      description: "행사 및 일정을 추가, 수정, 삭제합니다.",
      link: "/admin/schedule",
      color: "bg-green-50 border-green-200",
      count: stats.schedules,
    },
    {
      title: "FAQ 관리",
      icon: <HelpCircle className="h-8 w-8 text-purple-500" />,
      description: "자주 묻는 질문을 추가, 수정, 삭제합니다.",
      link: "/admin/faqs",
      color: "bg-purple-50 border-purple-200",
      count: stats.faqs,
    },
    {
      title: "아카이브 관리",
      icon: <Archive className="h-8 w-8 text-orange-500" />,
      description: "아카이브 항목을 추가, 수정, 삭제합니다.",
      link: "/admin/archives",
      color: "bg-orange-50 border-orange-200",
      count: stats.archives,
    },
  ];

  const totalItems =
    stats.notices + stats.schedules + stats.faqs + stats.archives;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">관리자 대시보드</h1>
        <p className="text-gray-600">사물의 의회 콘텐츠 관리</p>
      </div>

      {/* 통계 요약 */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  총 콘텐츠
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {loading ? "..." : totalItems.toLocaleString()}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  공지사항
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {loading ? "..." : stats.notices.toLocaleString()}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  일정
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {loading ? "..." : stats.schedules.toLocaleString()}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Archive className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  아카이브
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {loading ? "..." : stats.archives.toLocaleString()}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* 관리 메뉴 */}
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-semibold">콘텐츠 관리</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminSections.map((section, index) => (
            <Link
              href={section.link}
              key={index}
              className={`flex flex-col rounded-lg border p-6 transition-all duration-300 hover:shadow-md ${section.color}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>{section.icon}</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-700">
                    {loading ? "..." : section.count.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">개 항목</div>
                </div>
              </div>
              <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
              <p className="text-gray-600">{section.description}</p>
            </Link>
          ))}

          {/* 설정 카드 (별도) */}
          <Link
            href="/admin/settings"
            className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <Settings className="h-8 w-8 text-gray-500" />
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-700">
                  <Settings className="h-6 w-6" />
                </div>
                <div className="text-xs text-gray-500">설정</div>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-semibold">설정</h2>
            <p className="text-gray-600">
              관리자 계정 및 기타 설정을 관리합니다.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
