import React from "react";

export default function OrganizationPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-ocean-deep mb-8 text-4xl font-bold md:text-5xl">
          조직 구성도
        </h1>

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-6 text-2xl font-bold md:text-3xl">
            조직 위원회 구성
          </h2>

          {/* 조직도 다이어그램 */}
          <div className="mb-10 overflow-hidden rounded-xl bg-white/90 p-6 shadow-lg backdrop-blur-sm">
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
          </div>

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
                  <p className="mt-2 text-sm text-gray-600">
                    기후위기와 생태계급에 관한 신유물론적 관점 연구를 진행하고
                    있습니다. 사물의 의회 프로젝트의 총괄 책임을 맡고 있습니다.
                  </p>
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
                  <p className="mt-2 text-sm text-gray-600">
                    『몸이 기후다: 존재론적 인류학의 기후 실천』 저자,
                    기후위기와 인간중심주의 연구를 진행하고 있습니다. 사물의
                    의회 행사 진행을 총괄합니다.
                  </p>
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
                <p className="mt-1 text-sm text-gray-600">
                  인류세의 사회이론과 파국에 관한 연구
                </p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">김지연</span>
                  <span className="text-sm text-gray-600">
                    고려대학 과학기술학연구소 실장
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  『정상동물: 동물은 왜 죽여도 되는 존재가 되었나』 저자, 동물권
                  활동가
                </p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">김추령</span>
                  <span className="text-sm text-gray-600">
                    전 신도고등학교 교사
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  기후위기 대응을 위한 시민사회 네트워크 코디네이터
                </p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">김명심</span>
                  <span className="text-sm text-gray-600">
                    덕성여자대학교 강사
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  기후위기와 생태계급에 관한 연구
                </p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">남종영</span>
                  <span className="text-sm text-gray-600">
                    기후변화와 동물연구소 소장
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  지속가능한 발전과 환경 정책 연구
                </p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">박병상</span>
                  <span className="text-sm text-gray-600">
                    인천 도시생태환경연구소 소장
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  대기오염과 기후변화의 상관관계 연구, 대기 대표
                </p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">박진희</span>
                  <span className="text-sm text-gray-600">동국대 교수</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  숲 생태계와 생물다양성 연구, 숲과 식물 대표
                </p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">조천호</span>
                  <span className="text-sm text-gray-600">
                    초대 국립기상과학원장, 대기과학자
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  해양 생태계와 해양 오염 연구, 바다 대표
                </p>
              </div>

              <div className="bg-ocean-deep/5 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">재하</span>
                  <span className="text-sm text-gray-600">
                    경희대학교 석사과정/한의사
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  토양 미생물과 생태계 순환 연구, 미생물 대표
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
