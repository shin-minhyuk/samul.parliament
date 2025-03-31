// 공지사항 타입 정의
export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category?: string;
  important?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// FAQ 타입 정의
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// 일정 타입 정의
export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  important?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// 아카이브 항목 타입
export interface ArchiveItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD 형식
  description: string;
  type: "image" | "video";
  url: string; // 이미지 경로 또는 비디오 URL
  thumbnailUrl?: string; // 썸네일 이미지 경로 (비디오의 경우)
  tags?: string[]; // 태그 목록
  category?: "event" | "research" | "media" | "other"; // 카테고리
  createdAt?: Date;
  updatedAt?: Date;
}

// 아카이브 카테고리 타입
export type ArchiveCategory = "event" | "research" | "media" | "other";

// 아카이브 타입
export type ArchiveType = "image" | "video";

// 카테고리 타입 정의
export interface Category {
  id: string;
  name: string;
}

// 타입 정의
export interface Type {
  id: string;
  name: string;
}
