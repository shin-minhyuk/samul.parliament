# 사물의 의회 2025

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://samuluiuihoe.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📄 프로젝트 소개

"사물의 의회 2025"는 비인간 존재들의 권리와 발언권을 고민하는 환경 컨퍼런스 웹사이트입니다. 프랑스 철학자 브뤼노 라투르의 개념에서 영감을 받아, 탈인간중심주의 관점에서 환경 문제를 다루는 행사를 소개합니다.

## 📋 주요 기능

- **행사 정보 제공**: 사물의 의회 개념, 연구 배경, 목적 소개
- **참가자 모집**: 인간/비인간 그룹 참가 신청 기능
- **일정 및 장소**: 컨퍼런스 일정과 위치 정보 제공
- **관리자 기능**: 공지사항, 아카이브 자료 관리
- **반응형 디자인**: 모바일부터 데스크탑까지 최적화된 UI

## 🛠️ 기술 스택

- **프론트엔드**: Next.js 15, React, TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: React Context API
- **콘텐츠 관리**: Firebase
- **배포**: Vercel
- **검색엔진 최적화**: Next.js Metadata API

## 🚀 시작하기

### 필수 조건

- Node.js 18.17.0 이상
- Yarn 패키지 매니저

### 설치

```bash
# 저장소 복제
git clone https://github.com/yourusername/samuluiuihoe.git
cd samuluiuihoe

# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 개발 버전을 확인할 수 있습니다.

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```
# API 키
NEXT_PUBLIC_KAKAO_MAPS_API_KEY=your_kakao_maps_api_key

# 검증 코드
GOOGLE_SITE_VERIFICATION=your_google_verification_code
NAVER_SITE_VERIFICATION=your_naver_verification_code
```

## 📁 프로젝트 구조

```
samuluiuihoe/
├── public/                 # 정적 파일 (이미지, 비디오 등)
│   ├── images/             # 이미지 리소스
│   ├── videos/             # 비디오 리소스
│   ├── robots.txt          # 검색엔진 크롤링 규칙
│   └── sitemap.xml         # 사이트맵
├── src/
│   ├── app/                # Next.js 앱 라우터
│   │   ├── admin/          # 관리자 페이지
│   │   ├── info/           # 행사 정보 페이지
│   │   ├── schedule/       # 일정 페이지
│   │   ├── layout.tsx      # 루트 레이아웃
│   │   └── page.tsx        # 메인 페이지
│   ├── components/         # 공통 컴포넌트
│   ├── constants/          # 상수 값
│   ├── context/            # React 컨텍스트
│   ├── services/           # API 서비스
│   ├── types/              # TypeScript 타입 정의
│   └── util/               # 유틸리티 함수
├── .env                    # 환경 변수
├── next.config.ts          # Next.js 설정
└── tsconfig.json           # TypeScript 설정
```

## 🔍 SEO 최적화

이 프로젝트는 검색엔진 최적화를 위한 다양한 기능을 구현했습니다:

- **메타데이터**: 모든 페이지에 최적화된 제목, 설명, 키워드 설정
- **OpenGraph/Twitter Cards**: 소셜 미디어 공유 최적화
- **사이트맵/robots.txt**: 검색엔진 크롤링 최적화

### 검색 노출 성과

- **Google**: "사물의 의회" 검색 시 최상위 노출
- **Naver**: "사물의 의회 2025" 검색 시 최상위 노출

## 🔄 배포

이 프로젝트는 Vercel을 통해 자동으로 배포됩니다:

- `main` 브랜치에 변경사항이 푸시되면 자동 배포
- 각 PR마다 미리보기 배포 생성

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 제출합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📬 연락처

사물의 의회 조직위원회 - samul.parliament@gmail.com

프로젝트 링크: [https://samuluiuihoe.vercel.app](https://samuluiuihoe.vercel.app)
