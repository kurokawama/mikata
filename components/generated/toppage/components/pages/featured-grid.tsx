"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface GridItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  gradient: string;
}

const gridItems: GridItem[] = [
  {
    id: 1,
    title: "最新の気候変動研究",
    description: "世界規模の気候変動対策の最新ニュースと研究成果をお届けします。",
    category: "研究",
    image: "🏃",
    gradient: "from-blue-900 to-blue-800",
  },
  {
    id: 2,
    title: "サステナビリティ市場",
    description: "環境保全と経済成長の両立を目指す企業戦略を特集します。",
    category: "市場",
    image: "🏀",
    gradient: "from-orange-900 to-orange-800",
  },
  {
    id: 3,
    title: "グローバルサミット",
    description: "国際会議やサミットの最新情報と各国の対策を報告します。",
    category: "イベント",
    image: "🏟️",
    gradient: "from-teal-900 to-teal-800",
  },
  {
    id: 4,
    title: "未来のビジョン",
    description: "2030年、2050年に向けた気候変動対策のビジョンを探ります。",
    category: "未来",
    image: "🌍",
    gradient: "from-purple-900 to-purple-800",
  },
];

export function FeaturedGrid() {
  return (
    <section className="w-full bg-[#F8F9FA] py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A2E] mb-4 font-['Newsreader']">
            特集記事
          </h2>
          <div className="w-12 h-1 bg-[#F59E0B]" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {gridItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
            >
              {/* Image container with gradient */}
              <div
                className={`relative w-full aspect-square bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}
              >
                <div className="text-6xl sm:text-5xl transform group-hover:scale-110 transition-transform duration-300">
                  {item.image}
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex flex-col">
                {/* Category badge */}
                <Badge
                  variant="secondary"
                  className="w-fit mb-3 bg-[#FEF3C7] text-[#D97706] text-xs font-semibold px-2 py-1 rounded"
                >
                  {item.category}
                </Badge>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-semibold text-[#1A1A2E] mb-2 line-clamp-2 font-['Work Sans']">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed flex-grow font-['Work Sans']">
                  {item.description}
                </p>

                {/* Link indicator */}
                <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-xs text-[#9CA3AF] font-medium">詳しく</span>
                  <span className="text-[#F59E0B] group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
