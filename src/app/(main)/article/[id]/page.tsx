import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentBadge } from "@/components/sentiment/sentiment-badge";
import { SentimentGauge } from "@/components/sentiment/sentiment-gauge";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/supabase/server";
import { NewsArticleJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import type { ArticleWithSource } from "@/types/database";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("title, summary, image_url")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!article) return { title: "記事が見つかりません" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikata.news";

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      url: `${siteUrl}/article/${id}`,
      images: article.image_url
        ? [{ url: article.image_url }]
        : [`${siteUrl}/api/og?title=${encodeURIComponent(article.title)}`],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    },
  };
}

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*, media_sources(*)")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!article) {
    notFound();
  }

  const typedArticle = article as ArticleWithSource;

  // Check freemium limits
  const profile = await getProfile();
  const isSubscribed =
    profile?.subscription_status === "active" ||
    profile?.subscription_status === "trialing";

  const today = new Date().toISOString().split("T")[0];
  const isNewDay = profile?.last_article_date !== today;
  const canView =
    isSubscribed ||
    !profile ||
    isNewDay ||
    (profile.daily_article_count < 1);

  // Update view count server-side
  if (profile && canView) {
    const newCount = isNewDay ? 1 : profile.daily_article_count + 1;
    await supabase
      .from("profiles")
      .update({
        daily_article_count: newCount,
        last_article_date: today,
      })
      .eq("id", profile.id);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikata.news";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <NewsArticleJsonLd article={typedArticle} siteUrl={siteUrl} />
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        記事一覧に戻る
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <SentimentBadge sentiment={typedArticle.sentiment_label} />
            <span className="text-sm text-muted-foreground">
              {typedArticle.media_sources?.name}
            </span>
            <span className="text-sm text-muted-foreground">
              {typedArticle.country_code}
            </span>
            {typedArticle.published_at && (
              <time className="text-sm text-muted-foreground">
                {new Date(typedArticle.published_at).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </div>

          <h1 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {typedArticle.title}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            {typedArticle.summary}
          </p>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">論調スコア</CardTitle>
            </CardHeader>
            <CardContent>
              <SentimentGauge score={typedArticle.sentiment_score} size="lg" />
            </CardContent>
          </Card>
        </header>

        {canView ? (
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {typedArticle.content}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="line-clamp-3 text-foreground leading-relaxed blur-sm select-none">
              {typedArticle.content}
            </div>
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-8 text-center">
              <h3 className="text-xl font-bold text-primary">
                本日の無料記事は上限に達しました
              </h3>
              <p className="mt-2 text-muted-foreground">
                プレミアムプランに登録すると、すべての記事を無制限に閲覧できます
              </p>
              <Button
                className="mt-4 bg-amber-500 text-navy-900 hover:bg-amber-400"
                render={<Link href="/signup" />}
              >
                3ヶ月無料で始める
              </Button>
            </div>
          </div>
        )}

        {typedArticle.media_sources?.url && (
          <div className="mt-8 border-t pt-6">
            <a
              href={typedArticle.media_sources.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700"
            >
              <ExternalLink className="h-4 w-4" />
              原典を確認する: {typedArticle.media_sources.name}
            </a>
          </div>
        )}
      </article>
    </div>
  );
}
