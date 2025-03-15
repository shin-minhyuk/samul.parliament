// 일정 데이터 타입 정의
export interface ScheduleEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD 형식
  startTime?: string; // HH:MM 형식
  endTime?: string; // HH:MM 형식
  location: string;
  description: string;
  type: "workshop" | "meeting" | "seminar" | "fieldtrip" | "other";
  isImportant?: boolean;
}

// 일정 유형 정의
export const EVENT_TYPES = [
  { id: "workshop", name: "워크숍", color: "bg-blue-500" },
  { id: "meeting", name: "회의", color: "bg-green-500" },
  { id: "seminar", name: "세미나", color: "bg-purple-500" },
  { id: "fieldtrip", name: "현장 답사", color: "bg-amber-500" },
  { id: "other", name: "기타", color: "bg-gray-500" },
];

// 일정 데이터 배열
export const SCHEDULE_EVENTS: ScheduleEvent[] = [
  {
    id: 1,
    title: "사물의 의회 사전 설명회",
    date: "2023-12-30",
    startTime: "14:00",
    endTime: "16:00",
    location: "서울숲 컨퍼런스센터 소회의실",
    description: "사물의 의회 소개, 참가자 모집 안내, 질의응답",
    type: "seminar",
    isImportant: true,
  },
  {
    id: 2,
    title: "기후위기 특별 강연회",
    date: "2024-02-05",
    startTime: "14:00",
    endTime: "16:00",
    location: "서울숲 컨퍼런스센터 대회의실",
    description:
      "김지구 교수의 '인간중심주의를 넘어선 기후위기 대응 방안' 강연",
    type: "seminar",
    isImportant: true,
  },
  {
    id: 3,
    title: "비인간 존재 대변인 워크숍",
    date: "2024-02-15",
    startTime: "13:00",
    endTime: "17:00",
    location: "서울숲 컨퍼런스센터 소회의실",
    description: "비인간 존재의 관점 이해하기, 대변인의 역할과 책임, 사례 연구",
    type: "workshop",
  },
  {
    id: 4,
    title: "참가자 오리엔테이션",
    date: "2024-03-20",
    startTime: "10:00",
    endTime: "12:00",
    location: "서울숲 컨퍼런스센터 대회의실",
    description: "사물의 의회 참가자 소개, 일정 안내, 운영 방식 설명",
    type: "meeting",
    isImportant: true,
  },
  {
    id: 5,
    title: "기후위기 현장 답사",
    date: "2024-04-10",
    startTime: "09:00",
    endTime: "17:00",
    location: "한강 생태공원, 서울 에너지드림센터",
    description:
      "기후위기의 영향을 직접 확인하고 대응 사례를 살펴보는 현장 답사",
    type: "fieldtrip",
  },
  {
    id: 6,
    title: "의제 설정 워크숍",
    date: "2024-04-25",
    startTime: "13:00",
    endTime: "17:00",
    location: "서울숲 컨퍼런스센터 소회의실",
    description: "사물의 의회에서 다룰 의제를 함께 설정하는 워크숍",
    type: "workshop",
  },
  {
    id: 7,
    title: "사물의 의회 1차 본회의",
    date: "2024-05-15",
    startTime: "10:00",
    endTime: "17:00",
    location: "서울숲 컨퍼런스센터 대회의실",
    description: "인간과 비인간 존재가 함께하는 첫 번째 본회의",
    type: "meeting",
    isImportant: true,
  },
  {
    id: 8,
    title: "사물의 의회 2차 본회의",
    date: "2024-06-01",
    startTime: "10:00",
    endTime: "17:00",
    location: "서울숲 컨퍼런스센터 대회의실",
    description: "1차 회의 결과를 바탕으로 한 심화 토론",
    type: "meeting",
    isImportant: true,
  },
  {
    id: 9,
    title: "결과 정리 워크숍",
    date: "2024-06-15",
    startTime: "13:00",
    endTime: "17:00",
    location: "서울숲 컨퍼런스센터 소회의실",
    description: "의회의 결과를 정리하고 후속 조치를 계획하는 워크숍",
    type: "workshop",
  },
  {
    id: 10,
    title: "사물의 의회 결과 발표회",
    date: "2024-06-30",
    startTime: "14:00",
    endTime: "17:00",
    location: "서울숲 컨퍼런스센터 대회의실",
    description: "사물의 의회의 결과를 공유하고 향후 계획을 발표하는 행사",
    type: "seminar",
    isImportant: true,
  },
];

// 날짜 포맷 함수
export function formatEventDate(
  dateString: string,
  includeYear: boolean = true,
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: includeYear ? "numeric" : undefined,
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

// 시간 포맷 함수
export function formatEventTime(timeString?: string): string {
  if (!timeString) return "";

  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
}
