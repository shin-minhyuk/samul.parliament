import React from "react";

export default function OrganizationPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-ocean-deep mb-8 text-4xl font-bold md:text-5xl">
          조직 위원회
        </h1>

        <section className="mb-12">
          {/* 조직도 다이어그램 */}
          {/* <div className="mb-10 overflow-hidden rounded-xl bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="bg-ocean-deep mb-6 w-64 rounded-lg p-4 text-center text-white">
                <h3 className="text-xl font-bold">조직위원장</h3>
                <p>김환석 (국민대 명예교수)</p>
              </div>

              <div className="bg-ocean-deep mb-6 h-10 w-1"></div>

              <div className="bg-primary-600 mb-6 w-64 rounded-lg p-4 text-center text-white">
                <h3 className="text-xl font-bold">집행위원장</h3>
                <p>김태우 (경희대 교수)</p>
              </div>

              <div className="bg-ocean-deep mb-6 h-10 w-1"></div>

              <div className="bg-primary-500 mb-6 w-full rounded-lg p-4 text-center text-white">
                <h3 className="text-lg font-bold">조직 위원</h3>
              </div>
            </div>
          </div> */}

          {/* 상세 구성원 */}
          <div className="mb-10">
            <div className="bg-ocean-deep/5 mb-6 rounded-lg p-5 shadow-md">
              <h3 className="text-ocean-deep mb-4 text-xl font-bold">
                조직위원장
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">김환석</span>
                    <span className="text-sm text-gray-600">
                      국민대 명예교수
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600"></p>
                </div>
              </div>
            </div>

            <div className="bg-ocean-deep/5 mb-6 rounded-lg p-5 shadow-md">
              <h3 className="text-ocean-deep mb-4 text-xl font-bold">
                집행위원장
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">김태우</span>
                    <span className="text-sm text-gray-600">경희대 교수</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600"></p>
                </div>
              </div>
            </div>

            <div className="bg-ocean-deep/5 mb-6 rounded-lg p-5 shadow-md">
              <h3 className="text-ocean-deep mb-4 text-xl font-bold">
                실무간사
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">신채영(재하)</span>
                    <span className="text-sm text-gray-600">
                      경희대 석사과정
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600"></p>
                </div>
              </div>
            </div>

            <h3 className="text-ocean-deep mb-4 text-xl font-bold">
              조직 위원
            </h3>
            <div className="grid gap-4">
              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">김병수</span>
                  <span className="text-sm text-gray-600">성공회대 교수</span>
                </div>
                <p className="mt-1 text-sm text-gray-600"></p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">김지연</span>
                  <span className="text-sm text-gray-600">
                    고려대학 과학기술학연구소 실장
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600"></p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">김추령</span>
                  <span className="text-sm text-gray-600">
                    전 신도고등학교 교사
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600"></p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">김명심</span>
                  <span className="text-sm text-gray-600">덕성여대 강사</span>
                </div>
                <p className="mt-1 text-sm text-gray-600"></p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">남종영</span>
                  <span className="text-sm text-gray-600">
                    기후변화와 동물연구소 소장
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600"></p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">박병상</span>
                  <span className="text-sm text-gray-600">
                    인천 도시생태환경연구소 소장
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600"></p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">박진희</span>
                  <span className="text-sm text-gray-600">동국대 교수</span>
                </div>
                <p className="mt-1 text-sm text-gray-600"></p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">조천호</span>
                  <span className="text-sm text-gray-600">
                    초대 국립기상과학원장, 대기과학자
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600"></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
