/* v0-generated — adapted from components/generated/subscribepage */
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { PricingCards } from './pricing-cards'
import { TrustSection } from './trust-section'

export const metadata: Metadata = {
  title: 'プレミアム会員 — MIKATA',
  description: 'MIKATAプレミアムで全記事読み放題。月額980円・年額9,800円。3ヶ月無料トライアル。',
}

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-16 sm:py-20 text-center" aria-label="サブスクリプション">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded text-sm"
              style={{ backgroundColor: '#FEF3C7', borderLeft: '3px solid #F59E0B' }}
            >
              <span className="text-[#EF4444] text-lg">&#9654;</span>
              <span className="text-[#1A1A2E]">
                あなたは月に24回以上の記事を購読されました
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A2E] leading-tight mb-4 text-balance font-serif">
              世界のミカタを、もっと深く
            </h1>
          </div>
        </section>

        <PricingCards />

        {/* Guarantee quote */}
        <section className="w-full py-10 text-center" aria-label="解約保証">
          <div className="mx-auto max-w-xl px-4">
            <blockquote className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] text-balance font-serif">
              「いつでも即解約可能」
            </blockquote>
          </div>
        </section>

        <TrustSection />

        {/* Watermark section */}
        <section className="w-full py-12 overflow-hidden" aria-hidden="true">
          <div className="mx-auto max-w-7xl px-4">
            <div className="relative flex items-center justify-center rounded-2xl overflow-hidden bg-[#E8E8F0]" style={{ minHeight: '140px' }}>
              <span className="select-none text-[clamp(48px,12vw,140px)] font-bold tracking-widest text-[#D1D5DB] leading-none py-8 font-montserrat">
                JOURNALISM
              </span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
