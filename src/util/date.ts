// 날짜 포맷 함수
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // 1분 미만
  if (diffInMinutes < 1) {
    return "방금 전";
  }

  // 1시간 미만
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  // 24시간 미만
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // 7일 미만
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  // 그 외는 날짜 형식으로
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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
