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
                <h3 className="text-xl font-bold">위원장</h3>
                <p>김환석 (국민대학교 사회학과)</p>
              </div>

              <div className="bg-ocean-deep mb-6 h-10 w-1"></div>

              <div className="mb-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                <div className="bg-primary-500 rounded-lg p-4 text-center text-white">
                  <h3 className="text-lg font-bold">학술 위원회</h3>
                </div>
                <div className="bg-primary-500 rounded-lg p-4 text-center text-white">
                  <h3 className="text-lg font-bold">운영 위원회</h3>
                </div>
                <div className="bg-primary-500 rounded-lg p-4 text-center text-white">
                  <h3 className="text-lg font-bold">사무국</h3>
                </div>
              </div>

              <div className="mb-6 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                <div className="bg-ocean-blue/80 rounded-lg p-4 text-center text-white">
                  <h3 className="text-lg font-bold">인간 대표단</h3>
                </div>
                <div className="bg-ocean-blue/80 rounded-lg p-4 text-center text-white">
                  <h3 className="text-lg font-bold">비인간 대표단</h3>
                </div>
              </div>
            </div>
          </div>

          {/* 상세 구성원 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-ocean-deep/5 rounded-lg p-5 shadow-md">
              <h3 className="text-ocean-deep mb-4 text-xl font-bold">위원장</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">김환석</span>
                    <span className="text-sm text-gray-600">
                      국민대학교 사회학과
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    기후위기와 생태계급에 관한 신유물론적 관점 연구를 진행하고
                    있습니다. 사물의 의회 프로젝트의 총괄 책임을 맡고 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-ocean-deep/5 rounded-lg p-5 shadow-md">
              <h3 className="text-ocean-deep mb-4 text-xl font-bold">
                학술 위원회
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">김명심</span>
                    <span className="text-sm text-gray-600">
                      경희대학교 사회학과
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    기후위기와 생태계급에 관한 연구
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">김태우</span>
                    <span className="text-sm text-gray-600">
                      서울대학교 인류학과
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    『몸이 기후다: 존재론적 인류학의 기후 실천』 저자,
                    기후위기와 인간중심주의 연구
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">김병수</span>
                    <span className="text-sm text-gray-600">
                      서울대학교 사회학과
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    인류세의 사회이론과 파국에 관한 연구
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-ocean-deep/5 rounded-lg p-5 shadow-md">
              <h3 className="text-ocean-deep mb-4 text-xl font-bold">
                운영 위원회
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">김지연</span>
                    <span className="text-sm text-gray-600">환경운동가</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    『정상동물: 동물은 왜 죽여도 되는 존재가 되었나』 저자,
                    동물권 활동가
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">김추령</span>
                    <span className="text-sm text-gray-600">
                      기후위기 대응 네트워크
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    기후위기 대응을 위한 시민사회 네트워크 코디네이터
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">남종영</span>
                    <span className="text-sm text-gray-600">
                      지속가능발전연구소
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    지속가능한 발전과 환경 정책 연구
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-ocean-deep/5 rounded-lg p-5 shadow-md">
              <h3 className="text-ocean-deep mb-4 text-xl font-bold">
                비인간 대표단
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">박병상</span>
                    <span className="text-sm text-gray-600">대기 연구자</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    대기오염과 기후변화의 상관관계 연구, 대기 대표
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">박진희</span>
                    <span className="text-sm text-gray-600">생태학자</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    숲 생태계와 생물다양성 연구, 숲과 식물 대표
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">조천호</span>
                    <span className="text-sm text-gray-600">해양 생물학자</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    해양 생태계와 해양 오염 연구, 바다 대표
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">재하</span>
                    <span className="text-sm text-gray-600">미생물학자</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    토양 미생물과 생태계 순환 연구, 미생물 대표
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-ocean-deep/5 rounded-lg p-5 shadow-md">
              <h3 className="text-ocean-deep mb-4 text-xl font-bold">
                인간 대표단
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">최도시</span>
                    <span className="text-sm text-gray-600">
                      도시계획 전문가
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    지속가능한 도시 설계와 도시 생태계 연구, 도시 대표
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">이농촌</span>
                    <span className="text-sm text-gray-600">농업 활동가</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    유기농업과 지속가능한 농업 방식 연구, 농촌 대표
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">박기업</span>
                    <span className="text-sm text-gray-600">
                      지속가능경영 컨설턴트
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    기업의 환경 책임과 지속가능한 비즈니스 모델 연구, 기업 대표
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">강노동</span>
                    <span className="text-sm text-gray-600">
                      노동환경건강연구소
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    기후위기와 노동환경 변화 연구, 노동자 대표
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-ocean-deep/5 rounded-lg p-5 shadow-md">
              <h3 className="text-ocean-deep mb-4 text-xl font-bold">사무국</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">사무국장</span>
                    <span className="text-sm text-gray-600">정미래</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    사물의 의회 프로젝트 전체 운영 및 조율
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">연구원</span>
                    <span className="text-sm text-gray-600">
                      김지구, 이생태, 박공존
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    연구 자료 수집 및 분석, 회의 내용 정리
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">행정지원</span>
                    <span className="text-sm text-gray-600">
                      최행정, 윤지원
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    행사 준비 및 행정 업무 지원
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-6 text-2xl font-bold md:text-3xl">
            조직 위원회 역할
          </h2>
          <div className="rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-ocean-surf mb-4 text-xl font-bold">
                  학술 위원회
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>사물의 의회 이론적 기반 구축</li>
                  <li>비인간 존재의 발언권과 권리에 대한 학술적 논의 주도</li>
                  <li>회의 결과물의 학술적 분석 및 평가</li>
                  <li>국내외 유사 사례 연구 및 적용 방안 모색</li>
                  <li>기후위기와 인간중심주의에 대한 이론적 논의 제공</li>
                </ul>
              </div>

              <div>
                <h3 className="text-ocean-surf mb-4 text-xl font-bold">
                  운영 위원회
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>사물의 의회 전체 기획 및 운영 방향 설정</li>
                  <li>참여자 섭외 및 그룹 구성 관리</li>
                  <li>회의 진행 방식 설계 및 조율</li>
                  <li>외부 기관 및 단체와의 협력 관계 구축</li>
                  <li>프로젝트 예산 관리 및 자원 배분</li>
                </ul>
              </div>

              <div>
                <h3 className="text-ocean-surf mb-4 text-xl font-bold">
                  인간/비인간 대표단
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>각 그룹의 이해관계와 요구사항 정리</li>
                  <li>그룹 내 토론 진행 및 의견 수렴</li>
                  <li>기후 관련 정책 및 NDC 의견 제시</li>
                  <li>기후헌법 조항 도출 및 작성 참여</li>
                  <li>각 그룹의 목소리를 대변하는 발표 준비</li>
                </ul>
              </div>

              <div>
                <h3 className="text-ocean-surf mb-4 text-xl font-bold">
                  사무국
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>사물의 의회 행사 실무 운영</li>
                  <li>회의 자료 준비 및 기록</li>
                  <li>참가자 관리 및 지원</li>
                  <li>결과보고서 작성 및 발표 지원</li>
                  <li>홍보 및 언론 대응</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-ocean-deep mb-6 text-2xl font-bold md:text-3xl">
            의사결정 구조
          </h2>
          <div className="rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-ocean-surf mb-4 text-xl font-bold">
                의사결정 프로세스
              </h3>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  <span className="font-semibold">준비 단계 (1월~8월)</span>
                  <p className="mt-1 text-gray-600">
                    운영 위원회와 학술 위원회의 정기 회의를 통해 사물의 의회
                    기본 방향과 참여자 구성, 진행 방식 등을 결정합니다. 위원장이
                    최종 승인합니다.
                  </p>
                </li>
                <li>
                  <span className="font-semibold">
                    의회 진행 단계 (9월~10월)
                  </span>
                  <p className="mt-1 text-gray-600">
                    각 그룹별 토론을 통해 의견을 수렴하고, 전체 회의에서
                    공유합니다. 합의가 어려운 사안은 투표를 통해 결정하되,
                    인간과 비인간 그룹의 의견이 동등하게 반영되도록 합니다.
                  </p>
                </li>
                <li>
                  <span className="font-semibold">
                    결과 정리 단계 (11월~12월)
                  </span>
                  <p className="mt-1 text-gray-600">
                    학술 위원회의 분석과 운영 위원회의 검토를 거쳐 최종 결과물을
                    정리합니다. 위원장의 승인 후 공식 발표합니다.
                  </p>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-ocean-surf mb-4 text-xl font-bold">
                의견 수렴 방식
              </h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>그룹별 내부 토론을 통한 의견 수렴</li>
                <li>전체 회의에서의 발표 및 토론</li>
                <li>온라인 플랫폼을 통한 상시 의견 수렴</li>
                <li>외부 전문가 자문 및 피드백 반영</li>
                <li>시민사회와의 소통 및 의견 교환</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
