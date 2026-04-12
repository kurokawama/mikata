import Link from "next/link";
import { ExternalLink, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ArticlePerspectiveWithSource, SentimentLabel } from "@/types/database";

const COUNTRY_FLAGS: Record<string, string> = {
  US: "🇺🇸",
  JP: "🇯🇵",
  GB: "🇬🇧",
  FR: "🇫🇷",
  DE: "🇩🇪",
  QA: "🇶🇦",
};

const SENTIMENT_CONFIG: Record<SentimentLabel, { label: string; className: string }> = {
  positive: {
    label: "ポジティブ",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  negative: {
    label: "ネガティブ",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  neutral: {
    label: "中立",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
};

const FREE_LIMIT = 2;

interface ArticlePerspectivesProps {
  perspectives: ArticlePerspectiveWithSource[];
  isSubscribed?: boolean;
}

export function ArticlePerspectives({ perspectives, isSubscribed = false }: ArticlePerspectivesProps) {
  if (perspectives.length === 0) return null;

  const visiblePerspectives = isSubscribed ? perspectives : perspectives.slice(0, FREE_LIMIT);
  const hiddenCount = isSubscribed ? 0 : perspectives.length - FREE_LIMIT;

  return (
    <section className="mt-10">
      <h2 className="font-heading text-2xl font-bold text-primary mb-4">
        各国メディアの論調
      </h2>
      <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
        {visiblePerspectives.map((p) => {
          const countryCode = p.media_sources?.country_code ?? "";
          const flag = COUNTRY_FLAGS[countryCode] ?? countryCode;
          const sentiment = SENTIMENT_CONFIG[p.sentiment_label];
          const scoreSign = p.sentiment_score >= 0 ? "+" : "";
          const scoreStr = `${scoreSign}${p.sentiment_score.toFixed(1)}`;

          return (
            <div
              key={p.id}
              className="flex items-start gap-4 p-4 bg-card hover:bg-secondary/30 transition-colors"
            >
              {/* Country flag */}
              <span className="text-2xl leading-none flex-shrink-0 mt-0.5">{flag}</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline" className={sentiment.className}>
                    {sentiment.label}({scoreStr})
                  </Badge>
                  {p.media_sources?.name && (
                    <span className="text-xs text-muted-foreground">
                      {p.media_sources.name}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {p.summary}
                </p>
                {p.source_url && (
                  <a
                    href={p.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700"
                  >
                    <ExternalLink className="h-3 w-3" />
                    原典を確認
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-6 py-5 text-center">
          <Lock className="mx-auto mb-2 h-5 w-5 text-amber-500" />
          <p className="text-sm font-medium text-gray-800">
            あと{hiddenCount}カ国の論調を読むには登録が必要です
          </p>
          <p className="mt-1 text-xs text-muted-foreground">無料登録で全視点を解除</p>
          <div className="mt-3 flex justify-center gap-2">
            <Button
              size="sm"
              className="bg-amber-500 text-white hover:bg-amber-400"
              render={<Link href="/signup" />}
            >
              無料で全視点を読む
            </Button>
            <Button size="sm" variant="ghost" className="text-xs text-muted-foreground" render={<Link href="/login" />}>
              ログイン
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
