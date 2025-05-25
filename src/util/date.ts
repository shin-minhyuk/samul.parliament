// 날짜 포맷 함수
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
