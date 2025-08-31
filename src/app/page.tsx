"use client";

import { openExternalLink } from "@/util/url";
import { Button } from "@/components/Button";
import Image from "next/image";
import Logo from "@/components/Logo";
import { Users, Award, ArrowRight, Info } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* 히어로 배너 */}
        <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden px-4 md:h-[600px]">
          {/* 배경 장식 요소 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="from-ocean-deep/10 absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br to-blue-600/10 blur-3xl"></div>
            <div className="to-ocean-deep/10 absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-500/10 blur-3xl"></div>
          </div>

          <div className="animate-slide-up relative z-10">
            <div className="group hover:animate-wiggle flex flex-col gap-3 text-center md:gap-6">
              <h2 className="text-4xl font-bold text-gray-800 md:text-6xl">
                사물의 의회
              </h2>
              <h1 className="group-hover:text-primary-400 from-ocean-deep transform bg-gradient-to-r to-blue-600 bg-clip-text text-5xl font-[900] text-transparent transition-all duration-300 md:text-8xl">
                인간과 비인간
              </h1>
              <h2 className="mx-auto max-w-4xl text-xl leading-relaxed font-medium text-gray-700 md:text-4xl">
                함께 만드는 새로운{" "}
                <span className="text-ocean-deep font-bold">기후 민주주의</span>
              </h2>
            </div>
          </div>
        </section>

        {/* 포스터 섹션 */}

        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* 첫 번째 카드 - Info 페이지로 이동 */}
              <Link href="/info" className="group">
                <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="from-ocean-deep/10 flex aspect-[3/4] flex-col items-center justify-center bg-gradient-to-br to-blue-600/10 p-8">
                    <div className="from-ocean-deep mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r to-blue-600 transition-transform duration-300 group-hover:scale-110">
                      <Info className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">
                      프로젝트 소개
                    </h3>
                    <p className="mb-6 text-center leading-relaxed text-gray-600">
                      사물의 의회 프로젝트에 대한 자세한 정보를 확인해보세요
                    </p>
                    <div className="text-ocean-deep flex items-center gap-2 font-semibold transition-all duration-300 group-hover:gap-3">
                      <span>자세히 보기</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="from-ocean-deep/20 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
              </Link>

              {/* 두 번째 카드 - 포스터 이미지 */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="from-ocean-deep/5 flex aspect-[3/4] items-center justify-center bg-gradient-to-br to-blue-600/5">
                  <Image
                    src="/images/poster_1.png"
                    alt="사물의 의회 포스터"
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>

              {/* 세 번째 카드 - 참가자 모집 페이지로 이동 */}
              <Link href="/recruitment" className="group">
                <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="flex aspect-[3/4] flex-col items-center justify-center bg-gradient-to-br from-blue-600/10 to-indigo-600/10 p-8">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 transition-transform duration-300 group-hover:scale-110">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">
                      참가자 모집
                    </h3>
                    <p className="mb-6 text-center leading-relaxed text-gray-600">
                      2025 사물의 의회에 참여할 참가자를 모집하고 있습니다
                    </p>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 group-hover:gap-3">
                      <span>지원하기</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 서브 배너 */}
        <section className="relative py-16 md:py-20">
          <div className="relative">
            <div className="from-ocean-deep relative flex min-h-[320px] items-center justify-center bg-gradient-to-r to-blue-700 px-4 text-white md:min-h-[400px]">
              {/* 배경 패턴 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 h-32 w-32 rounded-full border border-white/20"></div>
                <div className="absolute right-10 bottom-10 h-24 w-24 rounded-full border border-white/20"></div>
                <div className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full border border-white/20"></div>
              </div>

              <div className="animate-slide-up relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Users className="text-ocean-surf h-6 w-6" />
                  <h3 className="text-ocean-surf text-lg font-semibold md:text-xl">
                    함께 고민하는 시간
                  </h3>
                </div>
                <h2 className="text-2xl leading-tight font-bold md:text-5xl">
                  비인간 존재들의{" "}
                  <span className="text-ocean-surf font-black">목소리</span>를{" "}
                  <br className="hidden md:block" />
                  <span className="text-ocean-surf font-black">대변</span>하고
                  싶다면?
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-blue-100 md:text-xl">
                  새로운 기후 민주주의를 함께 만들어가는 여정에 참여해보세요
                </p>
              </div>

              {/* 참가버튼 */}
              <Button
                type="button"
                onClick={() =>
                  openExternalLink(
                    "https://docs.google.com/forms/d/e/1FAIpQLSdt5BSpFw3mS9wZzWVzcqvDcWHw8BP2i8o-2r0i9R151562iw/viewform",
                  )
                }
                className="animate-rotate-in from-ocean-surf hover:from-ocean-surf/90 absolute right-0 bottom-[-50px] left-0 mx-auto h-[100px] w-[100px] bg-gradient-to-r to-blue-400 p-0 shadow-2xl transition-all duration-300 hover:scale-110 hover:to-blue-400/90 md:bottom-[-60px] md:h-[120px] md:w-[120px]"
              >
                <div className="text-center">
                  <p className="text-sm font-bold text-nowrap md:text-base">
                    지원하기
                  </p>
                </div>
              </Button>
            </div>
          </div>
        </section>

        {/* 주최 섹션 */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="mb-6 inline-flex items-center gap-3">
                <div className="from-ocean-deep rounded-lg bg-gradient-to-r to-blue-600 p-2">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
                  주최
                </h1>
              </div>
              <div className="from-ocean-deep mx-auto h-1 w-24 rounded-full bg-gradient-to-r to-blue-600"></div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-lg md:p-12">
              <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
                <div className="group transition-transform duration-300 hover:scale-105">
                  <Image
                    src="/images/주최_기후몸연구소.jpg"
                    alt="주최_기후몸연구소"
                    className="h-[80px] w-[200px] object-contain md:h-[100px] md:w-[250px]"
                    width={250}
                    height={100}
                  />
                </div>
                <div className="hidden h-16 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent md:block"></div>
                <div className="group transition-transform duration-300 hover:scale-105">
                  <Logo className="flex text-xl md:text-3xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 후원 섹션 */}
        <section className="bg-gradient-to-br from-indigo-50 to-blue-50 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="mb-6 inline-flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
                  후원
                </h1>
              </div>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg">
              <div className="relative overflow-hidden py-8">
                {/* 양쪽 그라데이션 효과 */}
                <div className="absolute top-0 left-0 z-10 h-full w-1/6 bg-gradient-to-r from-white to-transparent" />
                <div className="absolute top-0 right-0 z-10 h-full w-1/6 bg-gradient-to-l from-white to-transparent" />

                <div className="w-full overflow-hidden">
                  <div
                    className="flex items-center"
                    style={{
                      animation: "marquee-scroll 12s linear infinite",
                      width: "max-content",
                    }}
                  >
                    {/* 첫 번째 세트 */}
                    <div className="flex items-center gap-12 pr-12">
                      <div className="group transition-transform duration-300 hover:scale-105">
                        <Image
                          src="/images/후원_기후변화행동연구소.png"
                          alt="후원_기후변화행동연구소"
                          className="h-[80px] w-[200px] object-contain"
                          width={200}
                          height={80}
                        />
                      </div>
                      <div className="group transition-transform duration-300 hover:scale-105">
                        <Image
                          src="/images/후원_우리학교.jpg"
                          alt="후원_우리학교"
                          className="h-[80px] w-[200px] object-contain"
                          width={200}
                          height={80}
                        />
                      </div>
                      <div className="group transition-transform duration-300 hover:scale-105">
                        <Image
                          src="/images/후원_참여연대.jpg"
                          alt="후원_참여연대"
                          className="h-[80px] w-[200px] object-contain"
                          width={200}
                          height={80}
                        />
                      </div>
                      <div className="group flex h-[80px] w-[200px] flex-col items-center justify-center text-xl font-bold text-gray-800 transition-transform duration-300 hover:scale-105">
                        <p>가치를 꿈꾸는</p>
                        <p>과학교사모임</p>
                      </div>
                      <div className="group flex h-[80px] w-[200px] flex-col items-center justify-center text-xl font-bold text-gray-800 transition-transform duration-300 hover:scale-105">
                        <p>신유물론연구회</p>
                      </div>
                      <div className="group flex h-[80px] w-[200px] flex-col items-center justify-center text-center text-lg font-bold text-gray-800 transition-transform duration-300 hover:scale-105">
                        성공회대 <br />
                        농림생태환경연구소
                      </div>
                    </div>

                    {/* 두 번째 세트 (반복) */}
                    <div className="flex items-center gap-12 pr-12">
                      <div className="group transition-transform duration-300 hover:scale-105">
                        <Image
                          src="/images/후원_기후변화행동연구소.png"
                          alt="후원_기후변화행동연구소"
                          className="h-[80px] w-[200px] object-contain"
                          width={200}
                          height={80}
                        />
                      </div>
                      <div className="group transition-transform duration-300 hover:scale-105">
                        <Image
                          src="/images/후원_우리학교.jpg"
                          alt="후원_우리학교"
                          className="h-[80px] w-[200px] object-contain"
                          width={200}
                          height={80}
                        />
                      </div>
                      <div className="group transition-transform duration-300 hover:scale-105">
                        <Image
                          src="/images/후원_참여연대.jpg"
                          alt="후원_참여연대"
                          className="h-[80px] w-[200px] object-contain"
                          width={200}
                          height={80}
                        />
                      </div>
                      <div className="group flex h-[80px] w-[200px] flex-col items-center justify-center text-xl font-bold text-gray-800 transition-transform duration-300 hover:scale-105">
                        <p>가치를 꿈꾸는</p>
                        <p>과학교사모임</p>
                      </div>
                      <div className="group flex h-[80px] w-[200px] flex-col items-center justify-center text-xl font-bold text-gray-800 transition-transform duration-300 hover:scale-105">
                        <p>신유물론연구회</p>
                      </div>
                      <div className="group flex h-[80px] w-[200px] flex-col items-center justify-center text-center text-lg font-bold text-gray-800 transition-transform duration-300 hover:scale-105">
                        성공회대 <br />
                        농림생태환경연구소
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
