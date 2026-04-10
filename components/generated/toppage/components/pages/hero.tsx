"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative w-full bg-[#1A1A2E] text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#16213E] to-[#1A1A2E] opacity-90" />

      {/* World map background - SVG placeholder */}
      <div className="absolute inset-0 opacity-20">
        <svg
          viewBox="0 0 1200 600"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="600" cy="300" r="250" fill="none" stroke="#4B5563" strokeWidth="1" />
          <circle cx="400" cy="200" r="80" fill="none" stroke="#4B5563" strokeWidth="1" />
          <circle cx="800" cy="400" r="100" fill="none" stroke="#4B5563" strokeWidth="1" />
          <path d="M 100 150 Q 200 200 300 150" stroke="#4B5563" fill="none" strokeWidth="1" />
          <path d="M 700 250 L 850 300 L 750 400" stroke="#4B5563" fill="none" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
        {/* Top navigation text */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm text-[#9CA3AF] tracking-widest">
            CLIMATE SUMMIT
          </div>
          <div className="text-xs sm:text-sm text-[#9CA3AF]">
            2024 EVENTS
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 font-['Newsreader']">
                CLIMATE
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#F59E0B] font-['Newsreader']">
                SUMMIT
              </h1>
            </div>

            {/* Japanese text - main message */}
            <div className="mb-8 sm:mb-10">
              <p className="text-lg sm:text-xl lg:text-2xl font-medium text-[#E8E8F0] mb-3 sm:mb-4 font-['Work Sans']">
                気候変動対策ニュー
              </p>
              <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed font-['Work Sans']">
                スと名言の権威誌研究所
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Button
                className="bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors"
                onClick={() => {}}
              >
                詳しく見る
              </Button>
            </div>
          </div>

          {/* Right side - illustration placeholder */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-[#16213E] to-[#1A1A2E] rounded-2xl flex items-center justify-center border border-[#4B5563]">
                <div className="text-center opacity-60">
                  <div className="text-[#4B5563] text-6xl mb-4">🌍</div>
                  <p className="text-[#9CA3AF] text-sm">Visual Element</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 lg:bottom-12">
          <div className="text-[#9CA3AF] text-xs animate-bounce">↓</div>
        </div>
      </div>
    </div>
  );
}
