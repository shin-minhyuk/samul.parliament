"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Train, Bus, Car, Coffee, Hotel, Info } from "lucide-react";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트를 동적으로 불러옵니다 (SSR 비활성화)
const KakaoMap = dynamic(() => import("@/components/KakaoMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-200">
      <p className="text-gray-500">지도를 불러오는 중...</p>
    </div>
  ),
});

export default function LocationPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-nature-forest mb-4 text-4xl font-bold md:text-5xl">
            사물의 의회 장소 안내
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            인간과 비인간 존재들이 함께 모여 소통할 수 있는 공간, 사물의 의회가
            열릴 장소를 안내합니다.
          </p>
        </div>

        {/* 장소 개요 */}
        <section className="mb-16">
          <div className="bg-nature-forest relative overflow-hidden rounded-xl p-8 text-white shadow-xl">
            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-bold">장소 개요</h2>
              <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                <div className="flex-1">
                  <h3 className="mb-3 text-xl font-semibold">
                    서울숲 컨퍼런스센터
                  </h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p>서울특별시 성동구 서울숲2길 32-14</p>
                      <p>서울숲 컨퍼런스센터 그랜드홀</p>
                      <p className="mt-2 text-sm">
                        자연과 도시가 공존하는 서울숲 내에 위치한 친환경
                        컨퍼런스 공간입니다.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 text-xl font-semibold">행사 일정</h3>
                  <p>2025년 10월 15일 (월)</p>
                  <p>12:00 - 18:00 KST</p>
                  <p className="mt-2 text-sm">
                    * 행사 30분 전부터 입장 가능합니다.
                  </p>
                </div>
              </div>
            </div>
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 -z-0 h-64 w-64 opacity-10">
              <MapPin className="h-full w-full" />
            </div>
          </div>
        </section>

        {/* 지도 */}
        <section className="mb-16">
          <h2 className="text-nature-forest mb-8 text-center text-3xl font-bold">
            위치 안내
          </h2>
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="relative h-[400px] w-full">
              {/* Kakao Maps API를 사용하여 지도 표시 */}
              <KakaoMap
                latitude={37.5443}
                longitude={127.0444}
                markerTitle="서울숲 컨퍼런스센터"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2">
                <MapPin className="text-nature-spring h-5 w-5" />
                <h3 className="text-nature-forest text-lg font-bold">
                  서울숲 컨퍼런스센터
                </h3>
              </div>
              <p className="mt-2 text-gray-600">
                서울특별시 성동구 서울숲2길 32-14
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href="https://map.kakao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-nature-spring hover:bg-nature-forest rounded-full px-4 py-2 text-sm font-medium text-white transition-all"
                >
                  카카오맵으로 보기
                </a>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-nature-leaf hover:bg-nature-forest rounded-full px-4 py-2 text-sm font-medium text-white transition-all"
                >
                  구글맵으로 보기
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 교통편 안내 */}
        <section className="mb-16">
          <h2 className="text-nature-forest mb-8 text-center text-3xl font-bold">
            교통편 안내
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* 지하철 */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-nature-spring rounded-full p-2 text-white">
                  <Train className="h-6 w-6" />
                </div>
                <h3 className="text-nature-forest text-xl font-bold">지하철</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">분당선</span> 서울숲역 4번
                  출구에서 도보 5분
                </li>
                <li>
                  <span className="font-medium">2호선</span> 뚝섬역 8번 출구에서
                  도보 10분
                </li>
                <li>
                  <span className="font-medium">경의중앙선</span> 응봉역에서
                  도보 15분
                </li>
              </ul>
            </div>

            {/* 버스 */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-nature-leaf rounded-full p-2 text-white">
                  <Bus className="h-6 w-6" />
                </div>
                <h3 className="text-nature-forest text-xl font-bold">버스</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">간선버스</span> 121, 302, 463
                </li>
                <li>
                  <span className="font-medium">지선버스</span> 2012, 2014, 2224
                </li>
                <li>
                  <span className="font-medium">마을버스</span> 성동13
                </li>
                <li>서울숲 정류장 하차 후 도보 3분</li>
              </ul>
            </div>

            {/* 자가용 */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-nature-forest rounded-full p-2 text-white">
                  <Car className="h-6 w-6" />
                </div>
                <h3 className="text-nature-forest text-xl font-bold">자가용</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>내비게이션에 &apos;서울숲 컨퍼런스센터&apos; 검색</li>
                <li>
                  <span className="font-medium">주차</span> 서울숲 공영주차장
                  이용 (유료)
                </li>
                <li>
                  <span className="font-medium">주차요금</span> 최초 30분
                  1,000원, 추가 10분당 500원
                </li>
                <li className="text-sm text-red-500">
                  * 주차공간이 제한되어 있으니 가급적 대중교통 이용을
                  권장합니다.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 주변 시설 */}
        <section className="mb-16">
          <h2 className="text-nature-forest mb-8 text-center text-3xl font-bold">
            주변 시설 안내
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 카페 및 식당 */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-nature-spring rounded-full p-2 text-white">
                  <Coffee className="h-6 w-6" />
                </div>
                <h3 className="text-nature-forest text-xl font-bold">
                  카페 및 식당
                </h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">서울숲 카페거리</span> - 도보
                  5분 거리에 다양한 카페와 레스토랑이 위치
                </li>
                <li>
                  <span className="font-medium">성수동 카페거리</span> - 도보
                  15분 거리에 트렌디한 카페와 맛집 밀집
                </li>
                <li>
                  <span className="font-medium">컨퍼런스센터 내 카페</span> -
                  1층에 카페테리아 운영 (행사 당일 할인)
                </li>
              </ul>
            </div>

            {/* 숙박 */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-nature-leaf rounded-full p-2 text-white">
                  <Hotel className="h-6 w-6" />
                </div>
                <h3 className="text-nature-forest text-xl font-bold">숙박</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">글래드 호텔 성수</span> - 도보
                  10분 거리
                </li>
                <li>
                  <span className="font-medium">신라스테이 성동</span> -
                  차량으로 10분 거리
                </li>
                <li>
                  <span className="font-medium">호텔 더 디자이너스 성수</span> -
                  도보 15분 거리
                </li>
                <li className="text-sm text-blue-500">
                  * 행사 참가자는 제휴 호텔 할인 혜택이 제공됩니다. (예약 시
                  &apos;사물의 의회&apos; 참가자임을 알려주세요)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 추가 정보 */}
        <section>
          <div className="bg-nature-spring/10 rounded-xl p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-nature-forest rounded-full p-2 text-white">
                <Info className="h-6 w-6" />
              </div>
              <h3 className="text-nature-forest text-xl font-bold">
                추가 안내사항
              </h3>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-gray-600">
              <li>행사장 내부는 배리어프리 설계로 휠체어 이용이 가능합니다.</li>
              <li>행사 당일 안내 데스크에서 참가자 등록 후 입장해 주세요.</li>
              <li>중식과 다과가 제공됩니다.</li>
              <li>행사장 내 와이파이가 무료로 제공됩니다.</li>
              <li>
                행사 관련 문의사항은 이메일(info@samuluiuihoe.org)로 연락주세요.
              </li>
            </ul>
            <div className="mt-6 flex justify-center">
              <Link
                href="/recruitment"
                className="bg-nature-spring hover:bg-nature-forest rounded-full px-8 py-3 font-semibold text-white transition-all"
              >
                참가 신청하기
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
