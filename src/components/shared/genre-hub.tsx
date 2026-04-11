/* v0-generated — shared genre hub layout */
import { createClient } from '@/lib/supabase/server'
import { ArticleCard } from '@/components/shared/article-card'
import type { Article } from '@/types/database'

interface GenreHubProps {
  genre: string
  genreLabel: string
  description: string
}

async function getGenreArticles(genre: string): Promise<Article[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('genre', genre)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(20)
  return (data as Article[] | null) ?? []
}

export async function GenreHub({ genre, genreLabel, description }: GenreHubProps) {
  const articles = await getGenreArticles(genre)

  return (
    <>
      {/* Genre Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-xs font-medium text-[#F59E0B] uppercase tracking-widest mb-2">MIKATA</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif leading-tight">
            {genreLabel}
          </h1>
          <p className="mt-3 text-[#9CA3AF] text-base sm:text-lg max-w-xl">
            {description}
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <p className="text-sm mt-2">最新の{genreLabel}ニュースを間もなくお届けします</p>
          </div>
        )}
      </section>
    </>
  )
}
