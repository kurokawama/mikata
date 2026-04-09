import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentBadge } from "@/components/sentiment/sentiment-badge";
import { SentimentGauge } from "@/components/sentiment/sentiment-gauge";
import type { ArticleWithSource } from "@/types/database";

interface ArticleCardProps {
  article: ArticleWithSource;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.id}`}>
      <Card className="group h-full transition-shadow hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {article.media_sources?.name} · {article.country_code}
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
  );
}
