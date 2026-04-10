"use client"

import { useState } from "react"
import { Plus, Globe, Rss, Check, Settings2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { cn } from "../../lib/utils"

interface SourceItem {
  id: string
  name: string
  category: string
  articlesToday: number
  status: "active" | "paused"
  color: string
}

const sources: SourceItem[] = [
  { id: "s1", name: "日本経済新聞", category: "経済", articlesToday: 42, status: "active", color: "#1A1A2E" },
  { id: "s2", name: "ロイター",       category: "国際", articlesToday: 31, status: "active", color: "#D97706" },
  { id: "s3", name: "Bloomberg",      category: "金融", articlesToday: 28, status: "active", color: "#22C55E" },
  { id: "s4", name: "NHK",            category: "総合", articlesToday: 19, status: "active", color: "#3B82F6" },
  { id: "s5", name: "朝日新聞",        category: "政治", articlesToday: 23, status: "paused", color: "#9CA3AF" },
  { id: "s6", name: "CNN",            category: "国際", articlesToday: 15, status: "active", color: "#EF4444" },
]

export function SourceManagement() {
  const [sources_, setSources_] = useState(sources)

  const toggleStatus = (id: string) => {
    setSources_((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === "active" ? "paused" : "active" } : s
      )
    )
  }

  const activeCount = sources_.filter((s) => s.status === "active").length

  return (
    <section
      className="bg-white rounded-xl border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden"
      aria-labelledby="source-management-title"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-sm bg-[#1A1A2E]" aria-hidden="true" />
          <h2
            id="source-management-title"
            className="text-[13px] font-bold text-[#1A1A2E] font-['Work_Sans']"
          >
            ソース監視
          </h2>
          <span className="text-[11px] text-[#9CA3AF] font-['Work_Sans']">
            {activeCount}/{sources_.length} アクティブ
          </span>
        </div>
        <Button
          className="h-7 px-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] text-[11px] font-bold rounded-lg font-['Work_Sans']"
          aria-label="新しいソースを追加"
        >
          <Plus size={12} className="mr-1" />
          追加
        </Button>
      </div>

      {/* Sources grid */}
      <div className="p-4 flex flex-wrap gap-2" role="list" aria-label="ニュースソース一覧">
        {sources_.map((source) => (
          <button
            key={source.id}
            role="listitem"
            tabIndex={0}
            onClick={() => toggleStatus(source.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                toggleStatus(source.id)
              }
            }}
            aria-pressed={source.status === "active"}
            aria-label={`${source.name} — ${source.status === "active" ? "アクティブ" : "一時停止中"}。クリックで切り替え`}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] font-semibold font-['Work_Sans'] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]",
              source.status === "active"
                ? "bg-[#F8F9FA] border-[#E5E7EB] text-[#1A1A2E] hover:border-[#D1D5DB]"
                : "bg-white border-[#E5E7EB] text-[#9CA3AF] opacity-60 hover:opacity-80"
            )}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: source.status === "active" ? source.color : "#D1D5DB" }}
              aria-hidden="true"
            />
            + {source.name}
            {source.status === "active" && (
              <span className="text-[10px] text-[#9CA3AF] font-normal">
                {source.articlesToday}件
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-0 border-t border-[#F3F4F6]">
        <div className="flex-1 px-5 py-3 border-r border-[#F3F4F6]">
          <p className="text-[10px] text-[#9CA3AF] font-['Work_Sans'] uppercase tracking-wider mb-0.5">本日取得</p>
          <p className="text-[18px] font-bold text-[#1A1A2E] font-['Newsreader']">
            {sources_.filter(s => s.status === "active").reduce((acc, s) => acc + s.articlesToday, 0)}
            <span className="text-[11px] font-normal text-[#9CA3AF] font-['Work_Sans'] ml-1">件</span>
          </p>
        </div>
        <div className="flex-1 px-5 py-3 border-r border-[#F3F4F6]">
          <p className="text-[10px] text-[#9CA3AF] font-['Work_Sans'] uppercase tracking-wider mb-0.5">アクティブ</p>
          <p className="text-[18px] font-bold text-[#22C55E] font-['Newsreader']">
            {activeCount}
            <span className="text-[11px] font-normal text-[#9CA3AF] font-['Work_Sans'] ml-1">ソース</span>
          </p>
        </div>
        <div className="flex-1 px-5 py-3">
          <p className="text-[10px] text-[#9CA3AF] font-['Work_Sans'] uppercase tracking-wider mb-0.5">一時停止</p>
          <p className="text-[18px] font-bold text-[#EF4444] font-['Newsreader']">
            {sources_.length - activeCount}
            <span className="text-[11px] font-normal text-[#9CA3AF] font-['Work_Sans'] ml-1">ソース</span>
          </p>
        </div>
      </div>
    </section>
  )
}
