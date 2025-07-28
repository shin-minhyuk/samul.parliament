import { supabase } from "@/lib/supabase";
import {
  Post,
  Comment,
  CreatePostData,
  CreateCommentData,
} from "@/types/board";

// 게시글 목록 조회
export async function getPosts(
  page = 1,
  limit = 10,
): Promise<{ posts: Post[]; total: number; hasMore: boolean }> {
  const offset = (page - 1) * limit;

  const {
    data: posts,
    error,
    count,
  } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching posts:", error);
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }

  return {
    posts: posts || [],
    total: count || 0,
    hasMore: (count || 0) > offset + limit,
  };
}

// 게시글 상세 조회
export async function getPost(id: string): Promise<Post> {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }

  return post;
}

// 이미지 업로드
export async function uploadImage(file: File, userId: string): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("post-images")
    .upload(fileName, file);

  if (error) {
    console.error("Error uploading image:", error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("post-images").getPublicUrl(data.path);

  return publicUrl;
}

// 게시글 작성
export async function createPost(postData: CreatePostData): Promise<Post> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  let imageUrl = "";
  if (postData.image) {
    imageUrl = await uploadImage(postData.image, user.id);
  }

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      title: postData.title,
      content: postData.content,
      image_url: imageUrl || null,
      author_id: user.id,
      author_name:
        user.user_metadata?.name || user.email?.split("@")[0] || "익명",
      author_email: user.email || "",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    throw new Error("게시글 작성에 실패했습니다.");
  }

  return post;
}

// 게시글 수정
export async function updatePost(
  id: string,
  postData: Partial<CreatePostData>,
): Promise<Post> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const updateData: Partial<Post> = {
    title: postData.title,
    content: postData.content,
    updated_at: new Date().toISOString(),
  };

  if (postData.image) {
    const imageUrl = await uploadImage(postData.image, user.id);
    updateData.image_url = imageUrl;
  }

  const { data: post, error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", id)
    .eq("author_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating post:", error);
    throw new Error("게시글 수정에 실패했습니다.");
  }

  return post;
}

// 게시글 삭제
export async function deletePost(id: string): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .eq("author_id", user.id);

  if (error) {
    console.error("Error deleting post:", error);
    throw new Error("게시글 삭제에 실패했습니다.");
  }
}

// 댓글 목록 조회 (대댓글 포함)
export async function getComments(postId: string): Promise<Comment[]> {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    throw new Error("댓글을 불러오는데 실패했습니다.");
  }

  // 댓글과 대댓글을 트리 구조로 정리
  const commentMap = new Map<string, Comment>();
  const rootComments: Comment[] = [];

  // 모든 댓글을 맵에 저장
  comments?.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // 댓글 트리 구조 생성
  comments?.forEach((comment) => {
    const commentWithReplies = commentMap.get(comment.id)!;

    if (comment.parent_id) {
      // 대댓글인 경우 부모 댓글에 추가
      const parentComment = commentMap.get(comment.parent_id);
      if (parentComment) {
        parentComment.replies?.push(commentWithReplies);
      }
    } else {
      // 최상위 댓글인 경우 루트에 추가
      rootComments.push(commentWithReplies);
    }
  });

  return rootComments;
}

// 댓글 작성
export async function createComment(
  commentData: CreateCommentData,
): Promise<Comment> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { data: comment, error } = await supabase
    .from("comments")
    .insert({
      post_id: commentData.post_id,
      parent_id: commentData.parent_id || null,
      content: commentData.content,
      author_id: user.id,
      author_name:
        user.user_metadata?.name || user.email?.split("@")[0] || "익명",
      author_email: user.email || "",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating comment:", error);
    throw new Error("댓글 작성에 실패했습니다.");
  }

  return comment;
}

// 댓글 수정
export async function updateComment(
  id: string,
  content: string,
): Promise<Comment> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { data: comment, error } = await supabase
    .from("comments")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("author_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating comment:", error);
    throw new Error("댓글 수정에 실패했습니다.");
  }

  return comment;
}

// 댓글 삭제
export async function deleteComment(id: string): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .eq("author_id", user.id);

  if (error) {
    console.error("Error deleting comment:", error);
    throw new Error("댓글 삭제에 실패했습니다.");
  }
}
