'use client'

import { useActionState } from 'react'
import { resetPassword } from './actions'
import Link from 'next/link'

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(
    async (
      _prev: { error?: string; success?: boolean } | null,
      formData: FormData,
    ) => {
      return resetPassword(formData)
    },
    null,
  )

  if (state?.success) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          パスワードリセット用のメールを送信しました。
          メールのリンクからパスワードを再設定してください。
        </p>
        <Link href="/login" className="text-sm text-accent hover:underline">
          ログインページに戻る
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-[var(--mikata-amber-dark)] disabled:opacity-50"
      >
        {pending ? '送信中...' : 'リセットメールを送信'}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="text-accent hover:underline">
          ログインに戻る
        </Link>
      </p>
    </form>
  )
}
