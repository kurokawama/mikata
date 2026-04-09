import { Badge } from "@/components/ui/badge";
import type { SentimentLabel } from "@/types/database";

const sentimentConfig: Record<
  SentimentLabel,
  { label: string; className: string }
> = {
  positive: {
    label: "肯定的",
    className: "bg-sentiment-positive/10 text-sentiment-positive border-sentiment-positive/20",
  },
  negative: {
    label: "否定的",
    className: "bg-sentiment-negative/10 text-sentiment-negative border-sentiment-negative/20",
  },
  neutral: {
    label: "中立",
    className: "bg-sentiment-neutral/10 text-sentiment-neutral border-sentiment-neutral/20",
  },
};

interface SentimentBadgeProps {
  sentiment: SentimentLabel;
}

export function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  const config = sentimentConfig[sentiment];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
