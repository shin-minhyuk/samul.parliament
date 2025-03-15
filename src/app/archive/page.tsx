"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Tag, Calendar, X, ChevronRight } from "lucide-react";
import {
  ARCHIVE_ITEMS,
  ARCHIVE_CATEGORIES,
  ARCHIVE_TYPES,
  formatArchiveDate,
} from "@/data";

export default function ArchivePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState(ARCHIVE_ITEMS);
  const [visibleCount, setVisibleCount] = useState(6);

  // 모든 태그 추출
  const allTags = Array.from(
    new Set(ARCHIVE_ITEMS.flatMap((item) => item.tags || [])),
  ).sort();

  // 필터링 로직
  useEffect(() => {
    let result = ARCHIVE_ITEMS;

    // 카테고리 필터링
    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory);
    }

    // 타입 필터링
    if (activeType !== "all") {
      result = result.filter((item) => item.type === activeType);
    }

    // 태그 필터링
    if (selectedTags.length > 0) {
      result = result.filter((item) =>
        selectedTags.every((tag) => item.tags?.includes(tag)),
      );
    }

    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // 날짜순 정렬 (최신순)
    result = [...result].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    setFilteredItems(result);
    // 필터링이 변경되면 보이는 항목 수를 초기화
    setVisibleCount(6);
  }, [activeCategory, activeType, searchQuery, selectedTags]);

  // 태그 토글 함수
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 필터 초기화 함수
  const resetFilters = () => {
    setActiveCategory("all");
    setActiveType("all");
    setSearchQuery("");
    setSelectedTags([]);
  };

  // 더보기 함수
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // 현재 보이는 아이템
  const visibleItems = filteredItems.slice(0, visibleCount);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">아카이브</h1>
        <p className="text-gray-600">
          사물의 의회 활동 기록을 사진, 영상으로 확인하세요.
        </p>
      </div>

      {/* 검색 및 필터 섹션 */}
      <div className="mb-8 space-y-4">
        {/* 검색 */}
        <div className="relative">
          <input
            type="text"
            placeholder="제목, 설명, 태그로 검색"
            className="w-full rounded-lg border p-3 pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-3 left-3 text-gray-400" size={20} />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* 필터 섹션 */}
        <div className="flex flex-wrap gap-4">
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2">
            {ARCHIVE_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-3 py-1 text-sm ${
                  activeCategory === category.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* 타입 필터 */}
          <div className="flex flex-wrap gap-2">
            {ARCHIVE_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`rounded-full px-3 py-1 text-sm ${
                  activeType === type.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* 필터 초기화 버튼 */}
          {(activeCategory !== "all" ||
            activeType !== "all" ||
            searchQuery ||
            selectedTags.length > 0) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
            >
              <X size={14} /> 필터 초기화
            </button>
          )}
        </div>

        {/* 태그 필터 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center text-sm text-gray-500">
            <Tag size={16} className="mr-1" /> 태그:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-2 py-0.5 text-xs ${
                selectedTags.includes(tag)
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 결과 카운트 */}
      <div className="mb-4 text-sm text-gray-500">
        총 {filteredItems.length}개의 항목이 있습니다.
      </div>

      {/* 아카이브 그리드 */}
      {filteredItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                {/* 아이템 미디어 */}
                <Link href={`/archive/${item.id}`} className="block">
                  <div className="relative h-48 bg-gray-100">
                    {item.type === "image" && (
                      <div className="relative h-full w-full">
                        <Image
                          src={item.url}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {item.type === "video" && (
                      <div className="relative h-full w-full">
                        {item.thumbnailUrl ? (
                          <Image
                            src={item.thumbnailUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-200">
                            <span className="text-gray-500">비디오 썸네일</span>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-opacity-50 flex h-12 w-12 items-center justify-center rounded-full bg-black">
                            <div className="ml-1 h-0 w-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="bg-opacity-50 absolute top-2 right-2 rounded bg-black px-2 py-1 text-xs text-white">
                      {ARCHIVE_TYPES.find((t) => t.id === item.type)?.name}
                    </div>
                  </div>

                  {/* 아이템 정보 */}
                  <div className="p-4">
                    <div className="mb-2 flex items-center text-xs text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {formatArchiveDate(item.date)}
                    </div>
                    <h3 className="mb-2 font-bold">{item.title}</h3>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      {item.description}
                    </p>

                    {/* 태그 */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* 더보기 버튼 */}
          {visibleCount < filteredItems.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="bg-nature-spring hover:bg-nature-forest flex items-center gap-2 rounded-full px-6 py-2 font-medium text-white transition-all"
              >
                더 보기 ({visibleCount}/{filteredItems.length})
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <div className="mb-4 text-5xl">🔍</div>
          <p className="mb-2 text-xl font-medium">검색 결과가 없습니다</p>
          <p className="text-sm">다른 검색어나 필터를 사용해보세요.</p>
        </div>
      )}
    </div>
  );
}
