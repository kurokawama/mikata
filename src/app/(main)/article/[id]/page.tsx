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
import { ArticlePerspectives } from "@/components/articles/article-perspectives";
import { BookmarkButton } from "@/components/articles/bookmark-button";
import { ShareButtons } from "@/components/articles/share-buttons";
import type { Metadata } from "next";
import type { ArticleWithSource, ArticlePerspectiveWithSource } from "@/types/database";

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

  // Fetch perspectives for this article
  const { data: perspectives } = await supabase
    .from("article_perspectives")
    .select("*, media_sources(*)")
    .eq("article_id", id);

  const typedPerspectives = (perspectives ?? []) as ArticlePerspectiveWithSource[];

  // Check freemium limits
  const profile = await getProfile();
  const isSubscribed =
    profile?.subscription_status === "active" ||
    profile?.subscription_status === "trialing";

  const today = new Date().toISOString().split("T")[0];
  const isNewDay = profile?.last_article_date !== today;
  // is_premium=true articles require subscription; is_premium=false are free (up to daily limit)
  const isPremiumOnly = typedArticle.is_premium === true;
  const canView =
    isSubscribed ||
    (!isPremiumOnly && (!profile || isNewDay || profile.daily_article_count < 1));

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
    await supabase
      .from("reading_history")
      .upsert({ user_id: profile.id, article_id: id }, { onConflict: "user_id,article_id" });
  }

  // Check bookmark status
  let isBookmarked = false;
  if (profile) {
    const { data: bookmark } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", profile.id)
      .eq("article_id", id)
      .single();
    isBookmarked = !!bookmark;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikata.news";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <NewsArticleJsonLd article={typedArticle} siteUrl={siteUrl} />
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          記事一覧に戻る
        </Link>
        {profile && (
          <BookmarkButton articleId={id} initialBookmarked={isBookmarked} />
        )}
        <ShareButtons
          title={typedArticle.title}
          url={process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL + "/article/" + id : "https://mikata.vercel.app/article/" + id}
        />
      </div>

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
          <div className="relative overflow-hidden">
            {/* Show ~70% of content then fade out */}
            <div className="relative max-h-[420px] overflow-hidden">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {typedArticle.content}
              </div>
              {/* Gradient overlay: fades content at bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" style={{top: '55%'}} />
            </div>
            {/* Paywall CTA */}
            <div className="relative mt-0 rounded-b-lg border border-amber-200 bg-gradient-to-b from-amber-50/80 to-amber-50 px-8 py-10 text-center backdrop-blur-sm">
              <div className="mb-3 inline-flex items-center justify-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                プレミアム記事
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                続きを読むにはプレミアムプランへ
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                3ヶ月間無料・全記事読み放題・広告なし
              </p>
              <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  className="bg-amber-500 px-8 text-white hover:bg-amber-400"
                  render={<Link href="/signup" />}
                >
                  3ヶ月無料で始める
                </Button>
                <Button variant="ghost" className="text-sm text-muted-foreground" render={<Link href="/login" />}>
                  ログイン
                </Button>
              </div>
            </div>
          </div>
        )}

        {canView && <ArticlePerspectives perspectives={typedPerspectives} />}

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
