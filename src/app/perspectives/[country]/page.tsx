/* v0-generated — Country perspectives detail page */
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { Button } from '@/components/ui/button'
import { FEATURED_COUNTRIES } from '../countries-data'

interface Props {
  params: Promise<{ country: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countryId } = await params
  const country = FEATURED_COUNTRIES.find((c) => c.id === countryId)
  return {
    title: country ? `${country.name}の視点 — MIKATA` : '各国視点 — MIKATA',
    description: country
      ? `${country.name}のメディアが報じるニュースの視点と論調分析`
      : '国別のニュース視点分析',
  }
}

export default async function CountryPerspectivePage({ params }: Props) {
  const { country: countryId } = await params
  const country = FEATURED_COUNTRIES.find((c) => c.id === countryId)

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Button
              asChild
              variant="ghost"
              className="text-[#9CA3AF] hover:text-white mb-4 -ml-2"
            >
              <Link href="/perspectives">
                <ArrowLeft className="h-4 w-4 mr-1" />
                各国視点に戻る
              </Link>
            </Button>

            {country ? (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl" aria-hidden="true">{country.flag}</span>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif">
                      {country.name}の視点
                    </h1>
                    <p className="text-[#9CA3AF] text-sm">{country.nameEn}</p>
                  </div>
                </div>
                <p className="text-[#9CA3AF] text-base max-w-xl">
                  {country.name}のメディアが報じるニュースの視点と論調を分析します。
                  {country.sourceCount}メディア、{country.articleCount.toLocaleString('ja-JP')}記事を収録。
                </p>
              </>
            ) : (
              <h1 className="text-3xl font-bold text-white font-serif">国の視点</h1>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center py-16 text-[#9CA3AF]">
            <p className="text-lg">この国の記事を準備中です</p>
            <p className="text-sm mt-2">間もなく各国メディアの視点をお届けします</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
