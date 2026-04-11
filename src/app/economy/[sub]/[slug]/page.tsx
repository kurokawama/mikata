/* v0-generated — adapted from components/generated/articledetail */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { ArticleDetail } from '@/components/shared/article-detail'
import { NewsArticleJsonLd } from '@/components/seo/json-ld'
import type { Article } from '@/types/database'

interface Props {
  params: Promise<{ sub: string; slug: string }>
}

async function getArticle(slug: string): Promise<Article | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('genre', 'economy')
    .eq('status', 'published')
    .single()
  return (data as Article | null) ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: '記事が見つかりません — MIKATA' }
  return {
    title: `${article.title} — MIKATA`,
    description: article.analysis_text?.slice(0, 160) ?? undefined,
    openGraph: {
      title: article.title,
      description: article.analysis_text?.slice(0, 160) ?? undefined,
      type: 'article',
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at ?? undefined,
    },
  }
}

export default async function EconomyArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <NewsArticleJsonLd article={article} />
        <ArticleDetail article={article} />
      </main>
      <SiteFooter />
    </div>
  )
}
