"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, Tag, FileText, Download, ExternalLink } from "lucide-react";
import { ARCHIVE_TYPES } from "@/constants/const";
import { getArchiveItemById } from "@/services/archiveService";
import { ArchiveItem } from "@/types";

// YouTube URL을 embed URL로 변환하는 함수
const convertToEmbedUrl = (url: string): string => {
  // 이미 embed URL인 경우 그대로 반환
  if (url.includes("/embed/")) {
    return url;
  }

  // YouTube URL 패턴 매칭
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/v\/)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  // YouTube URL이 아닌 경우 원본 URL 반환
  return url;
};

export default function ArchiveDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [archiveItem, setArchiveItem] = useState<ArchiveItem | null>(null);
  const [relatedItems, setRelatedItems] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArchiveItem = async () => {
      try {
        setLoading(true);
        const item = await getArchiveItemById(id);

        if (!item) {
          notFound();
          return;
        }

        setArchiveItem(item);

        // 관련 항목은 아직 구현되지 않았음
        // 실제 제품에서는 태그나 카테고리를 기반으로 관련 항목을 가져오는 기능 구현 필요
        setRelatedItems([]);

        setLoading(false);
      } catch (err) {
        console.error("아카이브 항목을 불러오는 중 오류가 발생했습니다:", err);
        setError("아카이브 항목을 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchArchiveItem();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-16">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
          <p>아카이브 항목을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/archive"
          className="mb-6 inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <ArrowLeft size={16} className="mr-1" /> 아카이브 목록으로 돌아가기
        </Link>
        <div className="rounded-lg bg-red-50 p-6 text-red-700">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // 항목이 없으면 404
  if (!archiveItem) {
    return null; // notFound()가 호출되었거나 처리 중인 경우
  }

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
                src={convertToEmbedUrl(archiveItem.url)}
                title={archiveItem.title}
                className="h-full w-full rounded-lg"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          )}

          {archiveItem.type === "text" && (
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700">
                {archiveItem.description}
              </div>
            </div>
          )}

          {archiveItem.type === "pdf" && (
            <div className="rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-8">
              <div className="text-center">
                <FileText className="mx-auto mb-4 h-20 w-20 text-red-500" />
                <h3 className="mb-2 text-xl font-semibold text-red-800">
                  PDF 문서
                </h3>
                <p className="mb-6 text-red-600">
                  이 아카이브 항목은 PDF 문서입니다. 아래 버튼을 클릭하여
                  다운로드하거나 새 창에서 보기를 할 수 있습니다.
                </p>

                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href={archiveItem.url}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-6 py-3 font-medium text-white transition-colors hover:bg-red-600"
                  >
                    <Download className="h-5 w-5" />
                    PDF 다운로드
                  </a>
                  <a
                    href={archiveItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
                  >
                    <ExternalLink className="h-5 w-5" />새 창에서 보기
                  </a>
                </div>

                <div className="mt-4 text-sm text-red-600">
                  <p>
                    파일이 다운로드되지 않는 경우, 브라우저의 팝업 차단 설정을
                    확인해주세요.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 관련 아카이브 항목 섹션 - 현재는 비활성화됨 */}
      {relatedItems.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-bold">관련 아카이브</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {relatedItems.map((item) => (
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
