import { Card, CardContent } from "@/components/ui/card";
import { Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FreeTrialCountdownProps {
  daysRemaining: number;
  trialEndDate: string;
}

export function FreeTrialCountdown({ daysRemaining, trialEndDate }: FreeTrialCountdownProps) {
  const isUrgent = daysRemaining <= 7;
  const formattedDate = new Date(trialEndDate).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className={isUrgent ? "border-amber-400 bg-amber-50" : "border-blue-200 bg-blue-50"}>
      <CardContent className="flex items-start gap-3 p-4">
        {isUrgent ? (
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500 mt-0.5" />
        ) : (
          <Clock className="h-5 w-5 flex-shrink-0 text-blue-500 mt-0.5" />
        )}
        <div className="flex-1">
          <p className={"text-sm font-semibold " + (isUrgent ? "text-amber-800" : "text-blue-800")}>
            無料期間終了まであと <span className="text-2xl font-bold">{daysRemaining}</span> 日
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formattedDate}以降は1日1記事まで閲覧できます
          </p>
          <Button
            size="sm"
            className="mt-3 bg-amber-500 text-white hover:bg-amber-400 text-xs h-7"
            render={<Link href="/subscribe" />}
          >
            プレミアムプランに登録する
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
