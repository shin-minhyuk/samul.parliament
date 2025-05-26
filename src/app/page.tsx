"use client";

import { openExternalLink } from "@/util/url";
import { Button } from "@/components/Button";
import Image from "next/image";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div>
      {/* 히어로 배너 */}
      <section className="flex min-h-[400px] items-center justify-center overflow-hidden px-4 md:h-[600px]">
        <div className="animate-slide-up">
          <div className="group hover:animate-wiggle flex flex-col gap-2 text-center md:gap-4 md:text-left">
            <h2 className="text-4xl md:text-7xl">2025 사물의 의회</h2>
            <h1 className="text-primary-500 group-hover:text-primary-400 transform text-5xl font-[900] transition-all duration-100 md:text-8xl">
              인간과 비인간
            </h1>
            <h2 className="text-[22px] md:text-5xl">
              함께 만드는 새로운 기후 민주주의
            </h2>
          </div>
        </div>
      </section>

      {/* 서브 배너 */}
      <section className="h-[320px] md:h-[440px]">
        <div>
          <div className="bg-ocean-deep border-ocean-surf relative flex h-[280px] items-center justify-center border-y-[12px] px-4 text-white md:h-[360px] md:border-y-[20px]">
            <div className="animate-slide-up flex flex-col gap-4 text-center">
              <h3 className="text-lg font-semibold md:text-2xl">
                함께 고민하는 시간
              </h3>
              <h2 className="text-2xl font-bold md:text-5xl">
                비인간 존재들의 <span className="text-ocean-surf">권리</span>와{" "}
                <span className="text-ocean-surf">발언권</span>을 고민하다
              </h2>
            </div>

            {/* 참가버튼 */}
            <Button
              type="button"
              onClick={() =>
                openExternalLink(
                  "https://docs.google.com/forms/d/e/1FAIpQLSdt5BSpFw3mS9wZzWVzcqvDcWHw8BP2i8o-2r0i9R151562iw/viewform",
                )
              }
              className="animate-rotate-in absolute right-0 bottom-[-40px] left-0 mx-auto h-[80px] w-[80px] p-0 hover:scale-105 md:bottom-[-50px] md:h-[100px] md:w-[100px]"
            >
              <p className="text-sm text-nowrap md:text-base">지원하기</p>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#E4F3FF] px-6 py-10">
        <div className="mx-auto max-w-[1200px] text-center">
          <h1 className="mb-3 text-3xl font-semibold">
            <span className="mb-5 block">주최</span>
          </h1>
        </div>

        <div className="relative mx-auto flex items-center justify-center gap-10">
          <Image
            src="/images/주최_기후몸연구소.png"
            alt="주최_기후몸연구소"
            className="h-[60px] w-[160px] shrink-0 object-contain md:h-[80px] md:w-[200px]"
            width={200}
            height={80}
          />
          <Logo className="flex md:text-2xl" />
        </div>
      </section>

      <section className="bg-[#E4F3FF] px-6 py-10">
        <div className="mx-auto max-w-[1200px] text-center">
          <h1 className="mb-3 text-3xl font-semibold">
            <span className="mb-5 block">후원</span>
          </h1>
        </div>

        <div className="relative mx-auto overflow-hidden">
          {/* 양쪽 그라데이션 효과 */}
          <div className="absolute top-0 left-0 z-10 h-full w-1/4 bg-gradient-to-r from-[#E4F3FF] to-transparent" />
          <div className="absolute top-0 right-0 z-10 h-full w-1/4 bg-gradient-to-l from-[#E4F3FF] to-transparent" />

          <div className="w-full overflow-hidden">
            <div
              className="flex"
              style={{
                animation: "marquee-scroll 14s linear infinite",
                width: "max-content",
              }}
            >
              <Image
                src="/images/후원_기후변화행동연구소.png"
                alt="후원_기후변화행동연구소"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <Image
                src="/images/후원_녹색서울시민위원회.png"
                alt="후원_녹색서울시민위원회"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <Image
                src="/images/후원_우리학교.jpg"
                alt="후원_우리학교"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <Image
                src="/images/후원_참여연대.jpg"
                alt="후원_참여연대"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <div className="flex h-[80px] w-[200px] shrink-0 flex-col items-center justify-center object-contain pr-10 text-2xl font-semibold">
                <p>가치를 꿈꾸는</p>
                <p>과학교사모임</p>
              </div>
              <div className="flex h-[80px] w-[200px] shrink-0 flex-col items-center justify-center object-contain pr-10 text-2xl font-semibold">
                <p>신유물론연구회</p>
              </div>
              <div className="flex h-[80px] w-[200px] shrink-0 flex-col items-center justify-center object-contain pr-10 text-center text-xl font-semibold">
                성공회대 <br />
                농림생태환경연구소
              </div>
              <Image
                src="/images/후원_기후변화행동연구소.png"
                alt="후원_기후변화행동연구소"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <Image
                src="/images/후원_녹색서울시민위원회.png"
                alt="후원_녹색서울시민위원회"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <Image
                src="/images/후원_우리학교.jpg"
                alt="후원_우리학교"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <Image
                src="/images/후원_참여연대.jpg"
                alt="후원_참여연대"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <div className="flex h-[80px] w-[200px] shrink-0 flex-col items-center justify-center object-contain pr-10 text-2xl font-semibold">
                <p>가치를 꿈꾸는</p>
                <p>과학교사모임</p>
              </div>
              <div className="flex h-[80px] w-[200px] shrink-0 flex-col items-center justify-center object-contain pr-10 text-2xl font-semibold">
                <p>신유물론연구회</p>
              </div>
              <div className="flex h-[80px] w-[200px] shrink-0 flex-col items-center justify-center object-contain pr-10 text-center text-xl font-semibold">
                성공회대 <br />
                농림생태환경연구소
              </div>
              <Image
                src="/images/후원_기후변화행동연구소.png"
                alt="후원_기후변화행동연구소"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <Image
                src="/images/후원_녹색서울시민위원회.png"
                alt="후원_녹색서울시민위원회"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <Image
                src="/images/후원_우리학교.jpg"
                alt="후원_우리학교"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <Image
                src="/images/후원_참여연대.jpg"
                alt="후원_참여연대"
                className="h-[80px] w-[200px] shrink-0 object-contain pr-10"
                width={200}
                height={80}
              />
              <div className="flex h-[80px] w-[200px] shrink-0 flex-col items-center justify-center object-contain pr-10 text-2xl font-semibold">
                <p>가치를 꿈꾸는</p>
                <p>과학교사모임</p>
              </div>
              <div className="flex h-[80px] w-[200px] shrink-0 flex-col items-center justify-center object-contain pr-10 text-2xl font-semibold">
                <p>신유물론연구회</p>
              </div>
              <div className="flex h-[80px] w-[200px] shrink-0 flex-col items-center justify-center object-contain pr-10 text-center text-xl font-semibold">
                성공회대 <br />
                농림생태환경연구소
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 비디오 섹션 */}
      {/* <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            aria-label="자연과 기술이 조화롭게 공존하는 미래를 보여주는 영상"
          >
            <source src="/videos/20250309_0200.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

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
            <button className="hover:text-primary-500 mt-4 rounded-full bg-white/20 px-8 py-3 font-semibold backdrop-blur-sm transition-all hover:bg-white">
              <Link href="/info">더 알아보기</Link>
            </button>
          </div>
        </div>
      </section> */}

      {/* 서브 배너 */}
      {/* <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
              <div className="bg-ocean-blue/10 mb-6 inline-block rounded-full p-3">
                <Leaf className="text-ocean-deep h-8 w-8" />
              </div>
              <h3 className="text-primary-500 mb-4 text-2xl font-bold">
                환경 보호
              </h3>
              <p className="mb-6 text-gray-600">
                지속 가능한 미래를 위한 환경 보호 활동과 기술 혁신을 논의합니다.
              </p>
              <Link
                href="/info"
                className="group/link text-ocean-blue inline-flex items-center"
              >
                자세히 보기
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>

            <div className="group rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
              <div className="bg-ocean-blue/10 mb-6 inline-block rounded-full p-3">
                <Users className="text-ocean-deep h-8 w-8" />
              </div>
              <h3 className="text-primary-500 mb-4 text-2xl font-bold">
                커뮤니티
              </h3>
              <p className="mb-6 text-gray-600">
                환경 보호에 관심 있는 사람들이 모여 아이디어를 공유하고
                토론합니다.
              </p>
              <Link
                href="https://www.instagram.com/samul.parliament"
                className="group/link text-ocean-blue inline-flex items-center"
              >
                자세히 보기
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>

            <div className="group rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
              <div className="bg-ocean-blue/10 mb-6 inline-block rounded-full p-3">
                <Globe className="text-ocean-deep h-8 w-8" />
              </div>
              <h3 className="text-primary-500 mb-4 text-2xl font-bold">
                글로벌 협력
              </h3>
              <p className="mb-6 text-gray-600">
                전 세계의 환경 전문가들과 함께 글로벌 환경 문제 해결방안을
                모색합니다.
              </p>
              <Link
                href="/organization"
                className="group/link text-ocean-blue inline-flex items-center"
              >
                자세히 보기
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
