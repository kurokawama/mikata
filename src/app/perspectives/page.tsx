/* v0-generated — adapted from components/generated/perspectivespage */
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { PerspectivesHero } from './perspectives-hero'
import { CountriesGrid } from './countries-grid'
import { PremiumCTA } from './premium-cta'

export const metadata: Metadata = {
  title: '各国視点 — MIKATA',
  description: '50カ国以上のメディア視点から世界のニュースを読み解く。国別の論調分析をAIが提供。',
}

export default function PerspectivesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PerspectivesHero />
        <CountriesGrid />
        <PremiumCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
