'use client'

import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'

interface ArticleItem {
  id: number
  title: string
  excerpt: string
  category: string
  image: string
  sentiment: 'positive' | 'negative' | 'neutral'
  author: string
  date: string
  views: number
}

const articles: ArticleItem[] = [
  {
    id: 1,
    title: '再生可能エネルギーへの投資が過去最高に',
    excerpt: '世界中で企業や政府が再生可能エネルギーへの投資を加速させている。',
    category: 'テクノロジー',
    image: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzE2MjEzRSIvPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMjJDNTVFIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=")',
    sentiment: 'positive',
    author: '田中太郎',
    date: '2025年4月8日',
    views: 12540,
  },
  {
    id: 2,
    title: 'バスケットボール：オリンピック予選の試合結果',
    excerpt: '男子バスケットボールチームがオリンピック予選で重要な勝利を収めた。',
    category: 'スポーツ',
    image: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzE2MjEzRSIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iOTAiIGZpbGw9IiNGNTlFMEIiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+")',
    sentiment: 'positive',
    author: '佐藤花子',
    date: '2025年4月9日',
    views: 8920,
  },
  {
    id: 3,
    title: '世界経済：インフレ圧力が続く',
    excerpt: '多くの先進国でインフレが続いており、中央銀行は対策に苦慮している。',
    category: '経済',
    image: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzE2MjEzRSIvPjxwb2x5Z29uIHBvaW50cz0iNDAgMjAwIDEyMCAxMDAgMjAwIDEyMCAyODAgNjAgNDAgMjAwIiBmaWxsPSIjRUY0NDQ0IiBmaWxsLW9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==")',
    sentiment: 'negative',
    author: '山田次郎',
    date: '2025年4月7日',
    views: 15230,
  },
  {
    id: 4,
    title: 'スペース探査：火星への新たな計画',
    excerpt: '各国の宇宙機関が火星探査の次のミッションを計画している。',
    category: 'サイエンス',
    image: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzE2MjEzRSIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNjAiIGZpbGw9IiNGNTlFMEIiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PC9zdmc+")',
    sentiment: 'neutral',
    author: '木村美咲',
    date: '2025年4月9日',
    views: 9870,
  },
]

function getSentimentColor(sentiment: string) {
  switch (sentiment) {
    case 'positive':
      return 'text-[#22C55E]'
    case 'negative':
      return 'text-[#EF4444]'
    default:
      return 'text-[#9CA3AF]'
  }
}

function getSentimentLabel(sentiment: string) {
  switch (sentiment) {
    case 'positive':
      return 'ポジティブ'
    case 'negative':
      return 'ネガティブ'
    default:
      return 'ニュートラル'
  }
}

export function ArticlesGrid() {
  return (
    <section className="bg-[#F8F9FA] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] font-['Newsreader'] mb-2">
            注目の記事
          </h2>
          <p className="text-[#4B5563]">世界のニュースを複数の視点でお届けします</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)] transition-shadow bg-white border-[#E5E7EB] rounded-xl"
            >
              {/* Image Container */}
              <div className="relative h-48 md:h-56 bg-[#16213E] overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: article.image,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 md:p-6 space-y-4">
                {/* Category Badge */}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-[#E5E7EB] text-[#4B5563] hover:bg-[#E5E7EB]">
                    {article.category}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-[#1A1A2E] font-['Newsreader'] line-clamp-2 leading-tight">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-[#4B5563] line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                <Separator className="bg-[#E5E7EB]" />

                {/* Footer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#F59E0B] text-[#1A1A2E] text-xs font-bold">
                        {article.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-xs">
                      <p className="font-medium text-[#1A1A2E]">{article.author}</p>
                      <p className="text-[#9CA3AF]">{article.date}</p>
                    </div>
                  </div>
                  <div className={`text-xs font-medium ${getSentimentColor(article.sentiment)}`}>
                    {getSentimentLabel(article.sentiment)}
                  </div>
                </div>

                {/* Views */}
                <div className="text-xs text-[#9CA3AF] pt-2">
                  {article.views.toLocaleString('ja-JP')} 閲覧
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
