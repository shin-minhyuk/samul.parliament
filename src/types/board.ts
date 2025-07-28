export interface Post {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  author_id: string;
  author_name: string;
  author_email: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  parent_id?: string;
  content: string;
  author_id: string;
  author_name: string;
  author_email: string;
  created_at: string;
  updated_at: string;
  replies?: Comment[];
}

export interface CreatePostData {
  title: string;
  content: string;
  image?: File;
}

export interface CreateCommentData {
  post_id: string;
  parent_id?: string;
  content: string;
}
