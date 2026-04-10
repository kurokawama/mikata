"use client"

import { ArrowRight, TrendingUp, TrendingDown, Minus, FileText, Users } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"

export type SentimentType = "positive" | "negative" | "neutral"

export interface CountryData {
  id: string
  flag: string
  name: string
  nameEn: string
  articleCount: number
  sourceCount: number
  topTopics: string[]
  sentiment: SentimentType
  sentimentLabel: string
  isPopular?: boolean
}

interface CountryCardProps {
  country: CountryData
  onExplore?: (id: string) => void
}

const sentimentConfig: Record<
  SentimentType,
  { color: string; Icon: React.ElementType; bgColor: string }
> = {
  positive: { color: "#22C55E", Icon: TrendingUp, bgColor: "#22C55E1A" },
  negative: { color: "#EF4444", Icon: TrendingDown, bgColor: "#EF44441A" },
  neutral: { color: "#9CA3AF", Icon: Minus, bgColor: "#9CA3AF1A" },
}

export function CountryCard({ country, onExplore }: CountryCardProps) {
  const { color, Icon, bgColor } = sentimentConfig[country.sentiment]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onExplore?.(country.id)
    }
  }

  return (
    <Card
      className="group bg-white border border-[#E5E7EB] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)] transition-all duration-200 overflow-hidden hover:-translate-y-0.5"
      role="article"
      aria-label={`${country.name}の視点 — ${country.articleCount}記事`}
    >
      <CardContent className="p-5 flex flex-col gap-4">
        {/* Header row: flag + country name + sentiment */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Flag */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-[#E5E7EB] shadow-sm flex items-center justify-center text-2xl"
              aria-hidden="true"
            >
              {country.flag}
            </div>
            <div>
              <h3
                className="text-[15px] font-semibold text-[#1A1A2E] leading-tight"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {country.name}
              </h3>
              <span
                className="text-xs text-[#9CA3AF] leading-tight"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {country.nameEn}
              </span>
            </div>
          </div>

          {/* Sentiment badge */}
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
            style={{ backgroundColor: bgColor, color }}
          >
            <Icon className="h-3 w-3" aria-hidden="true" />
            <span style={{ fontFamily: "'Work Sans', sans-serif" }}>{country.sentimentLabel}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#4B5563]">
            <FileText className="h-3.5 w-3.5 text-[#9CA3AF]" aria-hidden="true" />
            <span
              className="text-sm font-semibold text-[#1A1A2E]"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              {country.articleCount.toLocaleString("ja-JP")}
            </span>
            <span
              className="text-xs text-[#9CA3AF]"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              記事
            </span>
          </div>
          <div className="h-3 w-px bg-[#E5E7EB]" aria-hidden="true" />
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-[#9CA3AF]" aria-hidden="true" />
            <span
              className="text-sm font-semibold text-[#1A1A2E]"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              {country.sourceCount}
            </span>
            <span
              className="text-xs text-[#9CA3AF]"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              メディア
            </span>
          </div>
        </div>

        {/* Topic tags */}
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="主なトピック">
          {country.topTopics.slice(0, 3).map((topic) => (
            <Badge
              key={topic}
              className="bg-[#F8F9FA] text-[#4B5563] border border-[#E5E7EB] text-[11px] font-normal px-2 py-0.5 rounded-md hover:bg-[#E8E8F0] transition-colors"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
              role="listitem"
            >
              {topic}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        <Button
          className="w-full mt-1 h-9 text-sm font-semibold bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 group/btn"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
          onClick={() => onExplore?.(country.id)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label={`${country.name}の視点を探索する`}
        >
          この視点を探索する
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  )
}
