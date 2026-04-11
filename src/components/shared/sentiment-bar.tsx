/* v0-generated — SentimentBar per DESIGN.md spec */
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { SentimentSummary } from '@/types/database'

interface SentimentBarProps {
  summary: SentimentSummary | null
  size?: 'mini' | 'full'
}

export function SentimentBar({ summary, size = 'mini' }: SentimentBarProps) {
  if (!summary) return null
  const total = summary.positive + summary.negative + summary.neutral
  if (total === 0) return null

  const pPct = (summary.positive / total) * 100
  const nPct = (summary.negative / total) * 100
  const neuPct = (summary.neutral / total) * 100
  const h = size === 'mini' ? 'h-1' : 'h-2'

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex ${h} w-full rounded-full overflow-hidden`}
        role="img"
        aria-label={`論調: ポジティブ ${Math.round(pPct)}%, ネガティブ ${Math.round(nPct)}%, ニュートラル ${Math.round(neuPct)}%`}
      >
        <div className="bg-[#22C55E]" style={{ width: `${pPct}%` }} />
        <div className="bg-[#EF4444]" style={{ width: `${nPct}%` }} />
        <div className="bg-[#9CA3AF]" style={{ width: `${neuPct}%` }} />
      </div>
      {size === 'full' && (
        <div className="flex items-center gap-1.5 text-xs shrink-0">
          <span className="flex items-center gap-0.5 text-[#22C55E]">
            <TrendingUp size={12} />
            {summary.positive}
          </span>
          <span className="flex items-center gap-0.5 text-[#EF4444]">
            <TrendingDown size={12} />
            {summary.negative}
          </span>
          <span className="flex items-center gap-0.5 text-[#9CA3AF]">
            <Minus size={12} />
            {summary.neutral}
          </span>
        </div>
      )}
    </div>
  )
}
