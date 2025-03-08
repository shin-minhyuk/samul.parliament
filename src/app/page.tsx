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
              <p className="text-nature-forest group-hover:text-nature-spring transform text-9xl transition-all duration-100">
                사물과 인간
              </p>
              <p>함께 논의하는 새로운 미래</p>
            </div>
          </div>
        </section>

        {/* 서브 배너 */}
        <section className="h-[440px] border border-red-500">
          {/* 서브 배너 */}
          <div className="bg-nature-forest relative flex h-[360px] items-center justify-center text-white">
            <div className="flex flex-col gap-4">
              <p>함께 고민해요</p>
              <p className="text-nature-forest group-hover:text-nature-spring transform text-9xl transition-all duration-100">
                사물과 인간
              </p>
              <p>함께 논의하는 새로운 미래</p>
            </div>

            {/* 참가버튼 */}
            <button className="bg-nature-leaf hover:bg-nature-spring hover:animate-wiggle absolute right-0 bottom-[-50px] left-0 mx-auto h-[100px] w-[100px] rounded-full px-4 py-2 text-sm font-semibold text-white transition-all">
              신청하기
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
