/* v0-generated — media source detail page */
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  params: Promise<{ 'media-slug': string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'media-slug': slug } = await params
  const name = slug.replace(/-/g, ' ')
  return {
    title: `${name} — メディアソース — MIKATA`,
    description: `${name}のメディア解説ページ。信頼性ランク・対象ジャンル・配信言語を確認できます。`,
  }
}

function reliabilityLabel(r: string) {
  if (r === 'A') return { text: 'A — 最高信頼', color: 'bg-[#22C55E] text-white' }
  if (r === 'B') return { text: 'B — 標準', color: 'bg-[#F59E0B] text-black' }
  return { text: 'C — 参考', color: 'bg-[#9CA3AF] text-white' }
}

export default async function MediaDetailPage({ params }: Props) {
  const { 'media-slug': slug } = await params
  const supabase = await createClient()

  const { data: sources } = await supabase
    .from('media_sources')
    .select('id, name, country, country_code, language, reliability, genre, feed_type, check_interval_minutes, terms_url, active')
    .eq('active', true)

  const source = sources?.find(
    (s) => s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug,
  )

  if (!source) notFound()

  const rel = reliabilityLabel(source.reliability)

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-[#1A1A2E] py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Link href="/sources" className="text-[#F59E0B] hover:text-[#D97706] text-sm mb-4 inline-block">
              &larr; メディアソース一覧
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              {source.name}
            </h1>
            <p className="mt-2 text-[#9CA3AF]">
              {source.country} / {source.language}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <Card className="border-[#D1D5DB] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <CardHeader>
              <CardTitle className="text-[#1A1A2E] font-serif">メディア情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#4B5563]">国</p>
                  <p className="font-medium text-[#1A1A2E]">{source.country}</p>
                </div>
                <div>
                  <p className="text-sm text-[#4B5563]">言語</p>
                  <p className="font-medium text-[#1A1A2E]">{source.language}</p>
                </div>
                <div>
                  <p className="text-sm text-[#4B5563]">対象ジャンル</p>
                  <p className="font-medium text-[#1A1A2E]">{source.genre ?? '全般'}</p>
                </div>
                <div>
                  <p className="text-sm text-[#4B5563]">信頼性ランク</p>
                  <Badge className={`${rel.color} mt-1`}>{rel.text}</Badge>
                </div>
                <div>
                  <p className="text-sm text-[#4B5563]">フィード形式</p>
                  <p className="font-medium text-[#1A1A2E] uppercase">{source.feed_type}</p>
                </div>
                <div>
                  <p className="text-sm text-[#4B5563]">チェック間隔</p>
                  <p className="font-medium text-[#1A1A2E]">{source.check_interval_minutes}分</p>
                </div>
              </div>
              {source.terms_url && (
                <div>
                  <p className="text-sm text-[#4B5563]">利用規約</p>
                  <a
                    href={source.terms_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F59E0B] hover:text-[#D97706] text-sm"
                  >
                    {source.terms_url}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-center">
            <Button asChild variant="outline" className="border-[#D1D5DB] text-[#1A1A2E]">
              <Link href="/sources">&larr; ソース一覧に戻る</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
