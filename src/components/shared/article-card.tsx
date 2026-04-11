/* v0-generated — adapted from components/generated/toppage/components/articles-grid.tsx */
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SentimentBar } from '@/components/shared/sentiment-bar'
import type { SentimentSummary } from '@/types/database'

interface ArticleCardProps {
  id: string
  slug: string
  title: string
  excerpt: string | null
  genre: string
  subGenre: string | null
  sentimentSummary: SentimentSummary | null
  publishedAt: string | null
  sourcesCount: number
}

const genreLabels: Record<string, string> = {
  sports: 'スポーツ',
  economy: '経済',
  gaming: 'ゲーム',
}

const genreRoutes: Record<string, string> = {
  sports: '/sports',
  economy: '/economy',
  gaming: '/gaming',
}

function buildArticleHref(genre: string, subGenre: string | null, slug: string): string {
  const base = genreRoutes[genre] ?? `/${genre}`
  const sub = subGenre ?? 'general'
  return `${base}/${sub}/${slug}`
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  genre,
  subGenre,
  sentimentSummary,
  publishedAt,
  sourcesCount,
}: ArticleCardProps) {
  const href = buildArticleHref(genre, subGenre, slug)
  const genreLabel = genreLabels[genre] ?? genre
  const dateStr = publishedAt
    ? new Date(publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <Link href={href} className="block group">
      <Card className="overflow-hidden hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)] transition-shadow bg-white border-[#E5E7EB] rounded-xl">
        {/* Sentiment mini bar (4px) */}
        <SentimentBar summary={sentimentSummary} size="mini" />

        <div className="p-4 md:p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-[#E5E7EB] text-[#4B5563] hover:bg-[#E5E7EB]">
              {genreLabel}
            </Badge>
            {sourcesCount > 0 && (
              <Badge variant="outline" className="text-[#9CA3AF] border-[#D1D5DB]">
                {sourcesCount} 視点
              </Badge>
            )}
          </div>

          <h3 className="text-lg md:text-xl font-bold text-[#1A1A2E] font-serif line-clamp-2 leading-tight group-hover:text-[#F59E0B] transition-colors">
            {title}
          </h3>

          {excerpt && (
            <p className="text-sm text-[#4B5563] line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}

          <Separator className="bg-[#E5E7EB]" />

          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            {dateStr && <span>{dateStr}</span>}
            {sourcesCount > 0 && (
              <span className="text-[#F59E0B] font-medium">
                各国の視点を見る &rarr;
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
