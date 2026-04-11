/* v0-generated — adapted from components/generated/articledetail */
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { ArticleDetail } from '@/components/shared/article-detail'
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
    .eq('genre', 'gaming')
    .eq('status', 'published')
    .single()
  return (data as Article | null) ?? null
}

export default async function GamingArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <ArticleDetail article={article} />
      </main>
      <SiteFooter />
    </div>
  )
}
