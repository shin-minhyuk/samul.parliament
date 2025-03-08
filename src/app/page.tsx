import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Main content will go here */}
        <section className="flex h-[600px] items-center justify-center">
          <div className="group hover:animate-wiggle flex flex-col gap-4 text-6xl font-bold">
            <p>2025 Environment</p>
            <p className="text-p-electric group-hover:text-p-lime transform text-8xl transition-all duration-300">
              사물과 인간
            </p>
            <p>함께 논의하는 새로운 미래</p>
          </div>
        </section>
      </main>
    </div>
  );
}
