import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import type { AdPlacement } from "@/types/database";

const positionLabels: Record<string, string> = {
  article_between: "記事間",
  sidebar: "サイドバー",
  header: "ヘッダー",
  footer: "フッター",
};

export default async function AdminAdsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("ad_placements")
    .select("*")
    .order("position");

  const placements = (data ?? []) as AdPlacement[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy-800">広告管理</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>広告枠一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {placements.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                広告枠がまだ設定されていません
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                AdSense承認後に広告枠を追加してください
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {placements.map((placement) => (
                <div
                  key={placement.id}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <p className="text-sm font-medium text-navy-800">
                      {placement.slot_name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {positionLabels[placement.position] ?? placement.position}
                    </p>
                  </div>
                  <Badge
                    className={
                      placement.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {placement.is_active ? "有効" : "無効"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
