'use client'

import { Separator } from './ui/separator'

export function Footer() {
  return (
    <footer className="bg-[#1A1A2E] border-t border-[#16213E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-white font-['Montserrat'] mb-4">
              MIKATA
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  について
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  キャリア
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4">プロダクト</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  アプリ
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  ウェブ
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4">コミュニティ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  フォーラム
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  ブログ
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  サポート
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4">リーガル</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  プライバシー
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  利用規約
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8E8F0] hover:text-white text-sm transition">
                  クッキー
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-[#16213E] mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9CA3AF] text-sm text-center md:text-left">
            © 2025 MIKATA. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#9CA3AF] hover:text-[#E8E8F0] text-sm transition">
              Twitter
            </a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#E8E8F0] text-sm transition">
              Facebook
            </a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#E8E8F0] text-sm transition">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
