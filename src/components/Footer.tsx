import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ocean-deep/5 border-ocean-deep/10 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 로고 및 설명 */}
          <div>
            <h3 className="text-ocean-blue mb-4 font-semibold">사물의 의회</h3>
            <p className="text-sm text-gray-600">
              우리는 자연과 기술이 조화롭게 공존하는 미래를 만들어갑니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="text-ocean-blue mb-4 font-semibold">빠른 링크</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  행사 소개
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  연사 소개
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  프로그램
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  참가 신청
                </a>
              </li>
            </ul>
          </div>

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
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>서울특별시 강남구 테헤란로</span>
              </li>
            </ul>
          </div>

          {/* 뉴스레터 */}
          <div>
            <h4 className="text-ocean-blue mb-4 font-semibold">
              뉴스레터 구독
            </h4>
            <p className="mb-4 text-sm text-gray-600">
              최신 소식과 업데이트를 받아보세요.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="이메일 주소"
                className="border-ocean-deep/20 focus:border-ocean-blue w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary-500 hover:bg-ocean-blue rounded-lg px-4 py-2 text-sm whitespace-nowrap text-white transition-colors"
              >
                구독
              </button>
            </form>
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
