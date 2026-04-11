/* v0-generated — sources listing page */
import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'メディアソース一覧 — MIKATA',
  description: 'MIKATAが参照する各国メディアソースの一覧です。',
}

function reliabilityColor(r: string) {
  if (r === 'A') return 'bg-[#22C55E] text-white'
  if (r === 'B') return 'bg-[#F59E0B] text-black'
  return 'bg-[#9CA3AF] text-white'
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default async function SourcesPage() {
  const supabase = await createClient()
  const { data: sources } = await supabase
    .from('media_sources')
    .select('id, name, country, country_code, language, reliability, genre, active')
    .eq('active', true)
    .order('country', { ascending: true })

  const grouped = (sources ?? []).reduce<Record<string, typeof sources>>((acc, s) => {
    const key = s.country
    if (!acc[key]) acc[key] = []
    acc[key]!.push(s)
    return acc
  }, {})

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-[#1A1A2E] py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              メディアソース
            </h1>
            <p className="mt-2 text-[#9CA3AF]">
              MIKATAが参照する各国のメディアソース一覧。信頼性ランクはA（最高）〜C。
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {Object.entries(grouped).map(([country, mediaSources]) => (
            <div key={country}>
              <h2 className="text-xl font-bold text-[#1A1A2E] font-serif mb-4 flex items-center gap-2">
                <span className="text-2xl">{mediaSources?.[0]?.country_code && getFlagEmoji(mediaSources[0].country_code)}</span>
                {country}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {mediaSources?.map((source) => (
                  <Link key={source.id} href={`/sources/${slugify(source.name)}`}>
                    <Card className="border-[#D1D5DB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)] transition-shadow cursor-pointer">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-[#1A1A2E] flex items-center justify-between">
                          {source.name}
                          <Badge className={`text-xs ${reliabilityColor(source.reliability)}`}>
                            {source.reliability}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-[#4B5563]">
                          {source.language} / {source.genre ?? '全般'}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(grouped).length === 0 && (
            <p className="text-center text-[#9CA3AF] py-12">
              メディアソースはまだ登録されていません。
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function getFlagEmoji(countryCode: string): string {
  const code = countryCode.toUpperCase()
  if (code.length !== 2) return ''
  return String.fromCodePoint(
    ...code.split('').map((c) => 0x1f1e6 - 65 + c.charCodeAt(0)),
  )
}
