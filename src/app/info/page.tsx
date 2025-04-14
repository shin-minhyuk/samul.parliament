import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사물의 의회 소개 | 사물의 의회 2025",
  description:
    "사물의 의회는 인간 아닌 존재들이 가진 권리와 행위성을 인정하고 그 목소리를 드러내는 실험입니다. 연구 배경, 목적, 진행 방식에 대해 알아보세요.",
  openGraph: {
    title: "사물의 의회 소개 | 사물의 의회 2025",
    description:
      "기후위기 극복을 위한 탈인간중심주의 대안, 사물의 의회를 소개합니다.",
    url: "https://samul-parliament.com/info",
    type: "article",
  },
  keywords: [
    "사물의 의회",
    "비인간 존재",
    "탈인간중심주의",
    "브뤼노 라투르",
    "기후위기",
    "대안",
    "연구",
    "기후헌법",
  ],
};

export default function InfoPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-ocean-deep mb-8 text-4xl font-bold md:text-5xl">
          사물의 의회 소개
        </h1>

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-4 text-2xl font-bold md:text-3xl">
            연구 배경
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              기후위기는 인간중심주의의 위기입니다. 인간을 중심에 두고 세계를
              이해하는 방식과 인간 외 비인간 존재들에 대한 경시와 무시가
              기후위기를 낳았습니다. 인간만이 살아있고, 그 외의 존재들은 의지가
              없는 죽은 존재로 바라보는 관점이 인간중심주의에 녹아 있습니다.
            </p>
            <p className="mb-4">
              인간중심주의를 실제화하려던 근현대문명의 움직임은 재앙적
              기후위기로 나타나고 있습니다. 화석연료를 태우고 남은 것을 투기하는
              거대한 쓰레기장인 대기는 기온이 상승하는 지구비등화의 장으로
              전화했습니다. 또 하나의 거대한 쓰레기장인 바다는 플라스틱이 섬을
              이루는 폐기물의 장이 되었습니다.
            </p>
            <p className="mb-4">
              기후위기의 문제를 재고하고 지금의 문명을 재구성하기 위해서는
              인간중심주의를 어떻게 해체할 것인가가 관건입니다. 본 연구는
              인간중심주의에 대한 응대로서 어떻게 비인간 존재들에게 그 존재에
              맞게 존재의 자리를 다시 찾아줄 것인가에 대한 고민을 통해 그 문제를
              논의하고자 합니다.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-4 text-2xl font-bold md:text-3xl">
            사물의 의회란?
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              사물의 의회는 프랑스의 철학자, 인류학자, 사회학자, 과학기술학자인
              브뤼노 라투르의 개념입니다. 이 개념에서 사물은 비인간존재를
              의미합니다. 인간 아닌 존재들이 가진 권리와 행위성을 인정하기 위해
              의회를 통해 그 목소리들을 드러내는 것을 사물의 의회 개념을
              목적으로 합니다.
            </p>
            <p className="mb-4">
              사물의 의회는 실제 토론의 장소를 만들어 그 목소리를 내도록 하는
              장치를 만드는 실천입니다. 실제 사물의 의회 실험은 세계 곳곳에서
              진행되었으며 우리 연구팀은 이 실험을 한국에서 최초로 진행합니다.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-4 text-2xl font-bold md:text-3xl">
            연구 목적 및 기대효과
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              이를 통해 한국사회에서 탈인간중심주의의 대안을 제시할 수 있는
              효과를 기대합니다. 인간중심주의가 체계화되어 있는 상황에서
              한국에서 최초의 사물의 의회 실험은 적지 않은 반향을 일으킬 것으로
              기대합니다.
            </p>
            <p className="mb-4">
              특히, &quot;개발도상국&quot;에서 &quot;선진국&quot;으로 이행하면서
              근현대문명의 열매를 맛보고 있는 한국사회에서 그러한 문명의 결과가
              기후재앙의 현실이며, 그것을 극복하기 위한 대안적 존재에 대한
              이해가 필요하다는 것을 드러내는데 기여할 것입니다.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-4 text-2xl font-bold md:text-3xl">
            진행 방식
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              본 연구는 1) 사물의 의회를 열기 위한 준비 단계와 2) 실제 사물의
              의회를 개최하는 단계 그리고 3) 행사 이후에 보고서 등의 결과물을
              만들어 내는 단계인 세 단계로 나누어 진행됩니다.
            </p>
            <h3 className="text-ocean-surf mt-6 mb-2 text-xl font-bold">
              참여 그룹
            </h3>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white/80 p-6 shadow-md backdrop-blur-sm">
                <h4 className="text-ocean-deep mb-2 text-lg font-bold">
                  인간 그룹
                </h4>
                <ul className="list-disc space-y-1 pl-5">
                  <li>도시 / 농촌</li>
                  <li>기업 / 노동자</li>
                  <li>기후피해자 / 기후운동가</li>
                  <li>노인 / 아동 / 청소년</li>
                  <li>장애인</li>
                </ul>
              </div>
              <div className="rounded-lg bg-white/80 p-6 shadow-md backdrop-blur-sm">
                <h4 className="text-ocean-deep mb-2 text-lg font-bold">
                  비인간 그룹
                </h4>
                <ul className="list-disc space-y-1 pl-5">
                  <li>대기 / 숲 / 흙 / 바다</li>
                  <li>동물 / 미생물</li>
                  <li>화석연료 / 재생에너지</li>
                  <li>쓰레기(플라스틱)</li>
                  <li>기술</li>
                </ul>
              </div>
            </div>
            <p className="mb-4">
              각 그룹은 당사자, 사회과학자, 활동가, 시민, 학생으로 구성됩니다.
            </p>
            <h3 className="text-ocean-surf mt-6 mb-2 text-xl font-bold">
              회의 진행
            </h3>
            <p className="mb-4">
              사물의 회의 본 회의는 주말 이틀 동안 진행됩니다. 1일차에 1차
              그룹회의과 2일차에 2차 그룹회의를 통해 기후 관련 이해 관계
              요구사항, NDC(Nationally Determined Contribution) 의견 및 기후헌법
              조항을 도출하여 작성하고 공개발표합니다. 그리고 기자회견을
              진행합니다.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-4 text-2xl font-bold md:text-3xl">
            연구 일정
          </h2>
          <div className="rounded-lg bg-white/80 p-6 shadow-md backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-ocean-deep/20 border-b">
                    <th className="text-ocean-deep px-4 py-2 text-left">
                      단계
                    </th>
                    <th className="text-ocean-deep px-4 py-2 text-left">
                      기간
                    </th>
                    <th className="text-ocean-deep px-4 py-2 text-left">
                      내용
                    </th>
                  </tr>
                </thead>
                <tbody className="whitespace-nowrap">
                  <tr className="border-ocean-deep/20 border-b">
                    <td className="px-4 py-3">1단계</td>
                    <td className="px-4 py-3">1월 ~ 8월</td>
                    <td className="px-4 py-3">
                      준비 단계, 회의 준비, 참여자 섭외, 예비모임
                    </td>
                  </tr>
                  <tr className="border-ocean-deep/20 border-b">
                    <td className="px-4 py-3">2단계</td>
                    <td className="px-4 py-3">9월 ~ 10월</td>
                    <td className="px-4 py-3">사물의 의회 개최</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">3단계</td>
                    <td className="px-4 py-3">11월 ~ 12월</td>
                    <td className="px-4 py-3">결과보고서 작성, 발표</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-4 text-2xl font-bold md:text-3xl">
            조직 구성
          </h2>
          <div className="rounded-lg bg-white/80 p-6 shadow-md backdrop-blur-sm">
            <p className="mb-4">
              사물의 의회는 위원장, 학술 위원회, 운영 위원회, 인간/비인간
              대표단, 사무국으로 구성되어 있습니다. 각 조직의 구성원과 역할,
              의사결정 구조에 대한 자세한 내용은 조직 구성도 페이지에서 확인하실
              수 있습니다.
            </p>
            <div className="flex justify-center">
              <a
                href="/organization"
                className="bg-primary-500 hover:bg-nature-forest mt-2 inline-block rounded-full px-6 py-3 font-semibold text-white transition-all"
              >
                조직 구성도 보기
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-ocean-deep mb-4 text-2xl font-bold md:text-3xl">
            참고 문헌
          </h2>
          <div className="prose prose-lg max-w-none">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                라투르, 브뤼노(홍철기 옮김), 2009, 『우리는 결코 근대인이었던
                적이 없다』 갈무리.
              </li>
              <li>
                라투르, 브뤼노(박범순 옮김), 2021, 『지구와 충돌하지 않고
                착륙하는 방법』 이음.
              </li>
              <li>
                김태우, 2024, 『몸이 기후다: 존재론적 인류학의 기후 실천』
                경희대학교 출판문화원.
              </li>
              <li>
                김환석, 2022, &quot;기후위기, 문명의 전환과 생태계급: 신유물론
                관점&quot; 『경제와 사회』 136:47-86.
              </li>
              <li>
                Latour, Bruno, 2017, Facing Gaia: Eight Lectures on the New
                Climate Regime, Polity Press.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
