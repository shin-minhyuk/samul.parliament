"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, ChevronLeft, Search, Eye, AlertTriangle } from "lucide-react";
import { getPosts, adminDeletePost } from "@/services/boardService";
import { Post } from "@/types/board";
import { formatDate } from "@/util/date";

export default function AdminBoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const postsPerPage = 20;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const { posts: fetchedPosts, total } = await getPosts(page, postsPerPage);

      if (page === 1) {
        setPosts(fetchedPosts);
      } else {
        setPosts((prev) => [...prev, ...fetchedPosts]);
      }

      setTotalCount(total);
      setHasMore(fetchedPosts.length === postsPerPage);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("게시글을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (hasMore && !loading) {
      fetchPosts(currentPage + 1);
    }
  };

  const handleDeletePost = async (id: string) => {
    const post = posts.find((p) => p.id === id);
    if (
      !window.confirm(
        `정말로 이 게시글을 삭제하시겠습니까?\n\n제목: ${post?.title}\n작성자: ${post?.author_name}\n\n⚠️ 이 작업은 되돌릴 수 없습니다.`,
      )
    ) {
      return;
    }

    try {
      await adminDeletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      setTotalCount((prev) => prev - 1);
      alert("게시글이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author_email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const truncateContent = (content: string, maxLength = 100) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/admin/dashboard"
        className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
      >
        <ChevronLeft size={16} className="mr-1" /> 대시보드로 돌아가기
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">게시판 관리</h1>
          <p className="text-sm text-gray-600">총 {totalCount}개의 게시글</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-yellow-50 px-3 py-2 text-yellow-800">
          <AlertTriangle size={16} />
          <span className="text-sm font-medium">악성 게시글 관리</span>
        </div>
      </div>

      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="게시글 검색 (제목, 내용, 작성자명, 이메일)"
              className="w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {loading && currentPage === 1 ? (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
            <p>게시글을 불러오는 중...</p>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-md bg-gray-50 p-8 text-center">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
          {searchQuery && (
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSearchQuery("")}
                className="text-blue-500 hover:text-blue-700"
              >
                검색어 지우기
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    내용 미리보기
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    작성자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    작성일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="max-w-xs truncate text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                        {post.image_url && (
                          <div className="ml-2 rounded bg-blue-100 px-2 py-1 text-xs text-gray-500">
                            이미지
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs text-sm text-gray-600">
                        {truncateContent(post.content)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{post.author_name}</div>
                        <div className="text-xs text-gray-500">
                          {post.author_email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(post.created_at)}
                        {post.updated_at !== post.created_at && (
                          <div className="text-xs text-gray-400">(수정됨)</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Link
                          href={`/board/${post.id}`}
                          className="rounded p-1 text-blue-500 hover:bg-blue-100"
                          title="게시글 보기"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="rounded p-1 text-red-500 hover:bg-red-100"
                          title="게시글 삭제"
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

          {hasMore && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={loadMorePosts}
                disabled={loading}
                className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "로딩 중..." : "더 보기"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
