// 날짜 포맷 함수
export function formatDate(dateString: string): string {
  // 날짜 문자열이 YYYY-MM-DD 형식인지 확인 (시간 정보가 없는 경우)
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateString);

  if (isDateOnly) {
    // 시간 정보가 없는 순수 날짜인 경우, 상대시간이 아닌 절대 날짜로 표시
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Seoul",
    });
  }

  // timestamp인 경우 상대시간으로 표시
  const date = new Date(dateString);
  const now = new Date();

  // 한국 시간으로 변환하여 비교
  const seoulDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Seoul" }),
  );
  const seoulNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }),
  );

  const diffInMs = seoulNow.getTime() - seoulDate.getTime();
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

  // 그 외는 날짜 형식으로 (한국 시간대 적용)
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
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
    timeZone: "Asia/Seoul",
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
    timeZone: "Asia/Seoul",
  });
}

// 시간 포맷 함수
export function formatEventTime(timeString?: string): string {
  if (!timeString) return "";

  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
}
