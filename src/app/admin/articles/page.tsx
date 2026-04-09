import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SentimentBadge } from "@/components/sentiment/sentiment-badge";
import { createClient } from "@/lib/supabase/server";
import type { ArticleWithSource, ArticleStatus } from "@/types/database";

const statusColors: Record<ArticleStatus, string> = {
  draft: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-800",
};

const statusLabels: Record<ArticleStatus, string> = {
  draft: "下書き",
  published: "公開中",
  archived: "アーカイブ",
};

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*, media_sources(*)")
    .order("created_at", { ascending: false })
    .limit(50);

  const typedArticles = (articles ?? []) as ArticleWithSource[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy-800">記事管理</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>記事一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {typedArticles.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              記事がまだありません
            </p>
          ) : (
            <div className="divide-y">
              {typedArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/article/${article.id}`}
                      className="text-sm font-medium text-navy-800 hover:text-amber-600 truncate block"
                    >
                      {article.title}
                    </Link>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{article.media_sources?.name}</span>
                      <span>·</span>
                      <span>{article.country_code}</span>
                      <span>·</span>
                      <time>
                        {new Date(article.created_at).toLocaleDateString("ja-JP")}
                      </time>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <SentimentBadge sentiment={article.sentiment_label} />
                    <Badge className={statusColors[article.status]}>
                      {statusLabels[article.status]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
