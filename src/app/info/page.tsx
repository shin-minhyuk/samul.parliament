"use client";

import {
  Globe,
  Users,
  Calendar,
  Target,
  Lightbulb,
  MessageSquare,
  Clock,
  Leaf,
  TreePine,
  Waves,
  Zap,
} from "lucide-react";
import type React from "react";

const MarkedText = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="from-ocean-deep/20 text-ocean-deep border-ocean-deep/10 rounded-lg border bg-gradient-to-r to-blue-600/20 px-2 py-1 font-semibold">
      {children}
    </span>
  );
};

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="from-ocean-deep mb-6 bg-gradient-to-r to-blue-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              2025 사물의 의회 프로젝트
            </h1>
            <div className="from-ocean-deep mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r to-blue-600"></div>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
              인간과 비인간이 함께하는 새로운 기후 민주주의의 실험
            </p>
          </div>

          {/* 사물의 의회란? */}
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl md:p-12">
              <div className="from-ocean-deep/10 absolute top-0 right-0 h-40 w-40 translate-x-20 -translate-y-20 rounded-full bg-gradient-to-br to-blue-600/10"></div>
              <div className="relative">
                <div className="mb-8 flex items-center gap-4">
                  <div className="from-ocean-deep rounded-2xl bg-gradient-to-r to-blue-600 p-4 text-white">
                    <Lightbulb className="h-8 w-8" />
                  </div>
                  <h2 className="text-ocean-deep text-3xl font-bold md:text-4xl">
                    사물의 의회란?
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700">
                    사물의 의회(Parliament of Things)는 프랑스 과학기술학자{" "}
                    브뤼노 라투르가 제안한 개념으로,
                    <MarkedText>
                      인간과 비인간 존재가 함께 정치적 목소리를 내는
                      탈인간중심적 민주주의 모델 입니다.
                    </MarkedText>{" "}
                    인간만이 아닌, 대기·동물·기술·산림·해양 등 다양한 비인간
                    존재들의 권리와 이해관계도 정치적으로 대표되어야 한다는
                    생각에서 출발했습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 프로젝트 목적과 필요성 */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* 프로젝트의 목적 */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="to-ocean-deep/10 absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-blue-600/10"></div>
              <div className="relative">
                <div className="mb-6 flex items-center gap-4">
                  <div className="to-ocean-deep rounded-xl bg-gradient-to-r from-blue-600 p-3 text-white transition-transform duration-300 group-hover:scale-110">
                    <Target className="h-6 w-6" />
                  </div>
                  <h2 className="text-ocean-deep text-2xl font-bold md:text-3xl">
                    프로젝트의 목적
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="leading-relaxed text-gray-700">
                    인간 중심의 기존 법과 제도의 한계를 넘어, 기후위기에 대응할
                    수 있는 탈인간중심적 법 규범을 모색 합니다.{" "}
                    <MarkedText>국내 최초로 사물의 의회를 개최</MarkedText>
                    하여{" "}
                    <MarkedText>기후민주주의의 새로운 가능성을 실험</MarkedText>
                    합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 프로젝트의 필요성 */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="from-ocean-deep/10 absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br to-blue-600/10"></div>
              <div className="relative">
                <div className="mb-6 flex items-center gap-4">
                  <div className="from-ocean-deep rounded-xl bg-gradient-to-r to-blue-600 p-3 text-white transition-transform duration-300 group-hover:scale-110">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h2 className="text-ocean-deep text-2xl font-bold md:text-3xl">
                    프로젝트의 필요성
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="leading-relaxed text-gray-700">
                    <MarkedText>
                      기후위기는 인간 중심적 근대문명의 필연적 결과
                    </MarkedText>
                    입니다. 인간만이 주체이고, 자연은 대상이라는 근대적
                    사고방식은 대기, 산림, 해양 등 비인간 존재들을 착취와 오용의
                    대상으로 삼아왔습니다. 사물의 의회는 인간뿐 아니라 비인간
                    존재들도 정치적으로 대표되는 새로운 민주주의 공간을
                    지향합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 본회의 소개 */}
          <section className="mb-16">
            <div className="mb-12 text-center">
              <div className="mb-6 flex items-center justify-center gap-4">
                <div className="from-ocean-deep rounded-2xl bg-gradient-to-r to-blue-600 p-4 text-white">
                  <Users className="h-8 w-8" />
                </div>
                <h2 className="text-ocean-deep text-3xl font-bold md:text-4xl">
                  본회의 소개
                </h2>
              </div>
              <div className="from-ocean-deep mx-auto h-1 w-24 rounded-full bg-gradient-to-r to-blue-600"></div>
            </div>

            {/* 참여 그룹 */}
            <div className="mb-12">
              <h3 className="text-ocean-deep mb-8 text-center text-2xl font-bold">
                참여 그룹
              </h3>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* 인간 그룹 */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-xl transition-all hover:shadow-2xl">
                  <div className="from-ocean-deep/10 absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br to-blue-600/10"></div>
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="from-ocean-deep rounded-2xl bg-gradient-to-r to-blue-600 p-3 text-white transition-transform duration-300 group-hover:scale-110">
                        <Users className="h-8 w-8" />
                      </div>
                      <h3 className="text-ocean-deep text-2xl font-bold">
                        인간 그룹 대변인
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        "기업가",
                        "노동자",
                        "농민",
                        "미래세대",
                        "사회적 약자 (빈민, 노인 등)",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="from-ocean-deep/5 flex items-center gap-3 rounded-lg bg-gradient-to-r to-blue-600/5 p-3"
                        >
                          <div className="from-ocean-deep h-2 w-2 rounded-full bg-gradient-to-r to-blue-600"></div>
                          <span className="font-medium text-gray-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 비인간 그룹 */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-xl transition-all hover:shadow-2xl">
                  <div className="to-ocean-deep/10 absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br from-blue-600/10"></div>
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="to-ocean-deep rounded-2xl bg-gradient-to-r from-blue-600 p-3 text-white transition-transform duration-300 group-hover:scale-110">
                        <Globe className="h-8 w-8" />
                      </div>
                      <h3 className="text-ocean-deep text-2xl font-bold">
                        비인간 그룹 대변인
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { name: "대기", icon: Waves },
                        { name: "산림", icon: TreePine },
                        { name: "해양", icon: Waves },
                        { name: "동물", icon: Leaf },
                        { name: "기술 (AI, 지구공학)", icon: Zap },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="to-ocean-deep/5 flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-600/5 p-3"
                        >
                          <item.icon className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-gray-700">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="rounded-2xl border border-slate-100 bg-white p-6 text-lg text-gray-600 shadow-lg">
                  각 그룹은 당사자, 과학자, 예술가, 활동가, 시민 등{" "}
                  <span className="text-ocean-deep font-bold">10명</span>으로
                  구성됩니다.
                </p>
              </div>
            </div>

            {/* 주요 토론 주제 */}
            <div className="mb-12">
              <h3 className="text-ocean-deep mb-8 text-center text-2xl font-bold">
                주요 토론 주제
              </h3>
              <div className="space-y-6">
                {[
                  {
                    number: 1,
                    question:
                      "기후위기에 올바로 대응하기 위해 각 이해관계자 그룹은 법에 어떤 내용이 담기기를 원하시나요?",
                    example:
                      "(각 그룹당 최대 5개 요구안을 도출할 수 있습니다.)",
                    gradient: "from-ocean-deep to-blue-600",
                  },
                  {
                    number: 2,
                    question:
                      "위와 같은 요구안들을 기후법에 담으려면 다음 중 어떠한 법적 변화가 필요하다고 생각하시나요?",
                    example: "(요구안별로 각각 표시해주세요.)",
                    gradient: "from-blue-600 to-indigo-600",
                    subItems: [
                      "1) 기존 법률에서 수용이 가능",
                      "2) 기존 법률의 개정이 필요",
                      "3) 새로운 법률의 제정이 필요",
                      "4) 헌법의 개정이 필요",
                    ],
                  },
                ].map((topic, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
                  >
                    <div className="from-ocean-deep/5 absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br to-blue-600/5"></div>
                    <div className="relative flex items-start gap-6">
                      <div
                        className={`bg-gradient-to-r ${topic.gradient} flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110`}
                      >
                        {topic.number}
                      </div>
                      <div className="flex-1">
                        <p className="mb-3 text-lg leading-relaxed font-semibold text-gray-800">
                          {topic.question}
                        </p>
                        {topic.example && (
                          <p className="text-ocean-deep from-ocean-deep/10 border-ocean-deep/20 rounded-lg border bg-gradient-to-r to-blue-600/10 p-3 font-medium">
                            {topic.example}
                          </p>
                        )}
                        {topic.subItems && (
                          <div className="mt-4 space-y-2">
                            {topic.subItems.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                              >
                                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                <span className="font-medium text-gray-700">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 시간표 */}
            <div>
              <div className="mb-8 flex items-center justify-center gap-4">
                <div className="from-ocean-deep rounded-xl bg-gradient-to-r to-blue-600 p-3 text-white">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-ocean-deep text-2xl font-bold">시간표</h3>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* 1일차 */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="from-ocean-deep/10 absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br to-blue-600/10"></div>
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="from-ocean-deep rounded-lg bg-gradient-to-r to-blue-600 p-2 text-white">
                        <Clock className="h-5 w-5" />
                      </div>
                      <h3 className="text-ocean-deep text-xl font-bold">
                        1일차 (2025.11.01)
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        { time: "10:00~11:00", activity: "그룹별 1차 숙의" },
                        {
                          time: "11:00~12:00",
                          activity: "그룹별 발표 (10개 그룹, 각 6분)",
                        },
                        { time: "12:00~13:00", activity: "점심" },
                        { time: "13:00~14:00", activity: "휴식 및 문화행사" },
                        { time: "14:00~16:00", activity: "1차 전체 토론" },
                        {
                          time: "16:00~17:00",
                          activity: "질의응답 및 1일차 평가",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="from-ocean-deep/5 flex items-start gap-4 rounded-lg bg-gradient-to-r to-blue-600/5 p-3"
                        >
                          <div className="from-ocean-deep rounded-lg bg-gradient-to-r to-blue-600 px-3 py-1 text-sm font-semibold whitespace-nowrap text-white">
                            {item.time}
                          </div>
                          <div className="font-medium text-gray-700">
                            {item.activity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2일차 */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="to-ocean-deep/10 absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br from-blue-600/10"></div>
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="to-ocean-deep rounded-lg bg-gradient-to-r from-blue-600 p-2 text-white">
                        <Clock className="h-5 w-5" />
                      </div>
                      <h3 className="text-ocean-deep text-xl font-bold">
                        2일차 (2025.11.02)
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        { time: "10:00~11:00", activity: "그룹별 2차 숙의" },
                        {
                          time: "11:00~12:00",
                          activity: "그룹별 발표 (10개 그룹, 각 6분)",
                        },
                        { time: "12:00~13:00", activity: "점심" },
                        { time: "13:00~14:00", activity: "휴식 및 문화행사" },
                        { time: "14:00~15:00", activity: "2차 전체 토론" },
                        {
                          time: "15:00~16:00",
                          activity: "그룹별 결론 작성 및 취합",
                        },
                        { time: "16:00~17:00", activity: "전체결론 발표" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="to-ocean-deep/5 flex items-start gap-4 rounded-lg bg-gradient-to-r from-blue-600/5 p-3"
                        >
                          <div className="to-ocean-deep rounded-lg bg-gradient-to-r from-blue-600 px-3 py-1 text-sm font-semibold whitespace-nowrap text-white">
                            {item.time}
                          </div>
                          <div className="font-medium text-gray-700">
                            {item.activity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-center text-sm text-gray-500">
                ※ 위 일정계획은 추후의 사정에 따라 수정될 수 있습니다.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
