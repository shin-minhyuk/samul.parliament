"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { getFaqs, deleteFaq } from "@/services/faqService";
import { FAQ } from "@/types";
import { FAQ_CATEGORIES } from "@/constants/const";

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const fetchedFaqs = await getFaqs();
      setFaqs(fetchedFaqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      setError("FAQ를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!window.confirm("정말로 이 FAQ를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteFaq(id);
      setFaqs(faqs.filter((faq) => faq.id !== id));
      alert("FAQ가 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("FAQ 삭제 중 오류가 발생했습니다.");
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const getCategoryName = (categoryId: string): string => {
    const category = FAQ_CATEGORIES.find((c) => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  const filteredFaqs = faqs
    .filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCategoryName(faq.category)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/admin/dashboard"
        className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
      >
        <ChevronLeft size={16} className="mr-1" /> 대시보드로 돌아가기
      </Link>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">FAQ 관리</h1>
          <p className="text-sm text-gray-600">총 {faqs.length}개의 FAQ</p>
        </div>
        <Link
          href="/admin/faqs/new"
          className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          <Plus size={16} className="mr-2" /> 새 FAQ
        </Link>
      </div>

      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="FAQ 검색 (질문, 답변, 카테고리)"
              className="w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-2 md:w-auto">
          <span className="text-sm font-medium text-gray-500">정렬:</span>
          <button
            onClick={toggleSortOrder}
            className="flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm text-nowrap hover:bg-gray-100"
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {sortOrder === "asc" ? "과거순" : "최신순"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
            <p>FAQ를 불러오는 중...</p>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      ) : filteredFaqs.length === 0 ? (
        <div className="rounded-md bg-gray-50 p-8 text-center">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
          {searchQuery && (
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSearchQuery("")}
                className="text-blue-500 hover:text-blue-700"
              >
                검색어 지우기
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/3 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  질문
                </th>
                <th className="w-1/3 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  답변
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredFaqs.map((faq) => (
                <tr key={faq.id}>
                  <td className="px-6 py-4 align-top">
                    <div className="text-sm font-medium text-gray-900">
                      {faq.question}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="line-clamp-3 text-sm text-gray-500">
                      {faq.answer}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      {getCategoryName(faq.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-top whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/faqs/edit/${faq.id}`}
                        className="rounded p-1 text-blue-500 hover:bg-blue-100"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="rounded p-1 text-red-500 hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
