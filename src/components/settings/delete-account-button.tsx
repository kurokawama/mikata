"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteAccount } from "@/app/(main)/settings/actions";

export function DeleteAccountButton() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const CONFIRM_PHRASE = "account_delete";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (confirmText !== CONFIRM_PHRASE) {
      setError(`"" と入力してください`);
      return;
    }
    setIsPending(true);
    setError("");
    const result = await deleteAccount();
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
    // On success, the server redirects to /
  };

  if (!open) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        アカウントを削除する
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <div className="flex items-start gap-2 mb-3">
        <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-destructive">本当に削除しますか？</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            すべての記事履歴・ブックマーク・アカウント情報が削除されます。
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground">
            確認のため <span className="font-mono font-bold text-destructive">{CONFIRM_PHRASE}</span> と入力してください
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={CONFIRM_PHRASE}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-destructive/30"
            autoComplete="off"
          />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <div className="flex gap-2">
          <Button
            type="submit"
            variant="destructive"
            size="sm"
            disabled={isPending || confirmText !== CONFIRM_PHRASE}
            className="text-xs"
          >
            {isPending ? "削除中..." : "削除する"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => { setOpen(false); setConfirmText(""); setError(""); }}
            className="text-xs"
          >
            キャンセル
          </Button>
        </div>
      </form>
    </div>
  );
}
