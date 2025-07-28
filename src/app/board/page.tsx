"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getPosts } from "@/services/boardService";
import { Post } from "@/types/board";
import { formatDate } from "@/util/date";
import { Button } from "@/components/Button";
import { Plus, Image as ImageIcon, User, Calendar } from "lucide-react";
import Link from "next/link";

export default function BoardPage() {
  const { userProfile } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async (pageNum = 1, reset = false) => {
    try {
      setLoading(true);
      const result = await getPosts(pageNum, 10);

      if (reset) {
        setPosts(result.posts);
      } else {
        setPosts((prev) => [...prev, ...result.posts]);
      }

      setHasMore(result.hasMore);
      setPage(pageNum);
      setError(null);
    } catch (err) {
      console.error("Error loading posts:", err);
      setError("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(1, true);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadPosts(page + 1, false);
    }
  };

  const handleRefresh = () => {
    loadPosts(1, true);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">게시판</h1>
          <p className="mt-2 text-gray-600">
            사물의 의회 커뮤니티 게시판입니다.
          </p>
        </div>

        {userProfile && (
          <Link href="/board/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              글쓰기
            </Button>
          </Link>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
          <Button
            onClick={handleRefresh}
            className="mt-2 border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50"
          >
            다시 시도
          </Button>
        </div>
      )}

      {/* 게시글이 없는 경우 */}
      {posts.length === 0 && !loading && (
        <div className="py-16 text-center">
          <div className="mb-4 text-gray-400">
            <User className="mx-auto h-16 w-16" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-600">
            아직 게시글이 없습니다
          </h3>
          <p className="mb-6 text-gray-500">첫 번째 게시글을 작성해보세요!</p>
          {userProfile && (
            <Link href="/board/new">
              <Button>글쓰기</Button>
            </Link>
          )}
        </div>
      )}

      {/* 게시글 목록 */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <Link href={`/board/${post.id}`} className="block">
              <div className="mb-3 flex items-start justify-between">
                <h2 className="text-xl font-semibold text-gray-900 transition-colors hover:text-blue-600">
                  {post.title}
                </h2>
                {post.image_url && (
                  <ImageIcon className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400" />
                )}
              </div>

              <p className="mb-4 line-clamp-3 text-gray-600">
                {post.content.length > 150
                  ? `${post.content.substring(0, 150)}...`
                  : post.content}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author_name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>

                {post.updated_at !== post.created_at && (
                  <span className="text-xs text-gray-400">
                    수정됨 {formatDate(post.updated_at)}
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* 더 보기 버튼 */}
      {hasMore && (
        <div className="mt-8 text-center">
          <Button
            onClick={handleLoadMore}
            disabled={loading}
            className="border border-gray-300 bg-white px-8 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? "로딩 중..." : "더 보기"}
          </Button>
        </div>
      )}
    </div>
  );
}
