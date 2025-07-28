"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getPost, updatePost } from "@/services/boardService";
import { Post } from "@/types/board";
import { Button } from "@/components/Button";
import { ArrowLeft, Upload, X, Save } from "lucide-react";
import Link from "next/link";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const { userProfile } = useAuth();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const postData = await getPost(postId);

        // 권한 체크
        if (userProfile?.id !== postData.author_id) {
          setError("이 게시글을 편집할 권한이 없습니다.");
          return;
        }

        setPost(postData);
        setTitle(postData.title);
        setContent(postData.content);
        if (postData.image_url) {
          setImagePreview(postData.image_url);
        }
        setError(null);
      } catch (err) {
        console.error("Error loading post:", err);
        setError("게시글을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (postId && userProfile) {
      loadPost();
    }
  }, [postId, userProfile]);

  // 로그인하지 않은 사용자는 접근 불가
  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="py-16 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-600">
            로그인이 필요합니다
          </h2>
          <p className="mb-6 text-gray-500">
            게시글을 편집하려면 로그인해주세요.
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

    setSaving(true);
    setError(null);

    try {
      await updatePost(postId, {
        title: title.trim(),
        content: content.trim(),
        image: image || undefined,
      });

      router.push(`/board/${postId}`);
    } catch (err) {
      console.error("Error updating post:", err);
      setError(
        err instanceof Error ? err.message : "게시글 수정에 실패했습니다.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="py-16 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-600">
            오류가 발생했습니다
          </h2>
          <p className="mb-6 text-gray-500">{error}</p>
          <Link href="/board">
            <Button>게시판으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8 flex items-center gap-4">
        <Link href={`/board/${postId}`}>
          <Button className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200">
            <ArrowLeft className="h-4 w-4" />
            돌아가기
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">게시글 수정</h1>
      </div>

      {/* 수정 폼 */}
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
              {image && (
                <div className="absolute bottom-2 left-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
                  새 이미지
                </div>
              )}
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
              {userProfile.name || userProfile.email}
            </span>
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={saving || !title.trim() || !content.trim()}
            className="flex items-center gap-2 px-8"
          >
            {saving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                저장 중...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                수정 완료
              </>
            )}
          </Button>

          <Link href={`/board/${postId}`}>
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
