/* v0-generated — Economy genre hub */
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { GenreHub } from '@/components/shared/genre-hub'

export const metadata: Metadata = {
  title: '経済・マーケット — MIKATA',
  description: '世界の経済・マーケットニュースを各国メディアの視点で多角的に分析。株式、為替、暗号資産など。',
}

export default function EconomyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <GenreHub
          genre="economy"
          genreLabel="経済・マーケット"
          description="世界の経済・マーケットニュースを各国メディアの視点で多角的に分析します"
        />
      </main>
      <SiteFooter />
    </div>
  )
}
