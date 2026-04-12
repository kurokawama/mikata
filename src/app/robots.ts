import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Sanitize SITE_URL: trim whitespace/newlines that can appear in env vars
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikata.news";
  const siteUrl = rawUrl.trim().replace(/\n/g, "").replace(/\r/g, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/settings"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
