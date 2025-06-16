/* 예비 모임 개요 */

/* 교통편 안내 */
/* <section className="mb-16">
          <h2 className="text-ocean-deep mb-8 text-center text-3xl font-bold">
            교통편 안내
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary-500 rounded-full p-2 text-white">
                  <Train className="h-6 w-6" />
                </div>
                <h3 className="text-ocean-deep text-xl font-bold">지하철</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">분당선</span> 서울숲역 4번
                  출구에서 도보 5분
                </li>
                <li>
                  <span className="font-medium">2호선</span> 뚝섬역 8번 출구에서
                  도보 10분
                </li>
                <li>
                  <span className="font-medium">경의중앙선</span> 응봉역에서
                  도보 15분
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-ocean-blue rounded-full p-2 text-white">
                  <Bus className="h-6 w-6" />
                </div>
                <h3 className="text-ocean-deep text-xl font-bold">버스</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">간선버스</span> 121, 302, 463
                </li>
                <li>
                  <span className="font-medium">지선버스</span> 2012, 2014, 2224
                </li>
                <li>
                  <span className="font-medium">마을버스</span> 성동13
                </li>
                <li>서울숲 정류장 하차 후 도보 3분</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-ocean-deep rounded-full p-2 text-white">
                  <Car className="h-6 w-6" />
                </div>
                <h3 className="text-ocean-deep text-xl font-bold">자가용</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>내비게이션에 &apos;서울숲 컨퍼런스센터&apos; 검색</li>
                <li>
                  <span className="font-medium">주차</span> 서울숲 공영주차장
                  이용 (유료)
                </li>
                <li>
                  <span className="font-medium">주차요금</span> 최초 30분
                  1,000원, 추가 10분당 500원
                </li>
                <li className="text-sm text-red-500">
                  * 주차공간이 제한되어 있으니 가급적 대중교통 이용을
                  권장합니다.
                </li>
              </ul>
            </div>
          </div>
        </section> */

"use client";

import Link from "next/link";
import {
  MapPin,
  Info,
  Calendar,
  Clock,
  Mail,
  Users,
  Coffee,
  CheckCircle,
  Navigation,
  Building,
} from "lucide-react";
import dynamic from "next/dynamic";

