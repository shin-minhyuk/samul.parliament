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
      </main>
    </div>
  );
}
