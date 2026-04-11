/* v0-generated — Tokushoho (Specified Commercial Transaction Act) */
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 — MIKATA',
}

export default function TokushohoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-[#1A1A2E] font-serif mb-8">特定商取引法に基づく表記</h1>
          <div className="prose prose-sm max-w-none text-[#4B5563]">
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-[#E5E7EB]">
                <tr>
                  <td className="py-3 pr-4 font-semibold text-[#1A1A2E] w-40">販売業者</td>
                  <td className="py-3">MIKATA運営事務局</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-[#1A1A2E]">運営統括責任者</td>
                  <td className="py-3">黒川</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-[#1A1A2E]">所在地</td>
                  <td className="py-3">請求があった場合に遅滞なく開示いたします</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-[#1A1A2E]">連絡先</td>
                  <td className="py-3">サービス内のお問い合わせフォームよりご連絡ください</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-[#1A1A2E]">販売価格</td>
                  <td className="py-3">月額プラン: 980円（税込）/ 年額プラン: 9,800円（税込）</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-[#1A1A2E]">支払方法</td>
                  <td className="py-3">クレジットカード（Stripe経由）</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-[#1A1A2E]">支払時期</td>
                  <td className="py-3">申込み時に即時決済</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-[#1A1A2E]">サービス提供時期</td>
                  <td className="py-3">決済完了後、即時</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-[#1A1A2E]">返品・キャンセル</td>
                  <td className="py-3">いつでもキャンセル可能。キャンセル後は次回請求日まで利用可能。日割り返金はいたしません。</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
