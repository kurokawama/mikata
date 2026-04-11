/* v0-generated — Editorial Policy */
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'

export const metadata: Metadata = {
  title: '編集方針 — MIKATA',
  description: 'MIKATAのAI生成コンテンツに関する透明性と編集方針について。',
}

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-[#1A1A2E] font-serif mb-8">編集方針</h1>
          <div className="prose prose-sm max-w-none text-[#4B5563] space-y-6">
            <p>最終更新日: 2026年4月11日</p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">AI生成コンテンツについて</h2>
            <p>
              MIKATAの記事分析はAI（Claude by Anthropic）を活用して生成されています。
              AIは各国メディアの報道内容を要約・分析し、800〜1200字の独自解説を作成します。
              これは著作権法上の「主」として位置づけられ、引用元メディアへのリンクは「従」として提供されます。
            </p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">情報の正確性</h2>
            <p>
              AIによる分析は最大限の正確性を目指していますが、完全な正確性を保証するものではありません。
              重要な情報については、必ず原典のメディアソースをご確認ください。
              各記事には原典へのリンクを必ず付記しています。
            </p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">論調分析（センチメント）</h2>
            <p>
              各メディアの論調を「ポジティブ」「ネガティブ」「ニュートラル」の3段階で評価しています。
              この評価はAIによる自動分析であり、メディア自体の信頼性を評価するものではありません。
            </p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">取り扱いジャンル</h2>
            <p>
              MIKATAはスポーツ、経済・マーケット、ゲーム・eスポーツの3ジャンルを取り扱います。
              政治ニュースは取り扱い対象外です。
            </p>

            <h2 className="text-xl font-bold text-[#1A1A2E] font-serif">人間による監修</h2>
            <p>
              AI生成された全ての記事は、公開前に管理者による確認・承認プロセスを経ています。
              不適切な内容や明らかな事実誤認が発見された場合は、速やかに修正または非公開とします。
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
