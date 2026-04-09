import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentBadge } from "@/components/sentiment/sentiment-badge";
import { SentimentGauge } from "@/components/sentiment/sentiment-gauge";
import type { ArticlePerspectiveWithSource } from "@/types/database";

interface ArticlePerspectivesProps {
  perspectives: ArticlePerspectiveWithSource[];
}

export function ArticlePerspectives({ perspectives }: ArticlePerspectivesProps) {
  if (perspectives.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-heading text-2xl font-bold text-primary mb-6">
        各国メディアの視点
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {perspectives.map((p) => (
          <Card key={p.id} className="border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  {p.perspective_label}
                </CardTitle>
                <SentimentBadge sentiment={p.sentiment_label} />
              </div>
              {p.media_sources && (
                <p className="text-xs text-muted-foreground">
                  {p.media_sources.name}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground leading-relaxed">
                {p.summary}
              </p>
              <div className="mt-3">
                <SentimentGauge score={p.sentiment_score} size="sm" />
              </div>
              {p.source_url && (
                <a
                  href={p.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-amber-600 hover:text-amber-700"
                >
                  原典を確認 →
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
