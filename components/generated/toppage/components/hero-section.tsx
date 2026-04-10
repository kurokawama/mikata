'use client'

import { Button } from './ui/button'
import { Badge } from './ui/badge'

export function HeroSection() {
  return (
    <section className="bg-[#1A1A2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <Badge variant="outline" className="border-[#9CA3AF] text-[#E8E8F0] w-fit">
              🌍 注目の多視点分析
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-['Newsreader'] leading-tight">
              同じニュースを、世界はどう見たか
            </h1>
            <p className="text-[#E8E8F0] text-lg leading-relaxed max-w-md">
              各国メディアの論調をAIが分析。日本では伝わらない視点を、毎朝お届けします。
            </p>
            <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium py-3 px-8">
              記事を読む
            </Button>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#16213E] to-[#0f172a] rounded-2xl overflow-hidden">
              {/* World Map Placeholder */}
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full opacity-40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="1000" height="600" fill="none" />
                <circle cx="500" cy="300" r="250" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.5" />
                <circle cx="500" cy="300" r="180" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.3" />
                <g opacity="0.3" stroke="#E8E8F0" strokeWidth="1" fill="none">
                  {/* Grid lines for map effect */}
                  <line x1="200" y1="100" x2="800" y2="100" />
                  <line x1="200" y1="200" x2="800" y2="200" />
                  <line x1="200" y1="300" x2="800" y2="300" />
                  <line x1="200" y1="400" x2="800" y2="400" />
                  <line x1="200" y1="500" x2="800" y2="500" />
                  <line x1="300" y1="50" x2="300" y2="550" />
                  <line x1="400" y1="50" x2="400" y2="550" />
                  <line x1="500" y1="50" x2="500" y2="550" />
                  <line x1="600" y1="50" x2="600" y2="550" />
                  <line x1="700" y1="50" x2="700" y2="550" />
                </g>
                {/* Accent dots */}
                <circle cx="350" cy="250" r="6" fill="#F59E0B" opacity="0.8" />
                <circle cx="650" cy="280" r="4" fill="#F59E0B" opacity="0.6" />
                <circle cx="450" cy="400" r="5" fill="#F59E0B" opacity="0.7" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <p className="text-[#F59E0B] font-['Montserrat'] font-bold text-6xl opacity-20">
                MIKATA
              </p>
              <p className="text-[#9CA3AF] font-['Montserrat'] font-bold text-3xl opacity-10 mt-2">
                世界のミカタ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
