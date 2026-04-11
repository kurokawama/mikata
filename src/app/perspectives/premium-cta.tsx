/* v0-generated — adapted from components/generated/perspectivespage/app/components/premium-cta.tsx */
import Link from 'next/link'
import { ArrowRight, Check, Globe, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const perks = [
  '世界50カ国以上すべての視点にアクセス',
  'リアルタイム翻訳・要約機能',
  'メディアバイアス分析レポート',
  'カスタムアラートと通知設定',
]

export function PremiumCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' }}
      aria-labelledby="premium-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle at 70% 30%, #F59E0B 0%, transparent 70%)' }} />
        <div className="absolute left-0 bottom-0 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle at 30% 70%, #F59E0B 0%, transparent 70%)' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10" aria-hidden="true">
                <Star className="h-3 w-3 text-[#F59E0B] fill-[#F59E0B]" />
                <span className="text-xs font-semibold text-[#F59E0B]">プレミアムプラン</span>
              </div>
            </div>

            <h2 id="premium-heading" className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight text-balance font-serif">
              MIKATAプレミアムで
              <br className="hidden sm:block" />
              全50カ国にアクセス
            </h2>

            <p className="mt-4 text-[#9CA3AF] text-base leading-relaxed">
              北米、ヨーロッパ、南米アジアを含む全50カ国以上のメディアインテリジェンスを提供。
              リアルタイムニュースフィードで、グローバルな情報を手に入れましょう。
            </p>

            <ul className="mt-6 space-y-3" role="list" aria-label="プレミアム特典">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-[#E8E8F0]">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-[#9CA3AF] mb-1">月額プラン</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">&yen;980</span>
                    <span className="text-sm text-[#9CA3AF]">/月</span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20" aria-hidden="true">
                  <Globe className="h-6 w-6 text-[#F59E0B]" />
                </div>
              </div>

              <Separator className="bg-white/10 mb-5" />

              <Button
                asChild
                className="w-full h-11 font-semibold text-sm bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] rounded-xl transition-colors group"
                aria-label="プレミアムプランを試す（14日間無料）"
              >
                <Link href="/subscribe">
                  14日間無料で試す
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Button>
              <p className="mt-3 text-center text-xs text-[#9CA3AF]">
                クレジットカード不要 &middot; いつでもキャンセル可能
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
