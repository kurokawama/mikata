import type { SentimentLabel } from "@/types/database";

interface SentimentDistribution {
  positive: number;
  negative: number;
  neutral: number;
}

interface SentimentChartProps {
  distribution: SentimentDistribution;
}

const colors: Record<SentimentLabel, string> = {
  positive: "bg-sentiment-positive",
  negative: "bg-sentiment-negative",
  neutral: "bg-sentiment-neutral",
};

const labels: Record<SentimentLabel, string> = {
  positive: "肯定的",
  negative: "否定的",
  neutral: "中立",
};

export function SentimentChart({ distribution }: SentimentChartProps) {
  const total = distribution.positive + distribution.negative + distribution.neutral;
  if (total === 0) return null;

  const segments: { key: SentimentLabel; value: number; pct: number }[] = [
    { key: "positive", value: distribution.positive, pct: (distribution.positive / total) * 100 },
    { key: "negative", value: distribution.negative, pct: (distribution.negative / total) * 100 },
    { key: "neutral", value: distribution.neutral, pct: (distribution.neutral / total) * 100 },
  ];

  return (
    <div className="space-y-3">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {segments.map((seg) =>
          seg.pct > 0 ? (
            <div
              key={seg.key}
              className={`${colors[seg.key]} transition-all`}
              style={{ width: `${seg.pct}%` }}
            />
          ) : null
        )}
      </div>
      <div className="flex justify-between text-xs">
        {segments.map((seg) => (
          <div key={seg.key} className="flex items-center gap-1.5">
            <div className={`h-2.5 w-2.5 rounded-full ${colors[seg.key]}`} />
            <span className="text-muted-foreground">
              {labels[seg.key]} {Math.round(seg.pct)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
