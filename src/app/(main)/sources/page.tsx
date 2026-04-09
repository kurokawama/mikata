import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import type { MediaSource } from "@/types/database";

const countryNames: Record<string, string> = {
  JP: "日本",
  US: "アメリカ",
  GB: "イギリス",
  FR: "フランス",
  DE: "ドイツ",
  QA: "カタール",
  CN: "中国",
  KR: "韓国",
};

export default async function SourcesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("media_sources")
    .select("*")
    .eq("is_active", true)
    .order("country_code");

  const sources = (data ?? []) as MediaSource[];

  // Group by country
  const grouped = sources.reduce<Record<string, MediaSource[]>>(
    (acc, source) => {
      const key = source.country_code;
      if (!acc[key]) acc[key] = [];
      acc[key].push(source);
      return acc;
    },
    {}
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">
          メディアソース
        </h1>
        <p className="mt-2 text-muted-foreground">
          MIKATAが分析対象とするメディアソースの一覧です
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([countryCode, countrySources]) => (
          <div key={countryCode}>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
              <Globe className="h-5 w-5 text-amber-500" />
              {countryNames[countryCode] ?? countryCode}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {countrySources.map((source) => (
                <Card key={source.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{source.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-amber-600 hover:text-amber-700 truncate"
                      >
                        {new URL(source.url).hostname}
                      </a>
                      <Badge variant="outline" className="text-xs">
                        信頼度 {source.reliability_score}/10
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
