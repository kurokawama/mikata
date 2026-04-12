export const dynamic = "force-dynamic";
import Link from "next/link";
import { ArrowRight, Globe, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentBadge } from "@/components/sentiment/sentiment-badge";
import { SentimentGauge } from "@/components/sentiment/sentiment-gauge";
import { createClient } from "@/lib/supabase/server";
import type { ArticleWithSource } from "@/types/database";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*, media_sources(*)")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(6);

  const typedArticles = (articles ?? []) as ArticleWithSource[];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-800 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              ニュースを、
              <span className="text-amber-400">多視点</span>で
            </h1>
            <p className="mt-6 text-lg text-navy-200 sm:text-xl">
              AIが各国メディアの論調を分析。
              一つのニュースを複数の視点から読み解きます。
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-amber-500 text-navy-900 hover:bg-amber-400 font-semibold"
                render={<a href="#latest-articles" />}
              >
                記事を読む
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-navy-400 text-navy-100 hover:bg-navy-700"
                render={<Link href="/sources" />}
              >
                メディアソースを見る
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-primary">
            MIKATAの特徴
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50">
                  <Globe className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle className="text-lg">多国間メディア分析</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  日本・米国・欧州・中東など、各国メディアの報道を横断的に分析します
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">論調の可視化</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  肯定・否定・中立の論調をスコアとビジュアルで直感的に把握できます
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">ソース透明性</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  全ての記事に原典リンクを付与。情報の出典を常に確認できます
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      {(
        <section id="latest-articles" className="bg-secondary/50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-3xl font-bold text-primary">
                最新の記事
              </h2>
              <Link
                href="/"
                className="text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                すべて見る →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {typedArticles.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <p className="text-lg font-medium text-muted-foreground">
                  記事を準備中です
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  世界中のメディアソースからニュースを収集して���ます。まもなく記事が配信されます。
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  render={<Link href="/sources" />}
                >
                  メディアソース一覧を見る
                </Button>
              </div>
            )}
            {typedArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.id}`}>
                  <Card className="group h-full transition-shadow hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {article.media_sources?.name} ·{" "}
                          {article.country_code}
                        </span>
                        <SentimentBadge sentiment={article.sentiment_label} />
                      </div>
                      <CardTitle className="line-clamp-2 text-base font-semibold group-hover:text-amber-600 transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {article.summary}
                      </p>
                      <div className="mt-3">
                        <SentimentGauge score={article.sentiment_score} size="sm" />
                      </div>
                      <time className="mt-2 block text-xs text-muted-foreground">
                        {article.published_at
                          ? new Date(article.published_at).toLocaleDateString("ja-JP")
                          : ""}
                      </time>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-primary">
            もっと深く、もっと広く
          </h2>
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
