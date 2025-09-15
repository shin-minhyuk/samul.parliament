import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin/",
        crawlDelay: 1,
      },
      {
        userAgent: "NaverBot",
        allow: "/",
        disallow: "/admin/",
      },
      {
        userAgent: "Yeti",
        allow: "/",
        disallow: "/admin/",
      },
      {
        userAgent: "Daumoa",
        allow: "/",
        disallow: "/admin/",
      },
    ],
    sitemap: "https://samulparliament.com/sitemap.xml",
  };
}
