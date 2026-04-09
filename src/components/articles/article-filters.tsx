"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { SentimentLabel } from "@/types/database";

const countryOptions = [
  { code: "ALL", label: "すべて" },
  { code: "JP", label: "日本" },
  { code: "US", label: "アメリカ" },
  { code: "GB", label: "イギリス" },
  { code: "FR", label: "フランス" },
  { code: "DE", label: "ドイツ" },
  { code: "QA", label: "カタール" },
];

const sentimentOptions: { value: SentimentLabel | "ALL"; label: string }[] = [
  { value: "ALL", label: "すべて" },
  { value: "positive", label: "肯定的" },
  { value: "negative", label: "否定的" },
  { value: "neutral", label: "中立" },
];

export function ArticleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCountry = searchParams.get("country") ?? "ALL";
  const currentSentiment = searchParams.get("sentiment") ?? "ALL";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">国</h3>
        <div className="flex flex-wrap gap-2">
          {countryOptions.map((opt) => (
            <Badge
              key={opt.code}
              variant={currentCountry === opt.code ? "default" : "outline"}
              className={
                currentCountry === opt.code
                  ? "bg-amber-500 text-navy-900 hover:bg-amber-600 cursor-pointer"
                  : "cursor-pointer hover:bg-muted"
              }
              onClick={() => updateFilter("country", opt.code)}
            >
              {opt.label}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">論調</h3>
        <div className="flex flex-wrap gap-2">
          {sentimentOptions.map((opt) => (
            <Badge
              key={opt.value}
              variant={currentSentiment === opt.value ? "default" : "outline"}
              className={
                currentSentiment === opt.value
                  ? "bg-amber-500 text-navy-900 hover:bg-amber-600 cursor-pointer"
                  : "cursor-pointer hover:bg-muted"
              }
              onClick={() => updateFilter("sentiment", opt.value)}
            >
              {opt.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
