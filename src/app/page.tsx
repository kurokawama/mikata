/* v0-generated — adapted from components/generated/toppage */
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { ArticleCard } from '@/components/shared/article-card'
import type { Article } from '@/types/database'

async function getPublishedArticles(): Promise<Article[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(8)
  return (data as Article[] | null) ?? []
}

export default async function HomePage() {
  const articles = await getPublishedArticles()

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-[#1A1A2E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="border-[#9CA3AF] text-[#E8E8F0] w-fit">
                世界のミカタ — 多視点ニュース
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white font-serif leading-tight">
                同じニュースを、世界はどう見たか
              </h1>
              <p className="text-[#E8E8F0] text-lg leading-relaxed max-w-md">
                各国メディアの論調をAIが分析。日本では伝わらない視点を、毎朝お届けします。
              </p>
              <Button asChild className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium py-3 px-8">
                <Link href="/signup">3ヶ月無料で始める</Link>
              </Button>
            </div>

            <div className="relative h-96 md:h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#16213E] to-[#0f172a] rounded-2xl overflow-hidden">
                <svg viewBox="0 0 1000 600" className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <rect width="1000" height="600" fill="none" />
                  <circle cx="500" cy="300" r="250" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.5" />
                  <circle cx="500" cy="300" r="180" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.3" />
                  <g opacity="0.3" stroke="#E8E8F0" strokeWidth="1" fill="none">
                    <line x1="200" y1="100" x2="800" y2="100" />
                    <line x1="200" y1="200" x2="800" y2="200" />
                    <line x1="200" y1="300" x2="800" y2="300" />
                    <line x1="200" y1="400" x2="800" y2="400" />
                    <line x1="200" y1="500" x2="800" y2="500" />
                    <line x1="300" y1="50" x2="300" y2="550" />
                    <line x1="400" y1="50" x2="400" y2="550" />
                    <line x1="500" y1="50" x2="500" y2="550" />
                    <line x1="600" y1="50" x2="600" y2="550" />
                    <line x1="700" y1="50" x2="700" y2="550" />
                  </g>
                  <circle cx="350" cy="250" r="6" fill="#F59E0B" opacity="0.8" />
                  <circle cx="650" cy="280" r="4" fill="#F59E0B" opacity="0.6" />
                  <circle cx="450" cy="400" r="5" fill="#F59E0B" opacity="0.7" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <p className="text-[#F59E0B] font-montserrat font-bold text-6xl opacity-20">MIKATA</p>
                <p className="text-[#9CA3AF] font-montserrat font-bold text-3xl opacity-10 mt-2">世界のミカタ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] font-serif mb-2">
              注目の記事
            </h2>
            <p className="text-[#4B5563]">世界のニュースを複数の視点でお届けします</p>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.analysis_text ? article.analysis_text.slice(0, 120) + '...' : null}
                  genre={article.genre}
                  subGenre={article.sub_genre}
                  sentimentSummary={article.sentiment_summary}
                  publishedAt={article.published_at}
                  sourcesCount={article.sources?.length ?? 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#9CA3AF]">
              <p className="text-lg">記事を準備中です</p>
              <p className="text-sm mt-2">最新のニュースを間もなくお届けします</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1A1A2E] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#16213E] rounded-2xl p-8 md:p-16 space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif leading-tight">
              経験を積め。
              <br />
              情報が信頼となる。
            </h2>
            <p className="text-[#E8E8F0] text-lg leading-relaxed max-w-2xl mx-auto">
              複数の視点からニュースを読むことで、より深い理解が生まれます。世界の出来事を様々な角度から学べるプラットフォーム。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium py-3 px-8">
                <Link href="/signup">今すぐ始める</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#E8E8F0] text-[#E8E8F0] hover:bg-[#16213E] font-medium py-3 px-8">
                <Link href="/about">詳しく知る</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
