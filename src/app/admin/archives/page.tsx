"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Search,
  Plus,
  ExternalLink,
  Edit,
  Trash2,
} from "lucide-react";
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
      // 이미지 파일 이름 추출 (image 타입이고 Firebase Storage URL인 경우만)
      let imageFileName: string | undefined = undefined;

      // Firebase Storage URL인지 확인 (firebasestorage.googleapis.com이 포함된 경우)
      const isFirebaseStorageUrl = url.includes(
        "firebasestorage.googleapis.com",
      );

      if (type === "image" && isFirebaseStorageUrl && url) {
        // Firebase Storage URL에서 파일명 추출
        const urlParts = url.split("/");
        const fileNameWithParams = urlParts[urlParts.length - 1];
        // 파라미터 제거
        imageFileName = fileNameWithParams.split("?")[0];
      }

      await deleteArchiveItem(id, imageFileName);
      setArchives(archives.filter((archive) => archive.id !== id));
      alert("아카이브 항목이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting archive:", error);
      // 이미지 삭제 오류가 발생해도 Firestore 문서는 삭제 성공할 수 있으므로 UI는 업데이트
      setArchives(archives.filter((archive) => archive.id !== id));
      alert(
        "아카이브 항목은 삭제되었지만, 이미지 삭제 중 오류가 발생했습니다.",
      );
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/dashboard"
            className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
          >
            <ChevronLeft size={16} className="mr-1" /> 대시보드로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold">아카이브 관리</h1>
        </div>
        <Link
          href="/admin/archives/new"
          className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          <Plus size={16} className="mr-2" /> 새 아카이브 항목
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="아카이브 검색..."
            className="w-full rounded-lg border p-3 pr-4 pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-3 left-3 text-gray-400" size={20} />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
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

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
            <p>아카이브 항목을 불러오는 중...</p>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      ) : filteredArchives.length > 0 ? (
        <div className="overflow-hidden rounded-lg border bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  썸네일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  날짜
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  타입
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredArchives.map((archive) => (
                <tr key={archive.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{archive.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {archive.title}
                    </div>
                    <div className="mt-1 line-clamp-1 text-xs text-gray-500">
                      {archive.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{archive.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {archive.category === "event" && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          행사
                        </span>
                      )}
                      {archive.category === "research" && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          연구
                        </span>
                      )}
                      {archive.category === "media" && (
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          미디어
                        </span>
                      )}
                      {archive.category === "other" && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                          기타
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {archive.type === "image" ? (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          사진
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800">
                          영상
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/archives/${archive.id}`}
                        className="rounded p-1 text-blue-500 hover:bg-blue-100"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() =>
                          handleDeleteArchive(
                            archive.id,
                            archive.type,
                            archive.url,
                          )
                        }
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
      ) : (
        <div className="rounded-lg bg-gray-50 p-12 text-center">
          <p className="text-lg text-gray-500">아카이브 항목이 없습니다.</p>
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
