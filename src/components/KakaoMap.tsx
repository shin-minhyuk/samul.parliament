"use client";

import React, { useEffect, useRef } from "react";

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

  useEffect(() => {
    // Kakao Maps API가 로드되었는지 확인
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          // 지도 생성
          const mapOptions = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

          // 마커 생성
          const markerPosition = new window.kakao.maps.LatLng(
            latitude,
            longitude,
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

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
          }
        }
      });
    };

    // 스크립트 로드 완료 시 지도 초기화
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
      document.head.removeChild(mapScript);
    };
  }, [latitude, longitude, markerTitle]);

  return <div ref={mapRef} className="h-full w-full" />;
}
