"use client";

import { useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { submitContact } from "@/app/contact/actions";

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContact, null);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-primary mb-8">
        お問い合わせ
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>ご質問・ご要望をお聞かせください</CardTitle>
        </CardHeader>
        <CardContent>
          {state?.error && (
            <Alert className="mb-4 border-destructive/20 bg-destructive/5 text-destructive">
              {state.error}
            </Alert>
          )}
          {state?.success && (
            <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
              {state.success}
            </Alert>
          )}

          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">お名前</Label>
              <Input id="name" name="name" required placeholder="山田太郎" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">件名</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="お問い合わせの件名"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">メッセージ</Label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="お問い合わせ内容を入力してください"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-500 text-navy-900 hover:bg-amber-400 font-semibold"
              disabled={isPending}
            >
              {isPending ? "送信中..." : "送信する"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
