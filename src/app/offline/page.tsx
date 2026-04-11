import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'オフライン — MIKATA',
  description: 'インターネット接続がありません。',
  robots: { index: false },
}

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FA] px-4 text-center">
      <div className="space-y-6">
        <div className="text-6xl">📡</div>
        <h1 className="font-serif text-3xl font-bold text-[#1A1A2E]">
          オフラインです
        </h1>
        <p className="max-w-md text-[#4B5563] leading-relaxed">
          インターネット接続がありません。
          キャッシュ済みの記事は引き続き閲覧できます。
        </p>
        <p className="text-sm text-[#9CA3AF]">
          接続が回復したら、ページを再読み込みしてください。
        </p>
      </div>
    </div>
  )
}
