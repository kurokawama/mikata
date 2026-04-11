/* v0-generated — adapted from components/generated/subscribepage/app/components/pricing-cards.tsx */
'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

const standardFeatures = [
  'アーカイブへのフルアクセス',
  'AI要約レポート',
  '週刊ニュースレター',
  'エキスパート・ブリーフィング',
]

const premiumFeatures = [
  'アーカイブへのフルアクセス',
  'AI解析レポート',
  '優先ニュースレター',
  'エキスパート・ブリーフィング',
  '独自取材レポート',
  '限定ポッドキャスト',
]

interface PlanCardProps {
  title: string
  subtitle: string
  price: string
  period: string
  features: string[]
  ctaLabel: string
  isPremium?: boolean
  badge?: string
}

function PlanCard({ title, subtitle, price, period, features, ctaLabel, isPremium = false, badge }: PlanCardProps) {
  const [hovered, setHovered] = useState(false)

  if (isPremium) {
    return (
      <div className="relative rounded-xl overflow-hidden flex flex-col bg-[#16213E]">
        {badge && (
          <div className="absolute top-0 right-0 text-xs font-semibold px-3 py-1 rounded-bl-xl tracking-wide bg-[#F59E0B] text-[#1A1A2E]">
            {badge}
          </div>
        )}
        <div className="p-6 pb-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1 text-[#F59E0B]">{subtitle}</p>
          <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
          <div className="flex items-baseline gap-1 mb-5">
            <span className="text-4xl font-bold text-white font-serif">{price}</span>
            <span className="text-sm text-[#9CA3AF]">{period}</span>
          </div>
          <ul className="space-y-2.5 mb-6">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check size={15} className="mt-0.5 flex-shrink-0 text-[#F59E0B]" />
                <span className="text-sm leading-relaxed text-[#E8E8F0]">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 pt-0">
          <a
            href="/api/checkout?plan=yearly"
            className="block w-full text-center py-3 rounded-lg text-sm font-semibold transition-colors"
            style={{ backgroundColor: hovered ? '#D97706' : '#F59E0B', color: '#1A1A2E' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label={ctaLabel}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="relative rounded-xl flex flex-col bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-[#E5E7EB]">
      <div className="p-6 pb-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1 text-[#9CA3AF]">{subtitle}</p>
        <h3 className="text-xl font-bold mb-3 text-[#1A1A2E]">{title}</h3>
        <div className="flex items-baseline gap-1 mb-5">
          <span className="text-4xl font-bold text-[#1A1A2E] font-serif">{price}</span>
          <span className="text-sm text-[#9CA3AF]">{period}</span>
        </div>
        <ul className="space-y-2.5 mb-6">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check size={15} className="mt-0.5 flex-shrink-0 text-[#22C55E]" />
              <span className="text-sm leading-relaxed text-[#4B5563]">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 pt-0">
        <a
          href="/api/checkout?plan=monthly"
          className="block w-full text-center py-3 rounded-lg text-sm font-semibold border border-[#1A1A2E] text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white transition-all"
          aria-label={ctaLabel}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}

export function PricingCards() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <PlanCard
          subtitle="スタンダード"
          title="月額プラン"
          price="980"
          period="円 / 月"
          features={standardFeatures}
          ctaLabel="プランを始める"
        />
        <PlanCard
          subtitle="プレミアム"
          title="年額プラン"
          price="9,800"
          period="円 / 年"
          features={premiumFeatures}
          ctaLabel="今すぐ登録する"
          isPremium
          badge="おすすめ"
        />
      </div>
    </section>
  )
}
