"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2, X } from "lucide-react";
import {
  getArchiveItemById,
  updateArchiveItem,
  uploadArchiveImage,
} from "@/services/archiveService";
import { ArchiveItem, ArchiveCategory, ArchiveType } from "@/types";

export default function EditArchivePage() {
  const router = useRouter();
  const params = useParams();
  const archiveId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 폼 데이터 상태
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ArchiveCategory>("event");
  const [type, setType] = useState<ArchiveType>("image");
  const [url, setUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // 아카이브 항목 불러오기
  useEffect(() => {
    const fetchArchiveItem = async () => {
      try {
        setLoading(true);
        const archiveItem = await getArchiveItemById(archiveId);

        if (!archiveItem) {
          notFound();
          return;
        }

        // 불러온 데이터로 폼 상태 설정
        setTitle(archiveItem.title);
        setDate(archiveItem.date);
        setDescription(archiveItem.description);
        setCategory(archiveItem.category || "event");
        setType(archiveItem.type);
        setUrl(archiveItem.url);
        if (archiveItem.thumbnailUrl) {
          setThumbnailUrl(archiveItem.thumbnailUrl);
        }
        if (archiveItem.tags) {
          setTags(archiveItem.tags);
        }

        // 이미지 타입인 경우 프리뷰 설정
        if (archiveItem.type === "image") {
          setPreviewUrl(archiveItem.url);
        }
      } catch (err) {
        console.error("아카이브 항목을 불러오는 중 오류가 발생했습니다:", err);
        setError("아카이브 항목을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchArchiveItem();
  }, [archiveId]);

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }

      setSelectedFile(file);

      // 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 태그 추가 핸들러
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // 태그 삭제 핸들러
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // 필수 필드 검증
      if (!title.trim() || !date || !description.trim()) {
        throw new Error("제목, 날짜, 설명은 필수 항목입니다.");
      }

      if (type === "image" && !selectedFile && !url) {
        throw new Error("이미지 타입은 파일 업로드 또는 URL이 필요합니다.");
      }

      if (type === "video" && !url) {
        throw new Error("영상 타입은 영상 URL이 필요합니다.");
      }

      // 이미지 업로드 (이미지 타입이고 파일을 선택한 경우)
      let imageUrl = url;
      if (type === "image" && selectedFile) {
        // 프로그레스 시뮬레이션
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) clearInterval(progressInterval);
            return Math.min(prev + 10, 90);
          });
        }, 300);

        const uploadResult = await uploadArchiveImage(selectedFile);
        clearInterval(progressInterval);
        setUploadProgress(100);

        imageUrl = uploadResult.url;
      }

      // 아카이브 항목 수정
      const updatedArchiveItem: Partial<Omit<ArchiveItem, "id">> = {
        title,
        date,
        description,
        category,
        type,
        url: imageUrl || url,
        ...(type === "video" && thumbnailUrl ? { thumbnailUrl } : {}),
        ...(tags.length > 0 ? { tags } : {}),
      };

      await updateArchiveItem(archiveId, updatedArchiveItem);

      alert("아카이브 항목이 성공적으로 수정되었습니다.");
      router.push("/admin/archives");
    } catch (error) {
      console.error("Error updating archive item:", error);
      setError(
        error instanceof Error
          ? error.message
          : "아카이브 항목 수정 중 오류가 발생했습니다.",
      );
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 py-12">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" />
          <p>아카이브 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/archives"
          className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <ChevronLeft size={16} className="mr-1" /> 아카이브 목록으로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold">아카이브 항목 수정</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* 제목 */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block font-medium">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          {/* 날짜 */}
          <div className="mb-4">
            <label htmlFor="date" className="mb-2 block font-medium">
              날짜 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          {/* 설명 */}
          <div className="mb-4">
            <label htmlFor="description" className="mb-2 block font-medium">
              설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          {/* 카테고리 */}
          <div className="mb-4">
            <label htmlFor="category" className="mb-2 block font-medium">
              카테고리
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ArchiveCategory)}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="event">행사</option>
              <option value="research">연구</option>
              <option value="media">미디어</option>
              <option value="other">기타</option>
            </select>
          </div>

          {/* 콘텐츠 타입 */}
          <div className="mb-4">
            <label className="mb-2 block font-medium">
              콘텐츠 타입 <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="image"
                  checked={type === "image"}
                  onChange={() => setType("image")}
                  className="mr-2"
                />
                사진
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="video"
                  checked={type === "video"}
                  onChange={() => setType("video")}
                  className="mr-2"
                />
                영상
              </label>
            </div>
          </div>

          {/* 타입에 따른 추가 필드 */}
          {type === "image" ? (
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 font-medium">이미지 업로드</h3>

              {/* 이미지 파일 업로드 */}
              <div className="mb-4">
                <label
                  htmlFor="file"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  파일 선택 (최대 5MB)
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-1 text-xs text-gray-500">
                  새 이미지를 업로드하지 않으면 기존 이미지가 유지됩니다.
                </p>
              </div>

              {/* 업로드 진행 상태 */}
              {uploadProgress > 0 && (
                <div className="mb-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-center text-xs text-gray-500">
                    {uploadProgress}% 업로드 완료
                  </p>
                </div>
              )}

              {/* 이미지 미리보기 */}
              {previewUrl && (
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    미리보기
                  </label>
                  <div className="relative mt-1 h-48 overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={previewUrl}
                      alt="미리보기"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* 이미지 URL 직접 입력 */}
              <div>
                <label
                  htmlFor="image-url"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  또는 이미지 URL 직접 입력
                </label>
                <input
                  type="text"
                  id="image-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://"
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 font-medium">영상 정보</h3>

              {/* 영상 URL */}
              <div className="mb-4">
                <label
                  htmlFor="video-url"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  영상 URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="video-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/... 또는 https://vimeo.com/..."
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                  required={type === "video"}
                />
                <p className="mt-1 text-xs text-gray-500">
                  YouTube, Vimeo 등 영상 플랫폼의 URL을 입력하세요.
                </p>
              </div>

              {/* 썸네일 URL */}
              <div>
                <label
                  htmlFor="thumbnail-url"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  썸네일 이미지 URL (선택)
                </label>
                <input
                  type="text"
                  id="thumbnail-url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://"
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  비디오 썸네일로 사용할 이미지 URL을 입력하세요.
                </p>
              </div>
            </div>
          )}

          {/* 태그 */}
          <div className="mb-6">
            <label htmlFor="tags" className="mb-2 block font-medium">
              태그
            </label>
            <div className="flex">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
                placeholder="태그 입력 후 Enter 또는 추가 버튼 클릭"
                className="flex-1 rounded-l-md border border-gray-300 p-2"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="rounded-r-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                추가
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="mt-6 flex justify-end space-x-2">
            <Link
              href="/admin/archives"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className={`flex items-center rounded-md bg-blue-500 px-4 py-2 text-white ${
                submitting
                  ? "cursor-not-allowed opacity-70"
                  : "hover:bg-blue-600"
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                "변경사항 저장"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
