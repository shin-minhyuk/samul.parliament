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

// 아카이브 타입 정의
export interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

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
