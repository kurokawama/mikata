/* v0-generated — adapted from components/generated/toppage/components/footer.tsx */
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function SiteFooter() {
  return (
    <footer className="bg-[#1A1A2E] border-t border-[#16213E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-white font-montserrat mb-4">MIKATA</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  について
                </Link>
              </li>
              <li>
                <Link href="/sources" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  メディアソース
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-4">カテゴリー</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sports" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  スポーツ
                </Link>
              </li>
              <li>
                <Link href="/economy" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  経済
                </Link>
              </li>
              <li>
                <Link href="/gaming" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  ゲーム
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-4">サービス</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/perspectives" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  各国視点
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  プレミアム
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-4">リーガル</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/terms" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/legal/tokushoho" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  特商法表記
                </Link>
              </li>
              <li>
                <Link href="/legal/editorial-policy" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  編集方針
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-[#16213E] mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9CA3AF] text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} MIKATA. All rights reserved.
          </p>
          <p className="text-[#9CA3AF] text-xs">
            AI生成コンテンツを含みます。詳細は
            <Link href="/legal/editorial-policy" className="text-[#F59E0B] hover:text-[#D97706] ml-1">
              編集方針
            </Link>
            をご覧ください。
          </p>
        </div>
      </div>
    </footer>
  )
}
