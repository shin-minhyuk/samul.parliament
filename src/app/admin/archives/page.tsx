"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Search, Plus, ExternalLink } from "lucide-react";
import { getArchiveItems, deleteArchiveItem } from "@/services/archiveService";
import { ArchiveItem, ArchiveCategory, ArchiveType } from "@/types";

export default function AdminArchivesPage() {
  const [archives, setArchives] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ArchiveCategory | "all"
  >("all");
  const [selectedType, setSelectedType] = useState<ArchiveType | "all">("all");

  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    try {
      setLoading(true);
      // Firebase 연동
      const result = await getArchiveItems(100);
      setArchives(result.archives);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching archives:", error);
      setError("아카이브 항목을 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleDeleteArchive = async (id: string, type: string, url: string) => {
    if (!window.confirm("정말로 이 아카이브 항목을 삭제하시겠습니까?")) {
      return;
    }

    try {
      // 이미지 파일 이름 추출 (image 타입인 경우만)
      let imageFileName: string | undefined = undefined;
      if (type === "image" && url) {
        const urlParts = url.split("/");
        imageFileName = urlParts[urlParts.length - 1];
      }

      await deleteArchiveItem(id, imageFileName, type === "image");
      setArchives(archives.filter((archive) => archive.id !== id));
      alert("아카이브 항목이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting archive:", error);
      alert("아카이브 항목 삭제 중 오류가 발생했습니다.");
    }
  };

  // 카테고리 필터링
  const handleCategoryChange = (category: ArchiveCategory | "all") => {
    setSelectedCategory(category);
  };

  // 타입 필터링
  const handleTypeChange = (type: ArchiveType | "all") => {
    setSelectedType(type);
  };

  // 검색 및 필터링된 아카이브 목록
  const filteredArchives = archives.filter((archive) => {
    const matchesSearch =
      archive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      archive.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (archive.tags &&
        archive.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ));

    const matchesCategory =
      selectedCategory === "all" || archive.category === selectedCategory;
    const matchesType = selectedType === "all" || archive.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/dashboard"
          className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <ChevronLeft size={16} className="mr-1" /> 대시보드로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold">아카이브 관리</h1>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex w-full flex-wrap items-center gap-4 md:w-auto">
          <Link
            href="/admin/archives/new"
            className="inline-flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            <Plus size={16} className="mr-2" /> 새 아카이브 항목
          </Link>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) =>
                handleCategoryChange(e.target.value as ArchiveCategory | "all")
              }
              className="rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="all">모든 카테고리</option>
              <option value="event">행사</option>
              <option value="research">연구</option>
              <option value="media">미디어</option>
              <option value="other">기타</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) =>
                handleTypeChange(e.target.value as ArchiveType | "all")
              }
              className="rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="all">모든 타입</option>
              <option value="image">사진</option>
              <option value="video">영상</option>
            </select>
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="아카이브 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 pr-4 pl-10"
          />
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <p>로딩 중...</p>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      ) : filteredArchives.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">썸네일</th>
                <th className="px-4 py-2 text-left">제목</th>
                <th className="px-4 py-2 text-left">날짜</th>
                <th className="px-4 py-2 text-left">카테고리</th>
                <th className="px-4 py-2 text-left">타입</th>
                <th className="px-4 py-2 text-left">작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredArchives.map((archive) => (
                <tr key={archive.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{archive.id}</td>
                  <td className="px-4 py-2">
                    {archive.type === "image" ? (
                      <div className="relative h-12 w-12 overflow-hidden rounded">
                        <Image
                          src={archive.url}
                          alt={archive.title}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded bg-gray-200">
                        {archive.thumbnailUrl ? (
                          <Image
                            src={archive.thumbnailUrl}
                            alt={archive.title}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        ) : (
                          <ExternalLink size={24} className="text-gray-400" />
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="font-medium">{archive.title}</div>
                    <div className="mt-1 line-clamp-1 text-xs text-gray-500">
                      {archive.description}
                    </div>
                  </td>
                  <td className="px-4 py-2">{archive.date}</td>
                  <td className="px-4 py-2">
                    {archive.category === "event" && "행사"}
                    {archive.category === "research" && "연구"}
                    {archive.category === "media" && "미디어"}
                    {archive.category === "other" && "기타"}
                  </td>
                  <td className="px-4 py-2">
                    {archive.type === "image" ? "사진" : "영상"}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/archives/${archive.id}`}
                        className="rounded bg-blue-100 px-2 py-1 text-blue-600 hover:bg-blue-200"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() =>
                          handleDeleteArchive(
                            archive.id,
                            archive.type,
                            archive.url,
                          )
                        }
                        className="rounded bg-red-100 px-2 py-1 text-red-600 hover:bg-red-200"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-500">아카이브 항목이 없습니다.</p>
          <Link
            href="/admin/archives/new"
            className="mt-4 inline-block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            첫 아카이브 항목 추가하기
          </Link>
        </div>
      )}
    </div>
  );
}
