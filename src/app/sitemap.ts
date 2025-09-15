import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://samulparliament.com";
  const now = new Date();

  // 정적 페이지들은 고정된 날짜 사용
  const staticPageDate = new Date("2025-08-31");

  // 동적 콘텐츠 페이지들은 현재 날짜 사용
  const dynamicContentDate = now;

  return [
    {
      url: baseUrl,
      lastModified: staticPageDate, // 메인 페이지는 수동 업데이트시에만 변경
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/info`,
      lastModified: staticPageDate, // 프로젝트 소개는 거의 변경되지 않음
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/schedule`,
      lastModified: staticPageDate, // 일정 정보는 수동으로 관리
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/organization`,
      lastModified: staticPageDate, // 조직 정보는 거의 변경되지 않음
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recruitment`,
      lastModified: staticPageDate, // 모집 정보는 수동으로 관리
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: dynamicContentDate, // 아카이브는 새 콘텐츠가 추가될 수 있음
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/location`,
      lastModified: staticPageDate, // 위치 정보는 거의 변경되지 않음
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/notices`,
      lastModified: dynamicContentDate, // 공지사항은 자주 업데이트됨
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: staticPageDate, // FAQ는 가끔 업데이트됨
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/board`,
      lastModified: dynamicContentDate, // 게시판은 자주 업데이트됨
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
