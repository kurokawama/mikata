/* v0-generated — Gaming genre hub */
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { GenreHub } from '@/components/shared/genre-hub'

export const metadata: Metadata = {
  title: 'ゲーム・eスポーツ — MIKATA',
  description: '世界のゲーム・eスポーツニュースを各国メディアの視点で多角的に分析。',
}

export default function GamingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <GenreHub
          genre="gaming"
          genreLabel="ゲーム・eスポーツ"
          description="世界のゲーム・eスポーツニュースを各国メディアの視点で多角的に分析します"
        />
      </main>
      <SiteFooter />
    </div>
  )
}
