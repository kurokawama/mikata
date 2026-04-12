import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SentimentBadge } from "@/components/sentiment/sentiment-badge";
import type { ArticleWithSource } from "@/types/database";

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

const DEFAULT_BAR_COLOR = "#D1D5DB";

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

interface ArticleCardProps {
  article: ArticleWithSource;
  category?: string | null;
  size?: "sm" | "lg";
}

export function ArticleCard({ article, category, size = "sm" }: ArticleCardProps) {
  const flag = COUNTRY_FLAGS[article.country_code] ?? article.country_code;
  const barColor = category ? (GENRE_COLORS[category] ?? DEFAULT_BAR_COLOR) : DEFAULT_BAR_COLOR;

  const score = article.sentiment_score ?? 0;
  const sentimentColor =
    score > 0.3 ? "#22C55E" : score < -0.3 ? "#EF4444" : "#9CA3AF";
  const sentimentWidth = `${Math.min(Math.abs(score) * 100, 100)}%`;

  return (
    <Link href={`/article/${article.id}`} className="block h-full">
      <Card
        className="group h-full transition-shadow hover:shadow-lg"
        style={{ borderLeft: `4px solid ${barColor}` }}
      >
        <CardContent className={size === "lg" ? "pt-5 pb-6" : "pt-4 pb-4"}>
          {/* Source + flag chip + time */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground truncate">
              {article.media_sources?.name}
            </span>
            <span
              className="text-sm px-1 py-0.5 rounded bg-amber-50 leading-none"
              title={article.country_code}
            >
              {flag}
            </span>
            {article.published_at && (
              <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                {getRelativeTime(article.published_at)}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className={`font-heading font-semibold group-hover:text-amber-600 transition-colors line-clamp-2 ${
              size === "lg" ? "text-xl" : "text-base"
            }`}
          >
            {article.title}
          </h3>

          {/* Summary */}
          <p
            className={`mt-2 text-sm text-muted-foreground ${
              size === "lg" ? "line-clamp-3" : "line-clamp-2"
            }`}
          >
            {article.summary}
          </p>

          {/* Sentiment mini-bar + badge */}
          <div className="mt-3 flex items-center gap-2">
            <div className="h-1 flex-1 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full"
                style={{ width: sentimentWidth, backgroundColor: sentimentColor }}
              />
            </div>
            <SentimentBadge sentiment={article.sentiment_label} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
