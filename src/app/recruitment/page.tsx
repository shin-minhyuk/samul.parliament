import React from "react";
import Link from "next/link";
import {
  Leaf,
  Users,
  Globe,
  Clock,
  FileText,
  MessageCircle,
} from "lucide-react";

export default function RecruitmentPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-primary-500 mb-4 text-4xl font-bold md:text-5xl">
            2025 사물의 의회 참가자 모집
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            인간과 비인간 존재들이 함께 모여 기후위기 시대의 공존 방안을
            모색하는 새로운 형태의 의회에 여러분을 초대합니다.
          </p>
        </div>

        {/* 모집 개요 */}
        <section className="mb-16">
          <div className="bg-ocean-deep relative overflow-hidden rounded-xl p-8 text-white shadow-xl">
            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-bold">모집 개요</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">행사 일정</h3>
                  <div className="mb-2 flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">
                        예비 모임{" "}
                        <span className="text-sm text-red-400">필수 참여</span>
                      </p>
                      <p className="text-sm text-gray-200">
                        2025년 9월 27일 (토)
                      </p>

                      <p className="text-sm text-gray-200">
                        예비 모임에서는 정치적 대표로서의 역할 교육과 토론 준비
                        워크숍이 진행됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">본 회의</p>
                      <p>2025년 11월 1일 ~ 2일 (토, 일)</p>
                      <p>10:00 - 17:00 KST</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-semibold">모집 기간</h3>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">1차 모집</p>
                      <p>2025년 6월 1일 ~ 6월 30일</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 -z-0 h-64 w-64 opacity-10">
              <Leaf className="h-full w-full" />
            </div>
          </div>
        </section>

        {/* 모집 분야 */}
        <section className="mb-16">
          <h2 className="text-primary-500 mb-8 text-center text-3xl font-bold">
            모집 분야
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 인간 그룹 */}
            <div className="group rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-ocean-surf rounded-full p-2 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-ocean-deep text-xl font-bold">인간 그룹</h3>
              </div>
              <ul className="mb-4 list-disc space-y-2 pl-5">
                <li>기업가</li>
                <li>노동자</li>
                <li>농민</li>
                <li>미래세대</li>
                <li>사회적 약자 (빈민, 노인 등)</li>
              </ul>
              <p className="text-sm text-gray-600">
                다양한 인간 사회의 관점에서 기후위기를 바라보고, 비인간 존재와의
                공존 방안을 모색할 참가자를 모집합니다.
              </p>
            </div>

            {/* 비인간 그룹 */}
            <div className="group rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-ocean-blue rounded-full p-2 text-white">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-ocean-deep text-xl font-bold">
                  비인간 그룹 대변인
                </h3>
              </div>
              <ul className="mb-4 list-disc space-y-2 pl-5">
                <li>대기</li>
                <li>산림</li>
                <li>해양</li>
                <li>동물</li>
                <li>기술 (AI, 지구공학)</li>
              </ul>
              <p className="text-sm text-gray-600">
                비인간 존재들의 목소리를 대변하고, 그들의 권리와 행위성을
                인정받기 위한 논의를 이끌어갈 대변인을 모집합니다.
              </p>
            </div>
          </div>

          <div className="bg-ocean-surf/10 mt-8 rounded-xl p-6">
            <h3 className="text-ocean-deep mb-3 text-xl font-bold">
              지원 자격
            </h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>기후위기와 인간중심주의에 대한 관심이 있는 모든 분</li>
              <li>비인간 존재의 권리와 발언권에 대해 고민해보신 분</li>
              <li>
                2025년 9월~11월 예정된 예비 모임과 본 회의에 모두 참석 가능한 분
              </li>
              <li>
                특정 분야의 전문 지식이 없어도 관심과 열정이 있으면 지원 가능
              </li>
            </ul>
          </div>
        </section>

        {/* 참여 혜택 */}
        <section className="mb-16">
          <h2 className="text-primary-500 mb-8 text-center text-3xl font-bold">
            참여 혜택
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm">
              <div className="bg-ocean-blue/10 mb-4 inline-block rounded-full p-3">
                <MessageCircle className="text-primary-500 h-6 w-6" />
              </div>
              <h3 className="text-ocean-deep mb-2 text-lg font-bold">
                목소리를 낼 기회
              </h3>
              <p className="text-sm text-gray-600">
                인간중심주의를 넘어 비인간 존재들과의 공존에 대한 여러분의
                생각을 표현하고 논의할 수 있는 장이 제공됩니다.
              </p>
            </div>

            <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm">
              <div className="bg-ocean-blue/10 mb-4 inline-block rounded-full p-3">
                <Users className="text-primary-500 h-6 w-6" />
              </div>
              <h3 className="text-ocean-deep mb-2 text-lg font-bold">
                네트워킹
              </h3>
              <p className="text-sm text-gray-600">
                다양한 분야의 전문가, 활동가, 시민들과 교류하고 네트워크를
                형성할 수 있는 기회가 제공됩니다.
              </p>
            </div>

            <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm">
              <div className="bg-ocean-blue/10 mb-4 inline-block rounded-full p-3">
                <FileText className="text-primary-500 h-6 w-6" />
              </div>
              <h3 className="text-ocean-deep mb-2 text-lg font-bold">
                참가비 지급
              </h3>
              <p className="text-sm text-gray-600">
                사물의 의회 참가자에게는 소정의 활동비 10만원을 지급합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 지원 방법 */}
        <section className="mb-16">
          <div className="bg-primary-500 relative overflow-hidden rounded-xl p-8 text-white shadow-xl">
            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-bold">지원 방법</h2>
              <div className="mb-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">지원서 작성</h3>
                    <p>
                      아래 지원하기 버튼을 통해 구글폼 지원서를 작성해주세요.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">서류 심사</h3>
                    <p>제출된 지원서를 바탕으로 1차 서류 심사를 진행합니다.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">최종 선발</h3>
                    <p>
                      최종 선발된 참가자에게는 상세한 참가 안내와 사전 자료가
                      제공됩니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdt5BSpFw3mS9wZzWVzcqvDcWHw8BP2i8o-2r0i9R151562iw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 rounded-full bg-white px-8 py-3 font-semibold transition-all hover:bg-white/90"
                >
                  지원하기
                </a>
                <Link
                  href="/location"
                  className="rounded-full bg-white/20 px-8 py-3 font-semibold text-white transition-all hover:bg-white/30"
                >
                  장소 안내 보기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
