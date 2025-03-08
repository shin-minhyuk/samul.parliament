import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* 히어로 배너 */}
        <section className="flex h-[600px] items-center justify-center overflow-hidden">
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
      </main>
    </div>
  );
}
