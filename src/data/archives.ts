// 아카이브 데이터 타입 정의
export interface ArchiveItem {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD 형식
  description: string;
  type: "image" | "video";
  url: string; // 이미지 경로 또는 비디오 URL
  thumbnailUrl?: string; // 썸네일 이미지 경로 (비디오의 경우)
  tags?: string[]; // 태그 목록
  category?: "event" | "research" | "media" | "other"; // 카테고리
}

// 아카이브 카테고리 정의
export const ARCHIVE_CATEGORIES = [
  { id: "all", name: "전체" },
  { id: "event", name: "행사" },
  { id: "research", name: "연구" },
  { id: "media", name: "미디어" },
  { id: "other", name: "기타" },
];

// 아카이브 타입 정의
export const ARCHIVE_TYPES = [
  { id: "all", name: "전체" },
  { id: "image", name: "사진" },
  { id: "video", name: "영상" },
];

// 아카이브 데이터 배열
export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 1,
    title: "사물의 의회 사전 설명회",
    date: "2023-12-30",
    description:
      "사물의 의회 사전 설명회 현장 사진입니다. 많은 참가자들이 관심을 보였습니다.",
    type: "image",
    url: "/images/archives/seminar_1.svg",
    tags: ["설명회", "행사", "참가자"],
    category: "event",
  },
  {
    id: 2,
    title: "기후위기 특별 강연회",
    date: "2024-02-05",
    description:
      "김지구 교수의 '인간중심주의를 넘어선 기후위기 대응 방안' 강연 영상입니다.",
    type: "video",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // 예시 URL (실제 영상으로 교체 필요)
    thumbnailUrl: "/images/archives/lecture_thumbnail.svg",
    tags: ["강연", "기후위기", "인간중심주의"],
    category: "event",
  },
  {
    id: 3,
    title: "비인간 존재 대변인 워크숍",
    date: "2024-02-15",
    description: "비인간 존재 대변인 워크숍에서 진행된 그룹 활동 사진입니다.",
    type: "image",
    url: "/images/archives/workshop_1.svg",
    tags: ["워크숍", "비인간", "대변인"],
    category: "event",
  },
  {
    id: 4,
    title: "사물의 의회 소개 영상",
    date: "2024-02-10",
    description:
      "사물의 의회의 취지와 목적, 참가 방법, 기대 효과 등을 소개하는 영상입니다.",
    type: "video",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // 예시 URL (실제 영상으로 교체 필요)
    thumbnailUrl: "/images/archives/lecture_thumbnail.svg",
    tags: ["소개", "홍보", "의회"],
    category: "media",
  },
  {
    id: 5,
    title: "참가자 오리엔테이션",
    date: "2024-03-20",
    description: "사물의 의회 참가자 오리엔테이션 단체 사진입니다.",
    type: "image",
    url: "/images/archives/seminar_1.svg",
    tags: ["오리엔테이션", "참가자", "단체사진"],
    category: "event",
  },
  {
    id: 6,
    title: "기후위기 현장 답사",
    date: "2024-04-10",
    description: "한강 생태공원과 서울 에너지드림센터 답사 사진입니다.",
    type: "image",
    url: "/images/archives/fieldtrip_1.svg",
    tags: ["답사", "한강", "생태공원"],
    category: "event",
  },
  {
    id: 7,
    title: "기후위기 현장 답사 영상",
    date: "2024-04-10",
    description: "한강 생태공원과 서울 에너지드림센터 답사 영상입니다.",
    type: "video",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // 예시 URL (실제 영상으로 교체 필요)
    thumbnailUrl: "/images/archives/lecture_thumbnail.svg",
    tags: ["답사", "한강", "생태공원", "영상"],
    category: "event",
  },
  {
    id: 8,
    title: "의제 설정 워크숍",
    date: "2024-04-25",
    description: "사물의 의회에서 다룰 의제를 함께 설정하는 워크숍 사진입니다.",
    type: "image",
    url: "/images/archives/workshop_1.svg",
    tags: ["워크숍", "의제", "토론"],
    category: "event",
  },
  {
    id: 9,
    title: "사물의 의회 1차 본회의",
    date: "2024-05-15",
    description: "인간과 비인간 존재가 함께하는 첫 번째 본회의 사진입니다.",
    type: "image",
    url: "/images/archives/meeting_1.svg",
    tags: ["본회의", "토론", "의회"],
    category: "event",
  },
  {
    id: 10,
    title: "사물의 의회 1차 본회의 영상",
    date: "2024-05-15",
    description: "인간과 비인간 존재가 함께하는 첫 번째 본회의 영상입니다.",
    type: "video",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // 예시 URL (실제 영상으로 교체 필요)
    thumbnailUrl: "/images/archives/lecture_thumbnail.svg",
    tags: ["본회의", "토론", "의회", "영상"],
    category: "event",
  },
  {
    id: 12,
    title: "사물의 의회 인터뷰 영상",
    date: "2024-03-01",
    description: "사물의 의회 참가자들과의 인터뷰 영상입니다.",
    type: "video",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // 예시 URL (실제 영상으로 교체 필요)
    thumbnailUrl: "/images/archives/lecture_thumbnail.svg",
    tags: ["인터뷰", "참가자", "영상"],
    category: "media",
  },
  {
    id: 13,
    title: "사전 설명회 질의응답 시간",
    date: "2023-12-30",
    description:
      "사물의 의회 사전 설명회에서 진행된 질의응답 시간의 모습입니다.",
    type: "image",
    url: "/images/archives/seminar_1.svg",
    tags: ["설명회", "행사", "질의응답", "참가자"],
    category: "event",
  },
  {
    id: 14,
    title: "사전 설명회 자료 배포",
    date: "2023-12-30",
    description:
      "사물의 의회 사전 설명회에서 참가자들에게 자료를 배포하는 모습입니다.",
    type: "image",
    url: "/images/archives/seminar_1.svg",
    tags: ["설명회", "행사", "자료", "참가자"],
    category: "event",
  },
  {
    id: 15,
    title: "기후위기 특별 강연회 청중",
    date: "2024-02-05",
    description:
      "기후위기 특별 강연회에 참석한 청중들의 모습입니다. 많은 분들이 관심을 보였습니다.",
    type: "image",
    url: "/images/archives/seminar_1.svg",
    tags: ["강연", "기후위기", "청중", "행사"],
    category: "event",
  },
  {
    id: 16,
    title: "김지구 교수 강연 장면",
    date: "2024-02-05",
    description:
      "김지구 교수가 '인간중심주의를 넘어선 기후위기 대응 방안'에 대해 강연하는 모습입니다.",
    type: "image",
    url: "/images/archives/lecture_thumbnail.svg",
    tags: ["강연", "기후위기", "인간중심주의", "교수"],
    category: "event",
  },
  {
    id: 17,
    title: "비인간 존재 대변인 워크숍 토론",
    date: "2024-02-15",
    description:
      "비인간 존재 대변인 워크숍에서 참가자들이 토론하는 모습입니다.",
    type: "image",
    url: "/images/archives/workshop_1.svg",
    tags: ["워크숍", "비인간", "대변인", "토론"],
    category: "event",
  },
  {
    id: 18,
    title: "비인간 존재 대변인 워크숍 발표",
    date: "2024-02-15",
    description: "비인간 존재 대변인 워크숍에서 참가자가 발표하는 모습입니다.",
    type: "image",
    url: "/images/archives/workshop_1.svg",
    tags: ["워크숍", "비인간", "대변인", "발표"],
    category: "event",
  },
  {
    id: 19,
    title: "참가자 오리엔테이션 소그룹 활동",
    date: "2024-03-20",
    description: "참가자 오리엔테이션에서 진행된 소그룹 활동 모습입니다.",
    type: "image",
    url: "/images/archives/seminar_1.svg",
    tags: ["오리엔테이션", "참가자", "소그룹", "활동"],
    category: "event",
  },
  {
    id: 20,
    title: "참가자 오리엔테이션 자기소개",
    date: "2024-03-20",
    description: "참가자 오리엔테이션에서 진행된 자기소개 시간의 모습입니다.",
    type: "image",
    url: "/images/archives/seminar_1.svg",
    tags: ["오리엔테이션", "참가자", "자기소개"],
    category: "event",
  },
  {
    id: 21,
    title: "한강 생태공원 답사 현장",
    date: "2024-04-10",
    description:
      "한강 생태공원 답사 중 참가자들이 생태계를 관찰하는 모습입니다.",
    type: "image",
    url: "/images/archives/fieldtrip_1.svg",
    tags: ["답사", "한강", "생태공원", "관찰"],
    category: "event",
  },
  {
    id: 22,
    title: "에너지드림센터 답사",
    date: "2024-04-10",
    description:
      "서울 에너지드림센터를 방문하여 친환경 에너지 시설을 둘러보는 모습입니다.",
    type: "image",
    url: "/images/archives/fieldtrip_1.svg",
    tags: ["답사", "에너지드림센터", "친환경", "시설"],
    category: "event",
  },
  {
    id: 23,
    title: "의제 설정 워크숍 브레인스토밍",
    date: "2024-04-25",
    description: "의제 설정 워크숍에서 참가자들이 브레인스토밍하는 모습입니다.",
    type: "image",
    url: "/images/archives/workshop_1.svg",
    tags: ["워크숍", "의제", "브레인스토밍", "토론"],
    category: "event",
  },
  {
    id: 24,
    title: "의제 설정 워크숍 결과물",
    date: "2024-04-25",
    description:
      "의제 설정 워크숍에서 도출된 주요 의제들을 정리한 결과물입니다.",
    type: "image",
    url: "/images/archives/workshop_1.svg",
    tags: ["워크숍", "의제", "결과물"],
    category: "event",
  },
  {
    id: 25,
    title: "1차 본회의 개회식",
    date: "2024-05-15",
    description: "사물의 의회 1차 본회의 개회식 장면입니다.",
    type: "image",
    url: "/images/archives/meeting_1.svg",
    tags: ["본회의", "개회식", "의회"],
    category: "event",
  },
  {
    id: 26,
    title: "1차 본회의 토론 장면",
    date: "2024-05-15",
    description:
      "사물의 의회 1차 본회의에서 활발한 토론이 진행되는 모습입니다.",
    type: "image",
    url: "/images/archives/meeting_1.svg",
    tags: ["본회의", "토론", "의회", "참가자"],
    category: "event",
  },
  {
    id: 27,
    title: "비인간 존재 대변인들의 발언",
    date: "2024-05-15",
    description:
      "사물의 의회 1차 본회의에서 비인간 존재 대변인들이 발언하는 모습입니다.",
    type: "image",
    url: "/images/archives/meeting_1.svg",
    tags: ["본회의", "비인간", "대변인", "발언"],
    category: "event",
  },
  {
    id: 28,
    title: "연구팀 회의",
    date: "2024-03-10",
    description:
      "사물의 의회 연구팀이 연구 방향과 방법론에 대해 논의하는 모습입니다.",
    type: "image",
    url: "/images/archives/seminar_1.svg",
    tags: ["연구", "회의", "방법론", "학술"],
    category: "research",
  },
  {
    id: 29,
    title: "연구 자료 수집",
    date: "2024-03-05",
    description: "사물의 의회 연구를 위한 자료를 수집하고 분석하는 과정입니다.",
    type: "image",
    url: "/images/archives/seminar_1.svg",
    tags: ["연구", "자료", "분석", "학술"],
    category: "research",
  },
  {
    id: 30,
    title: "사물의 의회 홍보 포스터",
    date: "2024-01-15",
    description: "사물의 의회 참가자 모집을 위한 홍보 포스터입니다.",
    type: "image",
    url: "/images/archives/lecture_thumbnail.svg",
    tags: ["홍보", "포스터", "모집", "디자인"],
    category: "media",
  },
];

// 날짜 포맷 함수
export function formatArchiveDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
