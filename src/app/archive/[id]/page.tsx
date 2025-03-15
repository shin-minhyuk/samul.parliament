"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { ARCHIVE_ITEMS, ARCHIVE_TYPES, formatArchiveDate } from "@/data";

export default function ArchiveDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  // 아카이브 항목 찾기
  const archiveItem = ARCHIVE_ITEMS.find((item) => item.id === id);

  // 항목이 없으면 404
  if (!archiveItem) {
    notFound();
  }

  // 이전/다음 항목 찾기
  const currentIndex = ARCHIVE_ITEMS.findIndex((item) => item.id === id);
  const prevItem = currentIndex > 0 ? ARCHIVE_ITEMS[currentIndex - 1] : null;
  const nextItem =
    currentIndex < ARCHIVE_ITEMS.length - 1
      ? ARCHIVE_ITEMS[currentIndex + 1]
      : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 뒤로가기 링크 */}
      <Link
        href="/archive"
        className="mb-6 inline-flex items-center text-blue-500 hover:text-blue-700"
      >
        <ArrowLeft size={16} className="mr-1" /> 아카이브 목록으로 돌아가기
      </Link>

      {/* 아카이브 항목 상세 */}
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        {/* 헤더 정보 */}
        <div className="border-b p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              {ARCHIVE_TYPES.find((t) => t.id === archiveItem.type)?.name}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-1" />
              {formatArchiveDate(archiveItem.date)}
            </div>
          </div>
          <h1 className="mb-4 text-2xl font-bold">{archiveItem.title}</h1>
          <p className="text-gray-600">{archiveItem.description}</p>

          {/* 태그 */}
          {archiveItem.tags && archiveItem.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="flex items-center text-sm text-gray-500">
                <Tag size={16} className="mr-1" /> 태그:
              </span>
              {archiveItem.tags.map((tag) => (
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

        {/* 미디어 콘텐츠 */}
        <div className="p-6">
          {archiveItem.type === "image" && (
            <div className="relative w-full" style={{ height: "500px" }}>
              <Image
                src={archiveItem.url}
                alt={archiveItem.title}
                fill
                className="object-contain"
              />
            </div>
          )}

          {archiveItem.type === "video" && (
            <div className="aspect-video w-full">
              <iframe
                src={archiveItem.url}
                title={archiveItem.title}
                className="h-full w-full"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* 이전/다음 아카이브 항목 네비게이션 */}
      <div className="mt-8 flex justify-between">
        <div>
          {prevItem && (
            <Link
              href={`/archive/${prevItem.id}`}
              className="inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            >
              <ArrowLeft size={16} className="mr-2" /> 이전: {prevItem.title}
            </Link>
          )}
        </div>
        <div>
          {nextItem && (
            <Link
              href={`/archive/${nextItem.id}`}
              className="inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            >
              다음: {nextItem.title}{" "}
              <ArrowLeft size={16} className="ml-2 rotate-180 transform" />
            </Link>
          )}
        </div>
      </div>

      {/* 관련 아카이브 항목 */}
      {archiveItem.tags && archiveItem.tags.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-bold">관련 아카이브</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ARCHIVE_ITEMS.filter(
              (item) =>
                item.id !== archiveItem.id &&
                item.tags?.some((tag) => archiveItem.tags?.includes(tag)),
            )
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/archive/${item.id}`}
                  className="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative h-32 bg-gray-100">
                    {item.type === "image" && (
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    {item.type === "video" && item.thumbnailUrl && (
                      <Image
                        src={item.thumbnailUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="bg-opacity-50 absolute top-2 right-2 rounded bg-black px-2 py-1 text-xs text-white">
                      {ARCHIVE_TYPES.find((t) => t.id === item.type)?.name}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-1 text-sm font-medium">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                      {formatArchiveDate(item.date)}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
