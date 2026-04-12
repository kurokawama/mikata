import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUser, getProfile } from "@/lib/supabase/server";
import { FreeTrialCountdown } from "@/components/settings/free-trial-countdown";
import { DeleteAccountButton } from "@/components/settings/delete-account-button";
import { PushNotificationButton } from "@/components/settings/push-notification-button";

export default async function SettingsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const profile = await getProfile();
  if (!profile) redirect("/login");

  const subscriptionLabels: Record<string, string> = {
    active: "有効",
    trialing: "トライアル中",
    canceled: "キャンセル済",
    past_due: "支払い遅延",
    incomplete: "未完了",
  };

  // Free trial countdown: 91 days from registration
  const createdAt = new Date(profile.created_at);
  const trialEndDate = new Date(createdAt.getTime() + 91 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const daysRemaining = Math.ceil(
    (trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const showCountdown =
    daysRemaining > 0 &&
    daysRemaining <= 30 &&
    !profile.subscription_status;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-primary mb-8">
        アカウント設定
      </h1>

      <div className="space-y-6">
        {showCountdown && (
          <FreeTrialCountdown
            daysRemaining={daysRemaining}
            trialEndDate={trialEndDate.toISOString()}
          />
        )}

        <Card>
          <CardHeader>
            <CardTitle>プロフィール</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                表示名
              </label>
              <p className="text-foreground">{profile.display_name ?? "未設定"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                メールアドレス
              </label>
              <p className="text-foreground">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>通知設定</CardTitle>
          </CardHeader>
          <CardContent>
            <PushNotificationButton />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>サブスクリプション</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-muted-foreground">
                ステータス
              </label>
              <Badge
                variant={
                  profile.subscription_status === "active" ||
                  profile.subscription_status === "trialing"
                    ? "default"
                    : "secondary"
                }
              >
                {profile.subscription_status
                  ? subscriptionLabels[profile.subscription_status] ??
                    profile.subscription_status
                  : "未登録"}
              </Badge>
            </div>
            {profile.trial_ends_at && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  トライアル終了日
                </label>
                <p className="text-foreground">
                  {new Date(profile.trial_ends_at).toLocaleDateString("ja-JP")}
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                本日の閲覧数
              </label>
              <p className="text-foreground">
                {profile.daily_article_count} /{" "}
                {profile.subscription_status === "active" ||
                profile.subscription_status === "trialing"
                  ? "無制限"
                  : "1"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-destructive">アカウント削除</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              アカウントを削除すると、すべてのデータが完全に削除され、元に戻すことはできません。
            </p>
            <DeleteAccountButton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
