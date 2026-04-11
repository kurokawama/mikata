/* v0-generated — Sports genre hub */
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { GenreHub } from '@/components/shared/genre-hub'

export const metadata: Metadata = {
  title: 'スポーツ — MIKATA',
  description: '世界のスポーツニュースを各国メディアの視点で多角的に分析。サッカー、野球、バスケットボールなど。',
}

export default function SportsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <GenreHub
          genre="sports"
          genreLabel="スポーツ"
          description="世界のスポーツニュースを各国メディアの視点で多角的に分析します"
        />
      </main>
      <SiteFooter />
    </div>
  )
}
