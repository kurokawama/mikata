import Link from 'next/link'

export const metadata = {
  title: 'メール確認 | MIKATA',
}

export default function ConfirmPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="font-serif text-2xl font-bold text-foreground">
          メールを確認してください
        </h1>
        <p className="text-sm text-muted-foreground">
          ご登録のメールアドレスに確認リンクを送信しました。
          リンクをクリックしてアカウントを有効化してください。
        </p>
        <Link
          href="/login"
          className="inline-block text-sm text-accent hover:underline"
        >
          ログインページに戻る
        </Link>
      </div>
    </div>
  )
}
