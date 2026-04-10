'use client'

import { Button } from './ui/button'

export function CtaSection() {
  return (
    <section className="bg-[#1A1A2E] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16213E] rounded-2xl p-8 md:p-16 space-y-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-['Newsreader'] leading-tight">
            経験を積め。
            <br />
            情報が信頼となる。
          </h2>
          <p className="text-[#E8E8F0] text-lg leading-relaxed max-w-2xl mx-auto">
            複数の視点からニュースを読むことで、より深い理解が生まれます。世界の出来事を様々な角度から学べるプラットフォーム。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium py-3 px-8">
              今すぐ始める
            </Button>
            <Button
              variant="outline"
              className="border-[#E8E8F0] text-[#E8E8F0] hover:bg-[#16213E] font-medium py-3 px-8"
            >
              詳しく知る
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
