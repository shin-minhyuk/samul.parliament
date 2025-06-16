"use client";

import { User, Crown, Settings, Users } from "lucide-react";

export default function OrganizationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="from-ocean-deep mb-4 bg-gradient-to-r to-blue-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              조직 위원회
            </h1>
            <div className="from-ocean-deep mx-auto h-1 w-24 rounded-full bg-gradient-to-r to-blue-600"></div>
          </div>

          {/* Leadership Section */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* 조직위원장 */}
            <div className="lg:col-span-3">
              <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="from-ocean-deep/10 absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br to-blue-600/10"></div>
                <div className="relative">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="from-ocean-deep rounded-xl bg-gradient-to-r to-blue-600 p-3 text-white">
                      <Crown className="h-6 w-6" />
                    </div>
                    <h3 className="text-ocean-deep text-2xl font-bold">
                      조직위원장
                    </h3>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="from-ocean-deep/20 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br to-blue-600/20">
                      <User className="text-ocean-deep h-10 w-10" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-xl font-bold text-gray-900">
                        김환석
                      </h4>
                      <p className="text-ocean-deep mb-3 font-medium">
                        국민대학교 사회학과 명예교수
                      </p>
                      <p className="leading-relaxed text-gray-600">
                        한국과학기술학회와 한국이론사회학회 회장을 지냈다.
                        『브뤼노 라투르』를 썼다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 집행위원장 */}
            <div className="lg:col-span-2">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="to-ocean-deep/10 absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br from-blue-600/10"></div>
                <div className="relative flex h-full flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="to-ocean-deep rounded-lg bg-gradient-to-r from-blue-600 p-2 text-white">
                      <Settings className="h-5 w-5" />
                    </div>
                    <h3 className="text-ocean-deep text-xl font-bold">
                      집행위원장
                    </h3>
                  </div>
                  <div className="flex flex-1 items-start gap-4">
                    <div className="to-ocean-deep/20 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20">
                      <User className="text-ocean-deep h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-lg font-bold text-gray-900">
                        김태우
                      </h4>
                      <p className="text-ocean-deep mb-2 text-sm font-medium">
                        인류학자. 경희대학교 기후-몸연구소 소장이자 한의대 교수
                      </p>
                      <p className="text-sm leading-relaxed text-gray-600">
                        『몸이 기후다: 존재론적 인류학의 기후 실천』을 썼다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 실무간사 */}
            <div className="lg:col-span-1">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="to-ocean-deep/10 absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br from-blue-600/10"></div>
                <div className="relative flex h-full flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="to-ocean-deep rounded-lg bg-gradient-to-r from-blue-600 p-2 text-white">
                      <Settings className="h-5 w-5" />
                    </div>
                    <h3 className="text-ocean-deep text-xl font-bold">
                      실무간사
                    </h3>
                  </div>
                  <div className="flex flex-1 items-start gap-4">
                    <div className="to-ocean-deep/20 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20">
                      <User className="text-ocean-deep h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-lg font-bold text-gray-900">
                        재하
                      </h4>
                      <p className="text-ocean-deep mb-2 text-sm font-medium">
                        경희대학교 한의과대학 석사 수료
                      </p>
                      <p className="text-sm leading-relaxed text-gray-600">
                        경희대학교 기후-몸연구소 연구원. 한의학을 바탕으로 몸,
                        마음, 세계의 연결망에 대해 연구하고 있다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 조직 위원 섹션 */}
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="from-ocean-deep rounded-xl bg-gradient-to-r to-blue-600 p-3 text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-ocean-deep text-3xl font-bold">조직 위원</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "김명심",
                  title: "",
                  description:
                    "과학기술학과 동물-인간 사회를 연구하고 있다. 덕성여대, 경희대 등에서 강의 중이다.",
                },
                {
                  name: "김병수",
                  title: "성공회대학교 열림교양대학 교수",
                  description: "농림생태환경연구소 소장을 맡고 있다.",
                },
                {
                  name: "김지연",
                  title:
                    "고려대학교 과학기술학연구소 연구교수, 과학사회학 박사",
                  description: "『AI와 노동, 관계론적 접근』을 썼다.",
                },
                {
                  name: "김주옥",
                  title: "서울과학기술대학교 조형대학 교수",
                  description:
                    "미술비평과 전시기획을 기반으로 인공지능 시대의 탈경계 예술 확장에 대해 연구하고 있다.",
                },
                {
                  name: "김추령",
                  title: "성공회대 농림생태환경 연구소 연구교수",
                  description:
                    "34년간 과학교사로 재직, 청소년을 위한 기후변화 관련 저서 집필 , 기후변화 교육 프로그램을 연구 개발 적용하고 있다.",
                },
                {
                  name: "남종영",
                  title: "인간과 동물의 관계에 관심 있는 논픽션 작가",
                  description: "『동물권력』 외 여러 권을 썼다.",
                },
                {
                  name: "박병상",
                  title:
                    "인천도시생태・환경연구소 소장이자 인천환경운동연합 공동대표",
                  description:
                    "『어쩌면 가장 위험한 이야기』 외 여러 권을 썼다.",
                },
                {
                  name: "박진희",
                  title: "동국대학교 교수",
                  description:
                    "기후변화 대응을 위한 재생에너지 정책을 연구하고 있다.",
                },
                {
                  name: "조천호",
                  title: "대기과학자",
                  description: "국립기상과학원에서 30년 동안 근무했다.",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <div className="from-ocean-deep/5 absolute top-0 right-0 h-16 w-16 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br to-blue-600/5"></div>
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="from-ocean-deep/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br to-blue-600/10 transition-transform duration-300 group-hover:scale-110">
                        <User className="text-ocean-deep h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="group-hover:text-ocean-deep mb-1 text-lg font-bold text-gray-900 transition-colors duration-300">
                          {member.name}
                        </h4>
                        {member.title && (
                          <p className="text-ocean-deep mb-2 text-sm leading-snug font-medium">
                            {member.title}
                          </p>
                        )}
                        <p className="text-sm leading-relaxed text-gray-600">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
