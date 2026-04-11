/* v0-generated — Terms of Service */
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'

export const metadata: Metadata = {
  title: '利用規約 — MIKATA',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-[#1A1A2E] font-serif mb-8">利用規約</h1>
          <div className="prose prose-sm max-w-none text-[#4B5563] space-y-6">
            <p>最終更新日: 2026年4月11日</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">第1条（適用）</h2>
            <p>本規約は、MIKATA（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは本サービスを利用することで、本規約に同意したものとみなされます。</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">第2条（サービス内容）</h2>
            <p>本サービスは、AIを活用して各国メディアの論調を分析し、日本語で多視点ニュースを提供するサービスです。コンテンツにはAI生成による独自分析と、各国メディアへのリンクが含まれます。</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">第3条（利用料金）</h2>
            <p>本サービスは無料プランと有料プラン（月額980円、年額9,800円）を提供します。有料プランの決済にはStripeを使用します。料金は予告なく変更される場合があります。</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">第4条（禁止事項）</h2>
            <p>本サービスのコンテンツを無断で複製・再配布すること、不正アクセス、他のユーザーへの迷惑行為を禁止します。</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">第5条（免責事項）</h2>
            <p>本サービスで提供される情報はAIによる分析を含み、その正確性を保証するものではありません。投資判断等の重要な意思決定に際しては、必ず原典をご確認ください。</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">第6条（準拠法）</h2>
            <p>本規約は日本法に準拠し、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
