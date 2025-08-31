"use client";
import Link from "next/link";
import {
  Users,
  Clock,
  FileText,
  MessageCircle,
  Calendar,
  Award,
  Target,
  CheckCircle,
  ArrowRight,
  Phone,
  MapPin,
} from "lucide-react";

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="mb-6">
              <span className="from-ocean-deep/10 text-ocean-deep border-ocean-deep/20 inline-block rounded-full border bg-gradient-to-r to-blue-600/10 px-4 py-2 text-sm font-semibold md:text-base">
                참가자 모집 중
              </span>
            </div>
            <h1 className="from-ocean-deep mb-6 bg-gradient-to-r to-blue-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              2025 사물의 의회
            </h1>
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
              참가자 모집
            </h2>
            <div className="from-ocean-deep mx-auto mb-8 h-1 w-32 rounded-full bg-gradient-to-r to-blue-600"></div>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600">
              인간과 비인간 존재들이 함께 모여 기후위기 시대의 공존 방안을
              모색하는{" "}
              <span className="text-ocean-deep font-semibold">
                새로운 형태의 의회
              </span>
              에 여러분을 초대합니다.
            </p>
          </div>

          {/* 모집 개요 */}
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl md:p-12">
              <div className="from-ocean-deep/10 absolute top-0 right-0 h-40 w-40 translate-x-20 -translate-y-20 rounded-full bg-gradient-to-br to-blue-600/10"></div>
              <div className="relative">
                <div className="mb-8 flex items-center gap-4">
                  <div className="from-ocean-deep rounded-2xl bg-gradient-to-r to-blue-600 p-4 text-white">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <h2 className="text-ocean-deep text-3xl font-bold md:text-4xl">
                    모집 개요
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {/* 행사 일정 */}
                  <div className="from-ocean-deep/5 border-ocean-deep/10 rounded-2xl border bg-gradient-to-br to-blue-600/5 p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="from-ocean-deep rounded-lg bg-gradient-to-r to-blue-600 p-2 text-white">
                        <Clock className="h-5 w-5" />
                      </div>
                      <h3 className="text-ocean-deep text-xl font-bold">
                        행사 일정
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-md">
                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-red-100 p-2">
                            <Calendar className="h-4 w-4 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <p className="font-bold text-gray-800">
                                예비 모임
                              </p>
                              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                                필수 참여
                              </span>
                            </div>
                            <p className="text-ocean-deep mb-1 font-semibold">
                              2025년 9월 20일 (토)
                            </p>
                            <p className="mb-2 text-sm text-gray-600">
                              10:00 - 17:00 KST
                            </p>
                            <p className="text-sm leading-relaxed text-gray-600">
                              정치적 대표로서의 역할 교육과 토론 준비 워크숍이
                              진행됩니다.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-md">
                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-blue-100 p-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="mb-2 font-bold text-gray-800">
                              본 회의
                            </p>
                            <p className="text-ocean-deep mb-1 font-semibold">
                              2025년 11월 1일 ~ 2일 (토, 일)
                            </p>
                            <p className="text-sm text-gray-600">
                              10:00 - 17:00 KST
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 모집 일정 */}
                  <div className="rounded-2xl border border-blue-600/10 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-2 text-white">
                        <Target className="h-5 w-5" />
                      </div>
                      <h3 className="text-ocean-deep text-xl font-bold">
                        모집 일정
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          icon: Clock,
                          title: "모집 기간",
                          content: "2025년 6월 17일 ~ 7월 31일",
                          color: "blue",
                        },
                        {
                          icon: FileText,
                          title: "선정 과정",
                          content: "서류 심사 후 전화 인터뷰 예정",
                          color: "indigo",
                        },
                        {
                          icon: MessageCircle,
                          title: "참가자 선정 결과 발표",
                          content: "2025년 8월 31일",
                          color: "purple",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-slate-100 bg-white p-4 shadow-md"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 bg-${item.color}-100 rounded-lg`}
                            >
                              <item.icon
                                className={`h-4 w-4 text-${item.color}-600`}
                              />
                            </div>
                            <div>
                              <p className="mb-1 font-bold text-gray-800">
                                {item.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 지원 자격 */}
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl md:p-12">
              <div className="from-ocean-deep/10 absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br to-blue-600/10"></div>
              <div className="relative">
                <div className="mb-8 flex items-center gap-4">
                  <div className="from-ocean-deep rounded-xl bg-gradient-to-r to-blue-600 p-3 text-white">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-ocean-deep text-2xl font-bold md:text-3xl">
                    지원 자격
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    "기후위기와 인간중심주의에 대한 관심이 있는 모든 분",
                    "비인간 존재의 권리와 발언권에 대해 고민해보신 분",
                    "2025년 9월~11월 예정된 예비 모임과 본 회의에 모두 참석 가능한 분",
                    "특정 분야의 전문 지식이 없어도 본 프로젝트에 관심과 열정이 있는 분",
                    "고1 이상 또는 만 15세 이상 (학교 밖 청소년 포함)",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="from-ocean-deep/5 border-ocean-deep/10 flex items-start gap-3 rounded-xl border bg-gradient-to-r to-blue-600/5 p-4"
                    >
                      <div className="from-ocean-deep mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r to-blue-600"></div>
                      <p className="leading-relaxed text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 참여 혜택 */}
          <section className="mb-16">
            <div className="mb-12 text-center">
              <div className="mb-6 flex items-center justify-center gap-4">
                <div className="from-ocean-deep rounded-2xl bg-gradient-to-r to-blue-600 p-4 text-white">
                  <Award className="h-8 w-8" />
                </div>
                <h2 className="text-ocean-deep text-3xl font-bold md:text-4xl">
                  참여 혜택
                </h2>
              </div>
              <div className="from-ocean-deep mx-auto h-1 w-24 rounded-full bg-gradient-to-r to-blue-600"></div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: MessageCircle,
                  title: "목소리를 낼 기회",
                  description:
                    "인간중심주의를 넘어 비인간 존재들과의 공존에 대한 여러분의 생각을 표현하고 논의할 수 있는 장을 제공합니다.",
                  gradient: "from-ocean-deep to-blue-600",
                },
                {
                  icon: Users,
                  title: "네트워킹",
                  description:
                    "다양한 분야의 전문가, 활동가, 시민들과 교류하고 네트워크를 형성할 수 있는 자료를 제공합니다.",
                  gradient: "from-blue-600 to-indigo-600",
                },
                {
                  icon: FileText,
                  title: "참가비 지급",
                  description:
                    "사물의 의회 참가자에게는 소정의 활동비 10만원을 지급합니다.",
                  gradient: "from-indigo-600 to-purple-600",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="from-ocean-deep/5 absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br to-blue-600/5"></div>
                  <div className="relative">
                    <div
                      className={`bg-gradient-to-r ${benefit.gradient} mb-6 inline-block rounded-2xl p-4 text-white transition-transform duration-300 group-hover:scale-110`}
                    >
                      <benefit.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-ocean-deep mb-4 text-xl font-bold transition-colors duration-300 group-hover:text-blue-600">
                      {benefit.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 지원 방법 */}
          <section className="mb-16">
            <div className="from-ocean-deep relative overflow-hidden rounded-3xl bg-gradient-to-r to-blue-700 p-8 text-white shadow-2xl md:p-12">
              {/* 배경 패턴 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 h-32 w-32 rounded-full border border-white/20"></div>
                <div className="absolute right-10 bottom-10 h-24 w-24 rounded-full border border-white/20"></div>
                <div className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full border border-white/20"></div>
              </div>

              <div className="relative">
                <div className="mb-8 flex items-center gap-4">
                  <div className="rounded-2xl bg-white/20 p-4">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl font-bold md:text-4xl">지원 방법</h2>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                  {[
                    {
                      step: 1,
                      title: "지원서 작성",
                      description:
                        "아래 지원하기 버튼을 통해 구글폼 지원서를 작성해주세요.",
                      icon: FileText,
                    },
                    {
                      step: 2,
                      title: "서류 심사 및 전화 인터뷰",
                      description:
                        "제출해 주신 지원서를 검토한 후, 전화 인터뷰를 진행할 예정입니다.",
                      icon: Phone,
                    },
                    {
                      step: 3,
                      title: "최종 선정",
                      description:
                        "최종 선정된 참가자에게는 상세한 참가 안내와 사전 자료가 제공됩니다.",
                      icon: CheckCircle,
                    },
                  ].map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-4 rounded-2xl bg-white/20 p-6 backdrop-blur-sm">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/30">
                          <span className="text-2xl font-bold">
                            {step.step}
                          </span>
                        </div>
                        <step.icon className="mx-auto mb-3 h-8 w-8 text-blue-100" />
                        <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-blue-100">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      alert("2025년 사물의 의회 참가자 모집이 마감되었습니다.");
                    }}
                    className="group text-ocean-deep flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold shadow-lg transition-all hover:scale-105 hover:bg-blue-50"
                  >
                    지원마감
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <Link
                    href="/location"
                    className="group flex items-center gap-2 rounded-2xl bg-white/20 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/30"
                  >
                    <MapPin className="h-5 w-5" />
                    장소 안내 보기
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