const KakaoMap = dynamic(() => import("@/components/KakaoMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-200">
      <p className="text-gray-500">지도를 불러오는 중...</p>
    </div>
  ),
});

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="mb-6">
              <span className="from-ocean-deep/10 text-ocean-deep border-ocean-deep/20 inline-block rounded-full border bg-gradient-to-r to-blue-600/10 px-4 py-2 text-sm font-semibold md:text-base">
                장소 안내
              </span>
            </div>
            <h1 className="from-ocean-deep mb-6 bg-gradient-to-r to-blue-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              사물의 의회
            </h1>
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
              장소 안내
            </h2>
            <div className="from-ocean-deep mx-auto mb-8 h-1 w-32 rounded-full bg-gradient-to-r to-blue-600"></div>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600">
              인간과 비인간 존재들이 함께 모여 소통할 수 있는 공간,{" "}
              <span className="text-ocean-deep font-semibold">사물의 의회</span>
              가 열릴 장소를 안내합니다.
            </p>
          </div>
          {/* 예비 모임 장소 */}
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl md:p-12">
              <div className="from-ocean-deep/10 absolute top-0 right-0 h-40 w-40 translate-x-20 -translate-y-20 rounded-full bg-gradient-to-br to-blue-600/10"></div>
              <div className="relative">
                <div className="mb-8 flex items-center gap-4">
                  <div className="from-ocean-deep rounded-2xl bg-gradient-to-r to-blue-600 p-4 text-white">
                    <Building className="h-8 w-8" />
                  </div>
                  <h2 className="text-ocean-deep text-3xl font-bold md:text-4xl">
                    예비 모임 장소
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {/* 장소 정보 */}
                  <div className="from-ocean-deep/5 border-ocean-deep/10 rounded-2xl border bg-gradient-to-br to-blue-600/5 p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="from-ocean-deep rounded-lg bg-gradient-to-r to-blue-600 p-2 text-white">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <h3 className="text-ocean-deep text-xl font-bold">
                        위치
                      </h3>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-md">
                      <div className="text-center">
                        <div className="from-ocean-deep/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r to-blue-600/20">
                          <Navigation className="text-ocean-deep h-8 w-8" />
                        </div>
                        <h4 className="mb-2 text-lg font-bold text-gray-800">
                          서울특별시 구로구 연동로 320
                        </h4>
                        <div className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                          2025년 9월 20일 (토)
                        </div>
                        <p className="mt-3 text-sm text-gray-600">
                          성공회대학교 미가엘관
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 일정 정보 */}
                  <div className="rounded-2xl border border-blue-600/10 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-2 text-white">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <h3 className="text-ocean-deep text-xl font-bold">
                        행사 일정
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-md">
                        <div className="mb-2 flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="font-bold text-gray-800">날짜</span>
                        </div>
                        <p className="text-ocean-deep font-semibold">
                          2025년 9월 20일 (토)
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-md">
                        <div className="mb-2 flex items-center gap-3">
                          <Clock className="h-4 w-4 text-indigo-600" />
                          <span className="font-bold text-gray-800">시간</span>
                        </div>
                        <p className="text-ocean-deep mb-2 font-semibold">
                          10:00~17:00 KST
                        </p>
                        <p className="text-sm text-gray-600">
                          * 행사 30분 전부터 입장 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-ocean-deep mb-8 text-center text-3xl font-bold">
              위치 안내
            </h2>
            <div className="overflow-hidden rounded-xl bg-white shadow-lg">
              <div className="relative h-[400px] w-full">
                <KakaoMap
                  latitude={37.4875}
                  longitude={126.8261}
                  markerTitle="성공회대 미가엘관"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="text-ocean-surf h-5 w-5" />
                  <h3 className="text-ocean-deep text-lg font-bold">
                    성공회대
                  </h3>
                </div>
                <p className="mt-2 text-gray-600">
                  서울 구로구 연동로 320 ( 온수역 2번 출구에서 821m )
                </p>
                <div className="mt-4 flex gap-2">
                  <a
                    href="https://kko.kakao.com/UTs_0QkaWr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-500 hover:bg-nature-forest rounded-full px-4 py-2 text-sm font-medium text-white transition-all"
                  >
                    카카오맵으로 보기
                  </a>
                  <a
                    href="https://maps.app.goo.gl/nmHLZTNQWh6HHGqu7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-ocean-blue hover:bg-nature-forest rounded-full px-4 py-2 text-sm font-medium text-white transition-all"
                  >
                    구글맵으로 보기
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* 본회의 장소 */}
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl md:p-12">
              <div className="absolute top-0 right-0 h-40 w-40 translate-x-20 -translate-y-20 rounded-full bg-gradient-to-br from-blue-600/10 to-indigo-600/10"></div>
              <div className="relative">
                <div className="mb-8 flex items-center gap-4">
                  <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
                    <Users className="h-8 w-8" />
                  </div>
                  <h2 className="text-ocean-deep text-3xl font-bold md:text-4xl">
                    본회의 장소
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {/* 장소 정보 */}
                  <div className="rounded-2xl border border-blue-600/10 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-2 text-white">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <h3 className="text-ocean-deep text-xl font-bold">
                        위치
                      </h3>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-md">
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20">
                          <Navigation className="h-8 w-8 text-blue-600" />
                        </div>
                        <h4 className="mb-2 text-lg font-bold text-gray-800">
                          서울특별시
                        </h4>
                        <div className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                          7월 중 확정 예정
                        </div>
                        <p className="mt-3 text-sm text-gray-600">
                          구체적인 장소는 7월 중에 확정되어 안내드릴 예정입니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 일정 정보 */}
                  <div className="rounded-2xl border border-indigo-600/10 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-2 text-white">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <h3 className="text-ocean-deep text-xl font-bold">
                        행사 일정
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-md">
                        <div className="mb-2 flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-indigo-600" />
                          <span className="font-bold text-gray-800">날짜</span>
                        </div>
                        <p className="text-ocean-deep font-semibold">
                          2025년 11월 1일 ~ 2일 (토, 일)
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-md">
                        <div className="mb-2 flex items-center gap-3">
                          <Clock className="h-4 w-4 text-purple-600" />
                          <span className="font-bold text-gray-800">시간</span>
                        </div>
                        <p className="text-ocean-deep mb-2 font-semibold">
                          10:00 - 17:00 KST
                        </p>
                        <p className="text-sm text-gray-600">
                          * 행사 30분 전부터 입장 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 추가 안내사항 */}
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl md:p-12">
              <div className="from-ocean-deep/10 absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br to-blue-600/10"></div>
              <div className="relative">
                <div className="mb-8 flex items-center gap-4">
                  <div className="from-ocean-deep rounded-xl bg-gradient-to-r to-blue-600 p-3 text-white">
                    <Info className="h-6 w-6" />
                  </div>
                  <h3 className="text-ocean-deep text-2xl font-bold md:text-3xl">
                    추가 안내사항
                  </h3>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {[
                    {
                      icon: CheckCircle,
                      title: "참가자 등록",
                      description:
                        "행사 당일 안내 데스크에서 참가자 등록 후 입장해 주세요.",
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      icon: Coffee,
                      title: "식사 제공",
                      description: "중식과 다과가 제공됩니다.",
                      color: "from-amber-500 to-orange-500",
                    },
                    {
                      icon: Mail,
                      title: "문의사항",
                      description: "행사 관련 문의사항은 이메일로 연락주세요.",
                      color: "from-blue-500 to-indigo-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50 p-6 transition-all duration-300 hover:shadow-lg"
                    >
                      <div
                        className={`bg-gradient-to-r ${item.color} mb-4 w-fit rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110`}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 font-bold text-gray-800">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-2">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-800">연락처</h4>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-white p-4">
                    <p className="text-ocean-deep font-semibold">
                      samul.parliament@gmail.com
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      행사 관련 문의사항이 있으시면 언제든지 연락주세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 참가 신청 CTA */}
          <section>
            <div className="from-ocean-deep relative overflow-hidden rounded-3xl bg-gradient-to-r to-blue-700 p-8 text-white shadow-2xl md:p-12">
              {/* 배경 패턴 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 h-32 w-32 rounded-full border border-white/20"></div>
                <div className="absolute right-10 bottom-10 h-24 w-24 rounded-full border border-white/20"></div>
                <div className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full border border-white/20"></div>
              </div>

              <div className="relative text-center">
                <div className="mb-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20">
                    <Users className="h-10 w-10" />
                  </div>
                  <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                    지금 참가 신청하세요!
                  </h3>
                  <p className="mx-auto max-w-2xl text-xl leading-relaxed text-blue-100">
                    인간과 비인간이 함께하는 새로운 민주주의 실험에 참여해보세요
                  </p>
                </div>

                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdt5BSpFw3mS9wZzWVzcqvDcWHw8BP2i8o-2r0i9R151562iw/viewform"
                  className="group text-ocean-deep inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-bold shadow-lg transition-all hover:scale-105 hover:bg-blue-50"
                >
                  <CheckCircle className="h-6 w-6" />
                  참가 신청하기
                  <div className="bg-ocean-deep h-2 w-2 rounded-full transition-transform duration-300 group-hover:translate-x-1"></div>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
