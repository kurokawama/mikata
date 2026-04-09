import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Users, Radio, TrendingUp, MessageSquare, Bookmark } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: articleCount },
    { count: sourceCount },
    { count: publishedCount },
    { count: userCount },
    { count: contactCount },
    { count: bookmarkCount },
  ] = await Promise.all([
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("media_sources").select("*", { count: "exact", head: true }),
    supabase
      .from("articles")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("bookmarks").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "総記事数", value: articleCount ?? 0, icon: Newspaper },
    { label: "公開中", value: publishedCount ?? 0, icon: TrendingUp },
    { label: "メディアソース", value: sourceCount ?? 0, icon: Radio },
    { label: "ユーザー", value: userCount ?? 0, icon: Users },
    { label: "未対応問い合わせ", value: contactCount ?? 0, icon: MessageSquare },
    { label: "ブックマーク", value: bookmarkCount ?? 0, icon: Bookmark },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-800 mb-8">ダッシュボード</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-navy-800">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
