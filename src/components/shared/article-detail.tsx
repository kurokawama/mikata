/* v0-generated — adapted from components/generated/articledetail */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SentimentBar } from '@/components/shared/sentiment-bar'
import { Heart, Share2, Bookmark, TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react'
import type { Article, SentimentLabel } from '@/types/database'

const genreLabels: Record<string, string> = {
  sports: 'スポーツ',
  economy: '経済',
  gaming: 'ゲーム',
}

function SentimentIcon({ label }: { label: SentimentLabel }) {
  if (label === 'positive') return <TrendingUp size={14} className="text-[#22C55E]" />
  if (label === 'negative') return <TrendingDown size={14} className="text-[#EF4444]" />
  return <Minus size={14} className="text-[#9CA3AF]" />
}

export function ArticleDetail({ article }: { article: Article }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const dateStr = article.published_at
    ? new Date(article.published_at).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <>
      {/* Article Header */}
      <div className="w-full bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-4">
            <Badge variant="secondary" className="bg-[#E5E7EB] text-[#4B5563]">
              {genreLabels[article.genre] ?? article.genre}
            </Badge>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-4 leading-tight text-balance">
            {article.title}
          </h1>

          {article.sentiment_summary && (
            <div className="mb-6">
              <SentimentBar summary={article.sentiment_summary} size="full" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
            <div className="flex flex-col gap-2 text-sm text-[#9CA3AF]">
              <div>MIKATA編集部</div>
              <div className="flex gap-3">
                {dateStr && <span>{dateStr}</span>}
                <span>&middot;</span>
                <span>{article.sources?.length ?? 0} 各国視点</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)} className={isLiked ? 'text-red-500' : ''}>
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsBookmarked(!isBookmarked)} className={isBookmarked ? 'text-[#F59E0B]' : ''}>
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="prose prose-sm sm:prose max-w-none">
          <div className="text-[#1A1A2E] space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-pretty whitespace-pre-wrap">
              {article.analysis_text ?? '本文なし'}
            </p>
          </div>
        </div>
      </article>

      {/* Perspectives Section */}
      {article.sources && article.sources.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Separator className="mb-8 bg-[#E5E7EB]" />
          <h2 className="text-xl font-bold text-[#1A1A2E] font-serif mb-6">各国メディアの視点</h2>
          <div className="space-y-4">
            {article.sources.map((src, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border border-[#E5E7EB] rounded-xl p-4 hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)] transition-shadow"
                style={{ borderLeftWidth: '4px', borderLeftColor: src.sentiment === 'positive' ? '#22C55E' : src.sentiment === 'negative' ? '#EF4444' : '#9CA3AF' }}
              >
                <SentimentIcon label={src.sentiment} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#1A1A2E] text-sm">
                      {src.country} / {src.media_name}
                    </span>
                  </div>
                  <p className="text-[#4B5563] text-sm mt-1">{src.summary_80chars}</p>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F59E0B] hover:text-[#D97706] text-xs flex items-center gap-0.5 mt-2"
                  >
                    <ExternalLink size={10} />
                    ソースを開く
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Subscribe CTA for non-premium */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#16213E] rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white font-serif mb-3">
            もっと深く読み解く
          </h3>
          <p className="text-[#9CA3AF] mb-6">
            プレミアム会員なら全記事・全視点が読み放題
          </p>
          <Button asChild className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold px-8">
            <Link href="/subscribe">プレミアムに登録</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
