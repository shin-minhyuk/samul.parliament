// FAQ 카테고리 정의
export const FAQ_CATEGORIES = [
  { id: "general", name: "일반 정보" },
  { id: "participation", name: "참가 안내" },
  { id: "event", name: "행사 관련" },
  { id: "research", name: "연구 및 결과" },
];

// 일정 유형 정의
export const EVENT_TYPES = [
  { id: "workshop", name: "워크숍", color: "bg-blue-500" },
  { id: "meeting", name: "회의", color: "bg-green-500" },
  { id: "seminar", name: "세미나", color: "bg-purple-500" },
  { id: "fieldtrip", name: "현장 답사", color: "bg-amber-500" },
  { id: "other", name: "기타", color: "bg-gray-500" },
];

// 아카이브 카테고리 정의
export const ARCHIVE_CATEGORIES = [
  { id: "all", name: "전체" },
  { id: "reference", name: "참고자료" },
  { id: "preliminary", name: "예비모임" },
  { id: "main", name: "본회의" },
  { id: "result", name: "결과물" },
];

// 아카이브 타입 정의
export const ARCHIVE_TYPES = [
  { id: "all", name: "전체" },
  { id: "text", name: "텍스트" },
  { id: "image", name: "사진" },
  { id: "video", name: "영상" },
  { id: "pdf", name: "PDF" },
];

// 관리자 이메일 확인 함수
export function isAdminEmail(email: string): boolean {
  // 환경변수에서 관리자 이메일 목록 가져오기
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS;

  if (!adminEmails) {
    console.warn("NEXT_PUBLIC_ADMIN_EMAILS 환경변수가 설정되지 않았습니다.");
    return false;
  }

  // 쉼표로 구분된 이메일 목록을 배열로 변환
  const emailList = adminEmails
    .split(",")
    .map((email) => email.trim().toLowerCase());

  return emailList.includes(email.toLowerCase());
}
