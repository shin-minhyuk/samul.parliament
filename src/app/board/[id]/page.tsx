"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  getPost,
  deletePost,
  getComments,
  createComment,
  deleteComment,
} from "@/services/boardService";
import { Post, Comment } from "@/types/board";
import { formatDateTime } from "@/util/date";
import { Button } from "@/components/Button";
import {
  ArrowLeft,
  Edit,
  Trash2,
  MessageCircle,
  Reply,
  User,
  Calendar,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";

// 댓글 컴포넌트
function CommentItem({
  comment,
  user,
  onReply,
  onDelete,
  level = 0,
}: {
  comment: Comment;
  user: {
    id: string;
    user_metadata?: { name?: string };
    email?: string;
  } | null;
  onReply: (parentId: string) => void;
  onDelete: (commentId: string) => void;
  level?: number;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const isAuthor = user?.id === comment.author_id;
  const maxLevel = 2; // 최대 2단계 깊이까지만 허용

  return (
    <div
      className={`${level > 0 ? "ml-8 border-l-2 border-gray-100 pl-4" : ""} mb-4`}
    >
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium text-gray-900">
              {comment.author_name}
            </span>
            <span className="text-sm text-gray-500">
              <Calendar className="mr-1 inline h-3 w-3" />
              {formatDateTime(comment.created_at)}
            </span>
          </div>

          {isAuthor && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {showMenu && (
                <div className="absolute top-8 right-0 z-10 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <button
                    onClick={() => {
                      onDelete(comment.id);
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left whitespace-nowrap text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="mb-3 whitespace-pre-wrap text-gray-800">
          {comment.content}
        </p>

        {user && level < maxLevel && (
          <button
            onClick={() => onReply(comment.id)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Reply className="h-3 w-3" />
            답글
          </button>
        )}
      </div>

      {/* 대댓글 렌더링 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              user={user}
              onReply={onReply}
              onDelete={onDelete}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 댓글 작성 관련 상태
  const [commentContent, setCommentContent] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const loadPost = async () => {
    try {
      setLoading(true);
      const postData = await getPost(postId);
      setPost(postData);
      setError(null);
    } catch (err) {
      console.error("Error loading post:", err);
      setError("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const commentsData = await getComments(postId);
      setComments(commentsData);
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  };

  useEffect(() => {
    if (postId) {
      loadPost();
      loadComments();
    }
  }, [postId]);

  const handleDeletePost = async () => {
    if (!post) return;

    try {
      await deletePost(post.id);
      router.push("/board");
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("게시글 삭제에 실패했습니다.");
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      return;
    }

    setCommentLoading(true);

    try {
      await createComment({
        post_id: postId,
        parent_id: replyToId || undefined,
        content: commentContent.trim(),
      });

      setCommentContent("");
      setReplyToId(null);
      await loadComments(); // 댓글 목록 새로고침
    } catch (err) {
      console.error("Error creating comment:", err);
      setError("댓글 작성에 실패했습니다.");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleReply = (parentId: string) => {
    setReplyToId(parentId);
    // 댓글 입력창으로 스크롤
    document
      .getElementById("comment-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      await loadComments(); // 댓글 목록 새로고침
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError("댓글 삭제에 실패했습니다.");
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
            게시글을 찾을 수 없습니다
          </h2>
          <p className="mb-6 text-gray-500">{error}</p>
          <Link href="/board">
            <Button>게시판으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const isAuthor = user?.id === post.author_id;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <Link href="/board">
          <Button className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200">
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Button>
        </Link>

        {isAuthor && (
          <div className="flex gap-2">
            <Link href={`/board/${post.id}/edit`}>
              <Button className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200">
                <Edit className="h-4 w-4" />
                수정
              </Button>
            </Link>

            <Button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 className="h-4 w-4" />
              삭제
            </Button>
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* 게시글 내용 */}
      <article className="mb-8 rounded-lg border border-gray-200 bg-white p-8">
        <header className="mb-6">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 border-b border-gray-200 pb-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author_name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDateTime(post.created_at)}</span>
            </div>
            {post.updated_at !== post.created_at && (
              <span className="text-xs text-gray-400">
                수정됨 {formatDateTime(post.updated_at)}
              </span>
            )}
          </div>
        </header>

        <div className="prose max-w-none">
          {post.image_url && (
            <div className="mb-6">
              <img
                src={post.image_url}
                alt="게시글 이미지"
                className="h-auto max-w-full rounded-lg"
              />
            </div>
          )}

          <div className="leading-relaxed whitespace-pre-wrap text-gray-800">
            {post.content}
          </div>
        </div>
      </article>

      {/* 댓글 섹션 */}
      <section className="mb-8">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
          <MessageCircle className="h-6 w-6" />
          댓글 ({comments.length})
        </h2>

        {/* 댓글 목록 */}
        {comments.length > 0 ? (
          <div className="mb-8 space-y-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                user={user}
                onReply={handleReply}
                onDelete={handleDeleteComment}
              />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <MessageCircle className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p>아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!</p>
          </div>
        )}

        {/* 댓글 작성 폼 */}
        {user ? (
          <form
            id="comment-form"
            onSubmit={handleSubmitComment}
            className="rounded-lg bg-gray-50 p-6"
          >
            {replyToId && (
              <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <p className="flex items-center gap-2 text-sm text-blue-600">
                  <Reply className="h-4 w-4" />
                  답글을 작성하고 있습니다.
                </p>
                <button
                  type="button"
                  onClick={() => setReplyToId(null)}
                  className="mt-1 text-sm text-blue-500 hover:text-blue-700"
                >
                  취소
                </button>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              </div>

              <div className="flex-1">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder={
                    replyToId ? "답글을 입력하세요..." : "댓글을 입력하세요..."
                  }
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  required
                />

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {user.user_metadata?.name || user.email}
                  </span>

                  <Button
                    type="submit"
                    disabled={commentLoading || !commentContent.trim()}
                    className="px-6"
                  >
                    {commentLoading
                      ? "작성 중..."
                      : replyToId
                        ? "답글 작성"
                        : "댓글 작성"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="rounded-lg bg-gray-50 py-8 text-center">
            <p className="mb-4 text-gray-600">
              댓글을 작성하려면 로그인해주세요.
            </p>
          </div>
        )}
      </section>

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              게시글 삭제
            </h3>
            <p className="mb-6 text-gray-600">
              정말로 이 게시글을 삭제하시겠습니까? 삭제된 게시글은 복구할 수
              없습니다.
            </p>

            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                취소
              </Button>
              <Button
                onClick={handleDeletePost}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
