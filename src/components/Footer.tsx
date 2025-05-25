import { Mail } from "lucide-react";
// import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ocean-deep/5 border-ocean-deep/10 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* 로고 및 설명 */}
          {/* <div>
            <h3 className="text-ocean-blue mb-4 font-semibold">사물의 의회</h3>
            <p className="text-sm text-gray-600">
              우리는 자연과 기술이 조화롭게 공존하는 미래를 만들어갑니다.
            </p>
          </div> */}

          {/* 빠른 링크 */}
          {/* <div>
            <h4 className="text-ocean-blue mb-4 font-semibold">빠른 링크</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/info" className="hover:text-ocean-blue">
                  행사 소개
                </Link>
              </li>
              <li>
                <Link href="/organization" className="hover:text-ocean-blue">
                  조직 구성
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-ocean-blue">
                  프로그램
                </Link>
              </li>
              <li>
                <Link href="/recruitment" className="hover:text-ocean-blue">
                  참가 신청
                </Link>
              </li>
            </ul>
          </div> */}

          {/* 연락처 */}
          <div>
            <h4 className="text-ocean-blue mb-4 font-semibold">연락처</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {/* <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>02-123-4567</span>
              </li> */}
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>samul.parliament@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 카피라이트 */}
        <div className="border-ocean-deep/10 mt-12 border-t pt-8 text-center text-sm text-gray-600">
          <p>© 2025 사물의 의회. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
