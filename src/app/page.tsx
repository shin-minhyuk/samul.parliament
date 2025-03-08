import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Leaf, Users, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* 히어로 배너 */}
        <section className="flex h-[600px] items-center justify-center overflow-hidden border border-red-500">
          <div className="animate-slide-up">
            <div className="group hover:animate-wiggle flex flex-col gap-4 text-8xl font-bold">
              <p>2025 Environment</p>
              <p className="text-nature-forest group-hover:text-nature-spring transform text-9xl font-[900] transition-all duration-100">
                사물과 인간
              </p>
              <p>함께 논의하는 새로운 미래</p>
            </div>
          </div>
        </section>

        {/* 서브 배너 */}
        <section className="h-[440px] border border-red-500">
          {/* 서브 배너 */}
          <div>
            <div className="bg-nature-forest border-nature-spring relative flex h-[360px] items-center justify-center border-y-[20px] text-white">
              <div className="animate-slide-up flex flex-col gap-4 text-center text-2xl">
                <p className="font-semibold">함께 고민하는 시간</p>
                <p className="text-5xl font-bold">
                  비인간 존재들의{" "}
                  <span className="text-nature-spring">권리</span>와
                  <span className="text-nature-spring">발언권</span>을 고민하다
                </p>
                <p className="text-xl font-bold opacity-50">
                  2025 사물의 의회 주제 : 미래의 공존을 위한 새로운 논의
                </p>
              </div>

              {/* 참가버튼 */}
              <button className="animate-rotate-in bg-nature-leaf hover:bg-nature-spring hover:animate-wiggle text-md absolute right-0 bottom-[-50px] left-0 mx-auto h-[100px] w-[100px] rounded-full px-4 py-2 font-bold text-white transition-all">
                <p>신청하기</p>
              </button>
            </div>
          </div>
        </section>

        {/* 비디오 섹션 */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* 배경 비디오 */}
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/videos/20250309_0200.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* 비디오 오버레이 - 더 진한 그라데이션 효과 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>

          {/* 비디오 위 콘텐츠 */}
          <div className="relative z-10 flex h-full items-center justify-center px-4 text-white">
            <div className="max-w-4xl space-y-8 text-center">
              <h2 className="text-5xl font-bold drop-shadow-lg">
                자연과 기술의 조화
              </h2>
              <p className="text-xl leading-relaxed font-medium tracking-wide drop-shadow-lg">
                우리는 자연과 기술이 조화롭게 공존하는 미래를 꿈꿉니다.
                <br className="hidden md:block" />더 나은 미래를 위한 우리의
                여정에 함께해주세요.
              </p>
              <button className="hover:text-nature-forest mt-4 rounded-full bg-white/20 px-8 py-3 font-semibold backdrop-blur-sm transition-all hover:bg-white">
                더 알아보기
              </button>
            </div>
          </div>
        </section>

        {/* 서브 배너 */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* 카드 1 */}
              <div className="group rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
                <div className="bg-nature-forest/10 mb-6 inline-block rounded-full p-3">
                  <Leaf className="text-nature-forest h-8 w-8" />
                </div>
                <h3 className="text-nature-forest mb-4 text-2xl font-bold">
                  환경 보호
                </h3>
                <p className="mb-6 text-gray-600">
                  지속 가능한 미래를 위한 환경 보호 활동과 기술 혁신을
                  논의합니다.
                </p>
                <a
                  href=""
                  className="group/link text-nature-forest inline-flex items-center"
                >
                  자세히 보기
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>

              {/* 카드 2 */}
              <div className="group rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
                <div className="bg-nature-forest/10 mb-6 inline-block rounded-full p-3">
                  <Users className="text-nature-forest h-8 w-8" />
                </div>
                <h3 className="text-nature-forest mb-4 text-2xl font-bold">
                  커뮤니티
                </h3>
                <p className="mb-6 text-gray-600">
                  환경 보호에 관심 있는 사람들이 모여 아이디어를 공유하고
                  토론합니다.
                </p>
                <a
                  href="#"
                  className="group/link text-nature-forest inline-flex items-center"
                >
                  자세히 보기
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>

              {/* 카드 3 */}
              <div className="group rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
                <div className="bg-nature-forest/10 mb-6 inline-block rounded-full p-3">
                  <Globe className="text-nature-forest h-8 w-8" />
                </div>
                <h3 className="text-nature-forest mb-4 text-2xl font-bold">
                  글로벌 협력
                </h3>
                <p className="mb-6 text-gray-600">
                  전 세계의 환경 전문가들과 함께 글로벌 환경 문제 해결방안을
                  모색합니다.
                </p>
                <a
                  href="#"
                  className="group/link text-nature-forest inline-flex items-center"
                >
                  자세히 보기
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
