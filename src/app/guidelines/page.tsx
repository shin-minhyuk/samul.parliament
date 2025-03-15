import React from "react";
import {
  FileText,
  Users,
  Calendar,
  CheckCircle,
  Mail,
  Phone,
} from "lucide-react";

export default function GuidelinesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-nature-forest mb-4 text-4xl font-bold md:text-5xl">
            2025 사물의 의회 모집요강
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            인간과 비인간 존재들이 함께하는 새로운 의회 구성을 위한 참가자 모집
            안내입니다.
          </p>
        </div>

        {/* 모집 개요 */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-nature-forest rounded-full p-2 text-white">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="text-nature-forest text-2xl font-bold">모집 개요</h2>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="mb-4">
              사물의 의회는 인간중심주의를 넘어 비인간 존재들과의 공존 방안을
              모색하는 새로운 형태의 의회입니다. 기후위기 시대에 인간과 비인간
              존재들이 함께 논의하고 결정하는 공론장을 구성하고자 합니다.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-nature-forest mb-2 text-lg font-semibold">
                  행사 일정
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Calendar className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                    <div>
                      <span className="font-medium">사전 워크숍:</span> 2025년
                      9월 중 (2회)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                    <div>
                      <span className="font-medium">본 회의:</span> 2025년 10월
                      15일 (월) 12:00-18:00
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                    <div>
                      <span className="font-medium">후속 모임:</span> 2025년
                      11월 중 (1회)
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-nature-forest mb-2 text-lg font-semibold">
                  모집 기간
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Calendar className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                    <div>
                      <span className="font-medium">1차 모집:</span> 2025년 5월
                      1일 ~ 6월 30일
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                    <div>
                      <span className="font-medium">결과 발표:</span> 2025년 7월
                      15일
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                    <div>
                      <span className="font-medium">2차 모집(필요시):</span>{" "}
                      2025년 7월 15일 ~ 8월 15일
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 모집 분야 */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-nature-spring rounded-full p-2 text-white">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-nature-forest text-2xl font-bold">모집 분야</h2>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="mb-6">
              사물의 의회는 다양한 인간 집단의 대표자와 비인간 존재를 대변할
              대변인으로 구성됩니다. 아래 분야별로 참가자를 모집합니다.
            </p>

            <h3 className="text-nature-forest mb-3 text-xl font-semibold">
              인간 그룹 (총 15명)
            </h3>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium">사회적 위치에 따른 대표</h4>
                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                  <li>도시 거주자 대표 (2명)</li>
                  <li>농촌 거주자 대표 (2명)</li>
                  <li>기업/산업계 대표 (1명)</li>
                  <li>노동자 대표 (1명)</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-medium">세대 및 취약계층 대표</h4>
                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                  <li>청소년/청년 대표 (2명)</li>
                  <li>노인 대표 (1명)</li>
                  <li>장애인 대표 (1명)</li>
                  <li>기후위기 취약지역 대표 (2명)</li>
                  <li>기후운동가/활동가 (3명)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-nature-forest mb-3 text-xl font-semibold">
              비인간 그룹 대변인 (총 15명)
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium">자연 요소 대변인</h4>
                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                  <li>대기/기후 대변인 (2명)</li>
                  <li>숲/식물 대변인 (2명)</li>
                  <li>바다/물 대변인 (2명)</li>
                  <li>흙/토양 대변인 (1명)</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-medium">생물 및 물질 대변인</h4>
                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                  <li>동물 대변인 (2명)</li>
                  <li>미생물 대변인 (1명)</li>
                  <li>화석연료 대변인 (1명)</li>
                  <li>재생에너지 대변인 (1명)</li>
                  <li>쓰레기/플라스틱 대변인 (2명)</li>
                  <li>기술/인공지능 대변인 (1명)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 지원 자격 및 방법 */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-nature-leaf rounded-full p-2 text-white">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h2 className="text-nature-forest text-2xl font-bold">
              지원 자격 및 방법
            </h2>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-nature-forest mb-3 text-xl font-semibold">
              지원 자격
            </h3>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-gray-700">
              <li>기후위기와 인간중심주의에 대한 관심이 있는 모든 분</li>
              <li>비인간 존재의 권리와 발언권에 대해 고민해보신 분</li>
              <li>
                2025년 9월~11월 예정된 모든 모임과 본 회의에 참석 가능한 분
              </li>
              <li>
                특정 분야의 전문 지식이 없어도 관심과 열정이 있으면 지원 가능
              </li>
              <li>
                연령, 성별, 학력, 직업 제한 없음 (단, 청소년/청년 대표는 만
                15세~29세)
              </li>
            </ul>

            <h3 className="text-nature-forest mb-3 text-xl font-semibold">
              지원 방법
            </h3>
            <ol className="mb-6 list-decimal space-y-3 pl-5 text-gray-700">
              <li>
                <span className="font-medium">지원서 작성 및 제출</span>
                <p className="mt-1 text-sm">
                  온라인 지원 양식을 통해 지원서를 작성하고 제출합니다.
                </p>
                <p className="mt-1 text-sm">
                  지원 시 희망하는 대표/대변인 분야를 1, 2지망으로 선택할 수
                  있습니다.
                </p>
              </li>
              <li>
                <span className="font-medium">서류 심사</span>
                <p className="mt-1 text-sm">
                  제출된 지원서를 바탕으로 1차 서류 심사를 진행합니다.
                </p>
                <p className="mt-1 text-sm">
                  심사 기준: 참여 동기, 관련 경험 및 관심도, 다양성 등
                </p>
              </li>
              <li>
                <span className="font-medium">화상 인터뷰 (필요시)</span>
                <p className="mt-1 text-sm">
                  서류 심사 통과자 중 필요한 경우 화상 인터뷰를 진행할 수
                  있습니다.
                </p>
              </li>
              <li>
                <span className="font-medium">최종 선발</span>
                <p className="mt-1 text-sm">
                  최종 선발된 참가자에게는 개별 연락 및 이메일로 안내됩니다.
                </p>
              </li>
            </ol>

            <div className="bg-nature-spring/10 rounded-lg p-4">
              <h4 className="mb-2 font-medium">제출 서류</h4>
              <ul className="list-disc space-y-1 pl-5 text-gray-700">
                <li>온라인 지원서 (기본 인적사항, 지원 분야, 참여 동기 등)</li>
                <li>자기소개서 (800자 이내)</li>
                <li>지원 분야 관련 활동 경험 또는 관심 분야 (500자 이내)</li>
                <li>비인간 존재와의 공존에 대한 본인의 생각 (500자 이내)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 참가자 혜택 */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-nature-forest rounded-full p-2 text-white">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h2 className="text-nature-forest text-2xl font-bold">
              참가자 혜택
            </h2>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            <ul className="list-disc space-y-3 pl-5 text-gray-700">
              <li>
                <span className="font-medium">참가 활동비 지급</span>
                <p className="mt-1 text-sm">
                  모든 참가자에게 회의 참석 및 준비를 위한 활동비가 지급됩니다.
                </p>
              </li>
              <li>
                <span className="font-medium">교통비 지원</span>
                <p className="mt-1 text-sm">
                  원거리 참가자의 경우 교통비가 실비로 지원됩니다.
                </p>
              </li>
              <li>
                <span className="font-medium">연구 참여 기회</span>
                <p className="mt-1 text-sm">
                  사물의 의회 결과를 바탕으로 한 학술 논문이나 보고서의 공동
                  저자로 참여할 기회가 제공됩니다.
                </p>
              </li>
              <li>
                <span className="font-medium">네트워킹</span>
                <p className="mt-1 text-sm">
                  다양한 분야의 전문가, 활동가, 시민들과 교류하고 네트워크를
                  형성할 수 있는 기회가 제공됩니다.
                </p>
              </li>
              <li>
                <span className="font-medium">참가 인증서</span>
                <p className="mt-1 text-sm">
                  모든 일정 참여 후 사물의 의회 참가 인증서가 발급됩니다.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* 문의처 */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-nature-spring rounded-full p-2 text-white">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-nature-forest text-2xl font-bold">문의처</h2>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-gray-500" />
                <div>
                  <span className="font-medium">이메일:</span>{" "}
                  info@samuluiuihoe.org
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-gray-500" />
                <div>
                  <span className="font-medium">전화:</span> 02-123-4567 (평일
                  10:00-17:00)
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* 지원하기 버튼 */}
        <div className="flex justify-center">
          <a
            href="https://www.instagram.com/samuluiuihoe"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-nature-spring hover:bg-nature-forest rounded-full px-10 py-4 text-lg font-semibold text-white transition-all"
          >
            지원하기
          </a>
        </div>
      </div>
    </div>
  );
}
