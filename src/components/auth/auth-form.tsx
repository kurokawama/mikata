"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

interface AuthFormProps {
  type: "login" | "signup" | "reset";
  action: (
    state: { error?: string; success?: string } | null,
    formData: FormData
  ) => Promise<{ error?: string; success?: string } | null>;
  redirectParam?: string;
  message?: string;
}

export function AuthForm({ type, action, redirectParam, message }: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  const titles = {
    login: "ログイン",
    signup: "アカウント作成",
    reset: "パスワードリセット",
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-heading font-bold text-primary">
              MI<span className="text-amber-500">KA</span>TA
            </span>
          </Link>
          <CardTitle className="text-xl">{titles[type]}</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className="mb-4 border-amber-200 bg-amber-50 text-amber-800">
              {message}
            </Alert>
          )}
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
            {redirectParam && (
              <input type="hidden" name="redirect" value={redirectParam} />
            )}

            {type === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="displayName">表示名</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  required
                  placeholder="あなたの表示名"
                />
              </div>
            )}

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

            {type !== "reset" && (
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="8文字以上"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-amber-500 text-navy-900 hover:bg-amber-400 font-semibold"
              disabled={isPending}
            >
              {isPending ? "処理中..." : titles[type]}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {type === "login" && (
              <>
                <Link
                  href="/reset-password"
                  className="text-amber-600 hover:text-amber-700"
                >
                  パスワードを忘れた方
                </Link>
                <span className="mx-2">·</span>
                <Link
                  href="/signup"
                  className="text-amber-600 hover:text-amber-700"
                >
                  アカウント作成
                </Link>
              </>
            )}
            {type === "signup" && (
              <>
                既にアカウントをお持ちですか？{" "}
                <Link
                  href="/login"
                  className="text-amber-600 hover:text-amber-700"
                >
                  ログイン
                </Link>
              </>
            )}
            {type === "reset" && (
              <Link
                href="/login"
                className="text-amber-600 hover:text-amber-700"
              >
                ログインに戻る
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
