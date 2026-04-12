export const dynamic = "force-dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/articles/article-card";
import { createClient } from "@/lib/supabase/server";
import type { ArticleWithSource } from "@/types/database";

// Extended type to include joined topics
type ArticleWithTopics = ArticleWithSource & {
  article_topics?: Array<{ topics: { slug: string } | null }> | null;
};

const COUNTRY_FLAGS: Record<string, string> = {
  US: "🇺🇸",
  JP: "🇯🇵",
  GB: "🇬🇧",
  FR: "🇫🇷",
  DE: "🇩🇪",
  QA: "🇶🇦",
};

const GENRE_COLORS: Record<string, string> = {
  sports: "#22C55E",
  economy: "#3B82F6",
  gaming: "#8B5CF6",
};

function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 60) return `${diffMins}分前`;
  if (diffHours < 24) return `${diffHours}時間前`;
  return `${diffDays}日前`;
}

function getCategory(article: ArticleWithTopics): string | null {
  const topics = article.article_topics;
  if (!topics) return null;
  for (const t of topics) {
    const slug = t.topics?.slug;
    if (slug === "sports" || slug === "economy" || slug === "gaming") return slug;
  }
  return null;
}

export default async function HomePage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*, media_sources(*), article_topics(topics(slug))")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(7);

  const typedArticles = (articles ?? []) as ArticleWithTopics[];
  const heroArticle = typedArticles[0] ?? null;
  const gridArticles = typedArticles.slice(1);
  const heroCategory = heroArticle ? getCategory(heroArticle) : null;
  const heroBarColor =
    heroCategory ? GENRE_COLORS[heroCategory] :
    heroArticle?.sentiment_score != null
      ? heroArticle.sentiment_score > 0.3 ? "#22C55E"
        : heroArticle.sentiment_score < -0.3 ? "#EF4444"
        : "#9CA3AF"
      : "#9CA3AF";
  const heroBarWidth = heroArticle
    ? `${Math.min(Math.abs(heroArticle.sentiment_score) * 100, 100)}%`
    : "0%";

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-800 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700" />

        {heroArticle ? (
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <Link href={`/article/${heroArticle.id}`} className="group block max-w-3xl">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {heroCategory && (
                  <span
                    className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ backgroundColor: GENRE_COLORS[heroCategory] + "33", color: GENRE_COLORS[heroCategory] }}
                  >
                    {heroCategory === "sports" ? "スポーツ" : heroCategory === "economy" ? "経済" : "ゲーム"}
                  </span>
                )}
                <span className="text-sm leading-none">
                  {COUNTRY_FLAGS[heroArticle.country_code] ?? heroArticle.country_code}
                </span>
                <span className="text-xs text-navy-300">
                  {heroArticle.published_at ? getRelativeTime(heroArticle.published_at) : ""}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl font-bold leading-snug group-hover:text-amber-400 transition-colors sm:text-4xl lg:text-5xl">
                {heroArticle.title}
              </h1>

              {/* Summary */}
              <p className="mt-4 text-lg text-navy-200 line-clamp-1">
                {heroArticle.summary}
              </p>

              {/* Sentiment bar */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-xs text-navy-400">論調</span>
                <div className="h-1 w-48 rounded-full bg-navy-600">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: heroBarWidth, backgroundColor: heroBarColor }}
                  />
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                ニュースを、<span className="text-amber-400">多視点</span>で
              </h1>
              <p className="mt-6 text-lg text-navy-200 sm:text-xl">
                AIが各国メディアの論調を分析。一つのニュースを複数の視点から読み解きます。
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Article Grid */}
      <section id="latest-articles" className="bg-secondary/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-primary mb-8">最新の記事</h2>

          {typedArticles.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg font-medium text-muted-foreground">記事を準備中です</p>
              <p className="mt-2 text-sm text-muted-foreground">
                世界中のメディアソースからニュースを収集しています。まもなく記事が配信されます。
              </p>
              <Button variant="outline" className="mt-6" render={<Link href="/sources" />}>
                メディアソース一覧を見る
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* First grid article: full-width large card */}
              {gridArticles[0] && (
                <ArticleCard
                  article={gridArticles[0]}
                  category={getCategory(gridArticles[0])}
                  size="lg"
                />
              )}
              {/* Remaining: 2-column small cards */}
              {gridArticles.length > 1 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {gridArticles.slice(1).map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      category={getCategory(article)}
                      size="sm"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-primary">もっと深く、もっと広く</h2>
          <p className="mt-4 text-muted-foreground">
            無料登録で全ての記事が読み放題。3ヶ月間無料、クレジットカード不要。
          </p>
          <Button
            size="lg"
            className="mt-8 bg-amber-500 text-navy-900 hover:bg-amber-400 font-semibold"
            render={<Link href="/signup" />}
          >
            無料登録して全記事を読む
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
