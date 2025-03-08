/**
 * 외부 URL을 새 탭에서 안전하게 여는 함수
 * @param url 열고자 하는 URL
 * @param options 추가 옵션 (noopener, noreferrer 등)
 */
export const openExternalLink = (
  url: string,
  options: { newTab?: boolean } = { newTab: true },
) => {
  if (!url) return;

  const sanitizedUrl = url.trim();

  if (options.newTab) {
    window.open(sanitizedUrl, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = sanitizedUrl;
  }
};
