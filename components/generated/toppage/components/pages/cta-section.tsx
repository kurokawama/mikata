"use client";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative line */}
        <div className="flex items-center justify-center mb-8 sm:mb-10">
          <div className="w-6 h-1 bg-[#F59E0B]" />
          <div className="mx-4 text-[#9CA3AF] text-sm">━━</div>
          <div className="w-6 h-1 bg-[#F59E0B]" />
        </div>

        {/* Main text */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A2E] mb-4 sm:mb-6 font-['Newsreader'] leading-tight">
          気候変動に関する
        </h2>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A2E] mb-8 sm:mb-12 font-['Newsreader'] leading-tight">
          信頼できる情報を
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#4B5563] mb-10 sm:mb-14 leading-relaxed max-w-2xl mx-auto font-['Work Sans']">
          最新の研究結果、国際的なニュース、そして持続可能な未来への洞察。
          気候変動対策に関する、あらゆる情報があります。
        </p>

        {/* CTA Button */}
        <Button
          className="bg-[#1A1A2E] hover:bg-[#16213E] text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-lg transition-colors text-base"
          onClick={() => {}}
        >
          メンバーシップ登録
        </Button>

        {/* Support text */}
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-6 sm:mt-8 font-['Work Sans']">
          無料でお始めいただけます
        </p>
      </div>
    </section>
  );
}
