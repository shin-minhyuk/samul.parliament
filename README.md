This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Kakao Maps API 설정

이 프로젝트는 장소 안내 페이지에서 Kakao Maps API를 사용합니다. 지도를 표시하려면 다음 단계를 따르세요:

1. [Kakao Developers](https://developers.kakao.com/)에서 계정을 생성하고 애플리케이션을 등록합니다.
2. 애플리케이션의 JavaScript 키를 복사합니다.
3. 프로젝트 루트에 `.env.local` 파일을 생성하고 다음과 같이 API 키를 설정합니다:
   ```
   NEXT_PUBLIC_KAKAO_MAPS_API_KEY=your_kakao_maps_api_key
   ```
4. 애플리케이션의 플랫폼 설정에서 웹 플랫폼을 추가하고, 사이트 도메인을 등록합니다:
   - 개발 환경: `http://localhost:3000`
   - 배포 환경: 실제 배포 도메인

이제 장소 안내 페이지에서 지도가 정상적으로 표시됩니다.
