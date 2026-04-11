import { LoginForm } from './login-form'

export const metadata = {
  title: 'ログイン | MIKATA',
  description: 'MIKATAにログイン',
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            MIKATA
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            アカウントにログイン
          </p>
        </div>
        <LoginForm searchParams={searchParams} />
      </div>
    </div>
  )
}
