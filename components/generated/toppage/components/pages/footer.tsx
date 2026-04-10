"use client";

import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full bg-[#1A1A2E] text-[#E8E8F0] border-t border-[#4B5563]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-12">
          {/* Brand section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-light text-white mb-4 font-['Newsreader']">
              CLIMATE
            </h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed font-['Work Sans']">
              気候変動対策の最新ニュースと権威誌。
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-['Work Sans']">
              リンク
            </h4>
            <ul className="space-y-2">
              {["について", "ニュース", "研究", "お問い合わせ"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-[#9CA3AF] hover:text-[#F59E0B] transition-colors font-['Work Sans']"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-['Work Sans']">
              リソース
            </h4>
            <ul className="space-y-2">
              {["ガイド", "白書", "レポート", "イベント"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-[#9CA3AF] hover:text-[#F59E0B] transition-colors font-['Work Sans']"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-['Work Sans']">
              法務
            </h4>
            <ul className="space-y-2">
              {["プライバシー", "利用規約", "クッキー", "設定"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-[#9CA3AF] hover:text-[#F59E0B] transition-colors font-['Work Sans']"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <Separator className="bg-[#4B5563] mb-8" />

        {/* Bottom footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#9CA3AF] font-['Work Sans']">
            © 2024 CLIMATE SUMMIT. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Twitter", "LinkedIn", "Facebook"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-[#9CA3AF] hover:text-[#F59E0B] transition-colors font-['Work Sans']"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
