/* v0-generated — About page */
import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'MIKATAについて — MIKATA',
  description: 'AIが各国メディアの論調を分析し、独自解説+ソースリンクで多視点ニュースを日本語提供するサービス。',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-[#1A1A2E] py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif leading-tight mb-4">
              世界のミカタ
            </h1>
            <p className="text-[#9CA3AF] text-lg leading-relaxed">
              AIが各国メディアの論調を分析し、独自解説+ソースリンクで多視点ニュースを日本語提供する、日本初のサービスです。
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] font-serif mb-4">MIKATAとは</h2>
            <p className="text-[#4B5563] leading-relaxed">
              MIKATAは、同じニュースを各国メディアがどのように報じているかを比較・分析するプラットフォームです。
              AIが50カ国以上のメディアソースから記事を収集・分析し、800〜1200字の独自解説とともに各国視点を日本語で提供します。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] font-serif mb-4">なぜ多視点が重要なのか</h2>
            <p className="text-[#4B5563] leading-relaxed">
              世界のニュースは、報じるメディアの文化的背景や国家の立場によって、伝え方や論調が大きく異なります。
              一つのメディアだけを読むことは、一つの窓からしか世界を見ていないことと同じです。
              MIKATAは複数の窓を開き、より立体的な世界の理解を助けます。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] font-serif mb-4">対象ジャンル</h2>
            <ul className="space-y-2 text-[#4B5563]">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#F59E0B] inline-block" />
                スポーツ（サッカー、野球、バスケットボール等）
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#F59E0B] inline-block" />
                経済・マーケット（株式、為替、暗号資産等）
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#F59E0B] inline-block" />
                ゲーム・eスポーツ
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] font-serif mb-4">運営者情報</h2>
            <p className="text-[#4B5563] leading-relaxed">
              MIKATA は個人運営のサービスです。
            </p>
          </div>

          <div className="text-center pt-8">
            <Button asChild className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold px-8">
              <Link href="/signup">無料で始める</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
