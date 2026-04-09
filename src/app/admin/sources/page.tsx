import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import type { MediaSource } from "@/types/database";

export default async function AdminSourcesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("media_sources")
    .select("*")
    .order("country_code");

  const sources = (data ?? []) as MediaSource[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy-800">ソース管理</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>メディアソース一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {sources.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              ソースがまだありません
            </p>
          ) : (
            <div className="divide-y">
              {sources.map((source) => (
                <div
                  key={source.id}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy-800">
                      {source.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {source.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Badge variant="outline">{source.country_code}</Badge>
                    <Badge variant="outline">
                      信頼度 {source.reliability_score}
                    </Badge>
                    <Badge
                      className={
                        source.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {source.is_active ? "有効" : "無効"}
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
