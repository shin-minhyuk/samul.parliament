"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { FAQ } from "@/types";
import { getFaqs } from "@/services/faqService";
import { FAQ_CATEGORIES } from "@/constants/const";
import { Loader2 } from "lucide-react";

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedFaqs = await getFaqs();
        setFaqs(fetchedFaqs);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError(
          "FAQ 데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearchTerm =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.answer &&
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;

      return matchesCategory && matchesSearchTerm;
    });
  }, [faqs, activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-ocean-deep mb-4 text-4xl font-bold md:text-5xl">
            자주 묻는 질문
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            사물의 의회에 대한 궁금증을 해결해 드립니다.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:border-ocean-surf focus:ring-nature-spring block w-full rounded-lg border border-gray-300 bg-white p-4 pl-10 text-gray-900"
              placeholder="질문 검색하기..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-nature-spring text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              전체
            </button>
            {FAQ_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-nature-spring text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
              <p className="ml-2">FAQ를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-8 text-center text-red-600">
              <p className="text-lg">오류 발생</p>
              <p className="mt-2 text-sm">{error}</p>
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
              <p className="mt-2 text-sm text-gray-400">
                다른 검색어나 카테고리를 선택해 보세요.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  {expandedItems.includes(faq.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedItems.includes(faq.id) && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    {faq.answer ? (
                      <div
                        className="prose dark:prose-invert max-w-none whitespace-pre-line text-gray-700"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    ) : (
                      <p className="text-gray-500 italic">답변이 없습니다.</p>
                    )}
                    <div className="mt-4 text-right">
                      <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                        {
                          FAQ_CATEGORIES.find((c) => c.id === faq.category)
                            ?.name
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
