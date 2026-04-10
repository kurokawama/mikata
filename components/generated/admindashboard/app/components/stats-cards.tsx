import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "../../lib/utils"

interface StatItem {
  label: string
  value: string
  unit?: string
  change: number
  changeLabel: string
}

const stats: StatItem[] = [
  {
    label: "今日の記事数",
    value: "128",
    unit: "件 (本日公開)",
    change: 12.4,
    changeLabel: "前日比",
  },
  {
    label: "月間PV",
    value: "1.2M",
    unit: "先月比",
    change: 8.2,
    changeLabel: "先月比",
  },
  {
    label: "読者登録",
    value: "24,502",
    unit: "登録者",
    change: -2.1,
    changeLabel: "先月比",
  },
  {
    label: "MRR",
    value: "2,400",
    unit: "万円",
    change: 5.8,
    changeLabel: "前月比",
  },
]

function TrendIcon({ change }: { change: number }) {
  if (change > 0)
    return <TrendingUp size={13} className="text-[#22C55E] shrink-0" />
  if (change < 0)
    return <TrendingDown size={13} className="text-[#EF4444] shrink-0" />
  return <Minus size={13} className="text-[#9CA3AF] shrink-0" />
}

function trendColor(change: number) {
  if (change > 0) return "text-[#22C55E]"
  if (change < 0) return "text-[#EF4444]"
  return "text-[#9CA3AF]"
}

export function StatsCards() {
  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      role="region"
      aria-label="ダッシュボード統計"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)] transition-shadow duration-200 border border-[#E5E7EB]"
        >
          <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2 font-['Work_Sans']">
            {stat.label}
          </p>
          <p className="text-2xl font-bold text-[#1A1A2E] font-['Newsreader'] leading-none mb-1">
            {stat.value}
          </p>
          {stat.unit && (
            <p className="text-[11px] text-[#9CA3AF] font-['Work_Sans'] mb-2">
              {stat.unit}
            </p>
          )}
          <div className="flex items-center gap-1 mt-2">
            <TrendIcon change={stat.change} />
            <span className={cn("text-[11px] font-semibold font-['Work_Sans']", trendColor(stat.change))}>
              {stat.change > 0 ? "+" : ""}{stat.change}%
            </span>
            <span className="text-[11px] text-[#9CA3AF] font-['Work_Sans']">{stat.changeLabel}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
