import { SignupForm } from './signup-form'

export const metadata = {
  title: 'アカウント作成 | MIKATA',
  description: '3ヶ月無料でMIKATAを始めよう',
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            MIKATA
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            3ヶ月間、全記事無料で読み放題
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
