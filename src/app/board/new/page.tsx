"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createPost } from "@/services/boardService";
import { Button } from "@/components/Button";
import { ArrowLeft, Upload, X, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 로그인하지 않은 사용자는 접근 불가
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="py-16 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-600">
            로그인이 필요합니다
          </h2>
          <p className="mb-6 text-gray-500">
            게시글을 작성하려면 로그인해주세요.
          </p>
          <Link href="/board">
            <Button>게시판으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("이미지 크기는 5MB 이하만 업로드 가능합니다.");
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith("image/")) {
        setError("이미지 파일만 업로드 가능합니다.");
        return;
      }

      setImage(file);
      setError(null);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createPost({
        title: title.trim(),
        content: content.trim(),
        image: image || undefined,
      });

      router.push("/board");
    } catch (err) {
      console.error("Error creating post:", err);
      setError(
        err instanceof Error ? err.message : "게시글 작성에 실패했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8 flex items-center gap-4">
        <Link href="/board">
          <Button className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200">
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">새 게시글 작성</h1>
      </div>

      {/* 작성 폼 */}
      <form onSubmit={handleSubmit} className="max-w-4xl">
        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* 제목 입력 */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            제목 *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력하세요"
            maxLength={200}
            required
          />
          <p className="mt-1 text-sm text-gray-500">{title.length}/200</p>
        </div>

        {/* 이미지 업로드 */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            이미지 (선택사항)
          </label>

          {!imagePreview ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="flex cursor-pointer flex-col items-center text-gray-500 hover:text-gray-700"
              >
                <Upload className="mb-4 h-12 w-12" />
                <p className="text-sm font-medium">클릭하여 이미지 업로드</p>
                <p className="mt-1 text-xs">JPG, PNG, GIF (최대 5MB)</p>
              </label>
            </div>
          ) : (
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="업로드된 이미지"
                className="max-h-64 max-w-md rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* 내용 입력 */}
        <div className="mb-8">
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            내용 *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="resize-vertical w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="내용을 입력하세요"
            required
          />
          <p className="mt-1 text-sm text-gray-500">{content.length}자</p>
        </div>

        {/* 작성자 정보 */}
        <div className="mb-8 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            작성자:{" "}
            <span className="font-medium">
              {user.user_metadata?.name || user.email}
            </span>
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={loading || !title.trim() || !content.trim()}
            className="flex items-center gap-2 px-8"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                작성 중...
              </>
            ) : (
              <>
                <ImageIcon className="h-4 w-4" />
                게시글 작성
              </>
            )}
          </Button>

          <Link href="/board">
            <Button
              type="button"
              className="bg-gray-100 px-8 text-gray-700 hover:bg-gray-200"
            >
              취소
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
