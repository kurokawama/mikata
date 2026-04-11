import { ResetPasswordForm } from './reset-password-form'

export const metadata = {
  title: 'パスワードリセット | MIKATA',
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            MIKATA
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            パスワードリセット
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  )
}
