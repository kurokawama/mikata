import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-primary px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-montserrat text-xl font-bold tracking-wide text-primary-foreground">
            MIKATA
          </span>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-primary-foreground/80 hover:text-primary-foreground"
            >
              ログイン
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-[var(--mikata-amber-dark)]"
            >
              無料で始める
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          世界のミカタ
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          同じニュースを、各国メディアはどう伝えているのか。
          AIが多視点で分析し、日本語で届けます。
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-[var(--mikata-amber-dark)]"
          >
            3ヶ月無料で始める
          </Link>
        </div>
      </section>
    </main>
  )
}
