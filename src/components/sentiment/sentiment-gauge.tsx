interface SentimentGaugeProps {
  score: number; // -1 to 1
  size?: "sm" | "md" | "lg";
}

export function SentimentGauge({ score, size = "md" }: SentimentGaugeProps) {
  const percentage = ((score + 1) / 2) * 100;

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const getColor = (score: number) => {
    if (score > 0.2) return "bg-sentiment-positive";
    if (score < -0.2) return "bg-sentiment-negative";
    return "bg-sentiment-neutral";
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-full rounded-full bg-muted ${sizeClasses[size]}`}
      >
        <div
          className={`${sizeClasses[size]} rounded-full transition-all ${getColor(score)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
        {score > 0 ? "+" : ""}
        {score.toFixed(2)}
      </span>
    </div>
  );
}
