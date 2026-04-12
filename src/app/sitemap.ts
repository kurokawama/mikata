import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Sanitize SITE_URL: trim whitespace/newlines that can appear in env vars
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikata.news";
  const siteUrl = rawUrl.trim().replace(/\n/g, "").replace(/\r/g, "");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: articles } = await supabase
    .from("articles")
    .select("id, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const articleEntries: MetadataRoute.Sitemap = (articles ?? []).map(
    (article) => ({
      url: `${siteUrl}/article/${article.id}`,
      lastModified: article.published_at
        ? new Date(article.published_at)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/sources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...articleEntries,
  ];
}
