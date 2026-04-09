import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-800 mb-8">管理設定</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>サイト設定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-muted-foreground">サイト名</span>
                <span className="font-medium">MIKATA</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-muted-foreground">無料記事上限</span>
                <span className="font-medium">1記事/日</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-muted-foreground">トライアル期間</span>
                <span className="font-medium">90日</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">月額料金</span>
                <span className="font-medium">¥980</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
