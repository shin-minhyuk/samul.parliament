import { Globe, Users } from "lucide-react";
import React from "react";

const MarkedText = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-ocean-blue/20 rounded px-1 py-0.5 font-semibold">
      {children}
    </span>
  );
};

export default function InfoPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-ocean-deep mb-8 text-4xl font-bold md:text-5xl">
          2025 사물의 의회 프로젝트
        </h1>

        {/* <section className="mb-12">
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
        </section> */}

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-4 text-2xl font-bold md:text-3xl">
            사물의 의회란?
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              사물의 의회(Parliament of Things)는 프랑스 과학기술학자{" "}
              <MarkedText>브뤼노 라투르</MarkedText>가 제안한 개념으로, 인간과
              비인간 존재가 함께 정치적 목소리를 내는 탈인간중심적 민주주의 모델
              입니다. 인간만이 아닌, 대기·동물·기술·산림·해양 등 다양한 비인간
              존재들의 권리와 이해관계도 정치적으로 대표되어야 한다는 생각에서
              출발했습니다.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-4 text-2xl font-bold md:text-3xl">
            프로젝트의 목적
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              인간 중심의 기존 법과 제도의 한계를 넘어, 기후위기에 대응할 수
              있는 탈인간중심적 법 규범을 모색 합니다.{" "}
              <MarkedText>국내 최초로 사물의 의회를 개최</MarkedText>
              하여 기후민주주의의 새로운 가능성을 실험 합니다.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-4 text-2xl font-bold md:text-3xl">
            프로젝트의 필요성
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              <MarkedText>
                기후위기는 인간 중심적 근대문명의 필연적 결과
              </MarkedText>
              입니다. 인간만이 주체이고, 자연은 대상이라는 근대적 사고방식 은
              대기, 산림, 해양 등 비인간 존재들을 착취와 오용의 대상으로
              삼아왔습니다. 사물의 의회는 인간뿐 아니라 비인간 존재들도
              정치적으로 대표되는 새로운 민주주의 공간을 지향합니다. 이 실험은
              한국 사회에 기후위기를 극복하기 위한 근본적 전환의 계기 를 제공할
              것입니다.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-ocean-surf mb-2 text-xl font-bold">
            프로젝트 일정 및 절차(안)
          </h2>
          <div className="rounded-lg bg-white/80 p-6 shadow-md backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-ocean-deep/20 border-b">
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
                    <td className="px-4 py-3">1월 ~ 5월</td>
                    <td className="px-4 py-3">추진계획 준비, 소책자 작성</td>
                  </tr>
                  <tr className="border-ocean-deep/20 border-b">
                    <td className="px-4 py-3">6월 ~ 8월</td>
                    <td className="px-4 py-3">참가자 100명 섭외 및 모집</td>
                  </tr>
                  <tr className="border-ocean-deep/20 border-b">
                    <td className="px-4 py-3">8월 ~ 9월</td>
                    <td className="px-4 py-3">행사 홍보</td>
                  </tr>
                  <tr className="border-ocean-deep/20 border-b">
                    <td className="px-4 py-3">9월 27일</td>
                    <td className="px-4 py-3">참가자 예비모임(소책자 배포)</td>
                  </tr>
                  <tr className="border-ocean-deep/20 border-b">
                    <td className="px-4 py-3">11월 1~2일</td>
                    <td className="px-4 py-3">사물의 의회 본 회의 개최</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">11월 ~ 12월</td>
                    <td className="px-4 py-3">
                      결과보고서 작성 및 발표(책 발간)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-ocean-deep mb-4 text-2xl font-bold md:text-3xl">
            본회의 소개
          </h2>

          <h3 className="text-ocean-surf mt-6 mb-2 text-xl font-bold">
            참여 그룹
          </h3>
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
            </div>
          </div>
          <p className="my-4">
            각 그룹은 당사자, 과학자, 예술가, 활동가, 시민 등 10명으로
            구성됩니다.
          </p>
          <h3 className="text-ocean-surf mt-6 mb-2 text-xl font-bold">
            주요 토론 주제
          </h3>
          <div className="space-y-4">
            <div className="from-ocean-blue/10 to-mint-400/10 border-ocean-blue rounded-lg border-l-4 bg-gradient-to-r p-6 shadow-md backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="bg-ocean-blue flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-700">
                    기후위기에 대한 비인간들의 목소리를 의회정치에 대표하기
                    위하여 어떤 법적 변화가 필요하다고 생각하나요?
                  </p>
                  <p className="font-semibold text-gray-700">
                    예시) 기존 탄소중립기본법 개정 vs 새로운 법/헌법 제정
                  </p>
                </div>
              </div>
            </div>

            <div className="from-mint-400/10 to-ocean-surf/10 border-mint-400 rounded-lg border-l-4 bg-gradient-to-r p-6 shadow-md backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="bg-ocean-deep flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-700">
                    기후위기에 대응하기 위해 각 이해관계자 그룹들은 법에 어떤
                    내용이 담기기를 원하나요?
                  </p>
                </div>
              </div>
            </div>

            <div className="from-ocean-surf/10 to-ocean-blue/10 border-ocean-surf rounded-lg border-l-4 bg-gradient-to-r p-6 shadow-md backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="bg-ocean-surf flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-700">
                    비인간 대표를 비례대표제로 선출해 국회에 보내는 것에 대해
                    어떻게 생각하나요?
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-ocean-surf mt-6 mb-2 text-xl font-bold">
            시간표
          </h2>
          <div className="prose prose-lg max-w-none">
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* 1일차 */}
              <div className="rounded-lg bg-white/80 p-6 shadow-md backdrop-blur-sm">
                <h3 className="text-ocean-deep mb-4 text-xl font-bold">
                  1일차 (2025.11.01)
                </h3>
                <div className="space-y-3">
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      10:00~11:00
                    </div>
                    <div className="text-gray-700">그룹별 1차 숙의</div>
                  </div>
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      11:00~12:00
                    </div>
                    <div className="text-gray-700">
                      그룹별 발표 (10개 그룹, 각 6분)
                    </div>
                  </div>
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      12:00~13:00
                    </div>
                    <div className="text-gray-700">점심</div>
                  </div>
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      13:00~14:00
                    </div>
                    <div className="text-gray-700">휴식 및 문화행사</div>
                  </div>
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      14:00~16:00
                    </div>
                    <div className="text-gray-700">1차 전체 토론</div>
                  </div>
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      16:00~17:00
                    </div>
                    <div className="text-gray-700">질의응답 및 1일차 평가</div>
                  </div>
                </div>
              </div>

              {/* 2일차 */}
              <div className="rounded-lg bg-white/80 p-6 shadow-md backdrop-blur-sm">
                <h3 className="text-ocean-deep mb-4 text-xl font-bold">
                  2일차 (2025.11.02)
                </h3>
                <div className="space-y-3">
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      10:00~11:00
                    </div>
                    <div className="text-gray-700">그룹별 2차 숙의</div>
                  </div>
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      11:00~12:00
                    </div>
                    <div className="text-gray-700">
                      그룹별 발표 (10개 그룹, 각 6분)
                    </div>
                  </div>
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      12:00~13:00
                    </div>
                    <div className="text-gray-700">점심</div>
                  </div>
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      13:00~15:00
                    </div>
                    <div className="text-gray-700">휴식 및 문화행사</div>
                  </div>
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      15:00~16:00
                    </div>
                    <div className="text-gray-700">2차 전체 토론</div>
                  </div>
                  <div className="border-mint-400 border-l-4 pl-4">
                    <div className="text-ocean-deep font-semibold">
                      16:00~17:00
                    </div>
                    <div className="text-gray-700">전체 결론 발표</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section>
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
        </section> */}
      </div>
    </div>
  );
}
