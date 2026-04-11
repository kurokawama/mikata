/* v0-generated — Privacy Policy */
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'

export const metadata: Metadata = {
  title: 'プライバシーポリシー — MIKATA',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-[#1A1A2E] font-serif mb-8">プライバシーポリシー</h1>
          <div className="prose prose-sm max-w-none text-[#4B5563] space-y-6">
            <p>最終更新日: 2026年4月11日</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">1. 収集する情報</h2>
            <p>本サービスでは、以下の情報を収集します：メールアドレス、表示名、閲覧履歴、お気に入りジャンル設定。有料プランご利用の場合は、Stripeを通じた決済情報（カード番号等は本サービスでは保持しません）。</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">2. 利用目的</h2>
            <p>収集した情報は、サービス提供・改善、パーソナライズされたコンテンツ配信、課金管理に利用します。マーケティング目的での第三者提供は行いません。</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">3. 情報の保護</h2>
            <p>情報は暗号化された通信（TLS）を通じて送受信され、Supabase上でRLS（Row Level Security）によりアクセス制御されています。</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">4. Cookie</h2>
            <p>本サービスでは認証管理のためにCookieを使用します。サードパーティのトラッキングCookieは使用しません。</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">5. お問い合わせ</h2>
            <p>個人情報に関するお問い合わせは、サービス内のお問い合わせフォームよりご連絡ください。</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
