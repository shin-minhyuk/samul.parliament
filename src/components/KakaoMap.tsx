"use client";

import React, { useEffect, useRef, useState } from "react";

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  markerTitle?: string;
}

export default function KakaoMap({
  latitude,
  longitude,
  markerTitle,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API 키 확인
    if (!process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY) {
      console.error("Kakao Maps API 키가 설정되지 않았습니다.");
      setError("API 키가 설정되지 않았습니다.");
      return;
    }

    // console.log("Kakao Maps 초기화 시작...");

    // Kakao Maps API 로드
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY}&autoload=false`;

    const onLoadError = () => {
      console.error("Kakao Maps API 로딩 실패");
      setError("지도를 불러오는데 실패했습니다.");
    };

    mapScript.onerror = onLoadError;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      // console.log("Kakao Maps 스크립트 로드됨, 지도 초기화 시작");

      try {
        window.kakao.maps.load(() => {
          // console.log("Kakao Maps API 로드 완료");

          if (mapRef.current) {
            // 지도 생성
            const mapOptions = {
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 3,
            };

            // console.log("지도 생성 중...");
            const map = new window.kakao.maps.Map(mapRef.current, mapOptions);
            // console.log("지도 생성 완료");

            // 마커 생성
            const markerPosition = new window.kakao.maps.LatLng(
              latitude,
              longitude,
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(map);
            // console.log("마커 생성 완료");

            // 마커에 정보창 추가
            if (markerTitle) {
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:12px;">${markerTitle}</div>`,
              });

              // 마커에 마우스오버 이벤트 등록
              window.kakao.maps.event.addListener(
                marker,
                "mouseover",
                function () {
                  infowindow.open(map, marker);
                },
              );

              // 마커에 마우스아웃 이벤트 등록
              window.kakao.maps.event.addListener(
                marker,
                "mouseout",
                function () {
                  infowindow.close();
                },
              );

              // 초기에 정보창 표시
              infowindow.open(map, marker);
              // console.log("정보창 생성 완료");
            }
          }
        });
      } catch (err) {
        console.error("Kakao Maps 초기화 중 오류 발생:", err);
        setError("지도를 초기화하는데 실패했습니다.");
      }
    };

    // 스크립트 로드 완료 시 지도 초기화
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
      if (document.head.contains(mapScript)) {
        document.head.removeChild(mapScript);
      }
    };
  }, [latitude, longitude, markerTitle]);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-200">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return <div ref={mapRef} className="h-full w-full" />;
}
