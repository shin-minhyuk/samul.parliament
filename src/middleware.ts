import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 점검 모드 활성화 여부 (true = 점검 중, false = 정상 운영)
// 환경 변수가 설정되지 않았다면 기본값은 false
const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

// 점검 페이지에서 제외할 경로 (관리자 페이지 등)
const EXCLUDED_PATHS = [
  "/maintenance",
  "/admin", // 관리자는 접근 가능하도록
  "/_next", // Next.js 내부 경로
  "/favicon.ico",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 점검 모드가 활성화된 경우에만 처리
  if (MAINTENANCE_MODE) {
    // 제외 경로에 해당하는 요청은 정상적으로 처리
    if (EXCLUDED_PATHS.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // 그 외 모든 요청은 점검 페이지로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로 패턴 설정
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
