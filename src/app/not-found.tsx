import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="from-ocean-blue/5 to-ocean-foam/5 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b px-4">
      <div className="mb-8 flex items-center gap-3">
        <div className="animate-float text-primary-500">
          <Leaf className="h-16 w-16 md:h-24 md:w-24" />
        </div>
      </div>
      <span className="text-ocean-deep/20 mb-2 text-7xl font-black md:text-9xl">
        404
      </span>
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-600 md:text-3xl">
        아직 준비 중인 페이지예요!
      </h2>
      <p className="mb-8 text-center text-gray-500">
        열심히 준비하고 있으니 조금만 기다려주세요{" "}
        <span className="text-ocean-surf">♥</span>
        <br />
        궁금하신 내용이 있다면 관계자를 통해 개발자에게 문의해주세요
      </p>
      <Link
        href="/"
        className="bg-primary-500 hover:bg-ocean-blue group flex items-center gap-2 rounded-full px-6 py-3 text-white transition-all duration-300 hover:scale-105"
      >
        <Leaf className="h-5 w-5 transition-transform group-hover:-rotate-45" />
        <span>홈으로 돌아가기</span>
      </Link>
    </div>
  );
}
