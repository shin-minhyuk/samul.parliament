interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

interface KakaoMap {
  setCenter(position: KakaoLatLng): void;
  getCenter(): KakaoLatLng;
  setLevel(level: number): void;
  getLevel(): number;
}

interface KakaoMarker {
  setMap(map: KakaoMap | null): void;
  getMap(): KakaoMap | null;
}

interface KakaoInfoWindow {
  open(map: KakaoMap, marker: KakaoMarker): void;
  close(): void;
}

interface KakaoMapAPI {
  maps: {
    load: (callback: () => void) => void;
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    Map: new (
      container: HTMLElement,
      options: { center: KakaoLatLng; level: number },
    ) => KakaoMap;
    Marker: new (options: { position: KakaoLatLng }) => KakaoMarker;
    InfoWindow: new (options: { content: string }) => KakaoInfoWindow;
    event: {
      addListener: (
        target: KakaoMarker | KakaoMap,
        type: string,
        handler: () => void,
      ) => void;
    };
  };
}

declare global {
  interface Window {
    kakao: KakaoMapAPI;
  }
}

export {};
