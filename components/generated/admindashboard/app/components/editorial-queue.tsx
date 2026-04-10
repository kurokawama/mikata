"use client"

import { useState } from "react"
import { Eye, Edit2, CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { cn } from "../../lib/utils"

type ArticleStatus = "承認待ち" | "編集中" | "公開済み" | "要修正"

interface Article {
  id: string
  title: string
  author: string
  source: string
  status: ArticleStatus
  updatedAt: string
}

const articles: Article[] = [
  {
    id: "1",
    title: "次世代AIチップの急成長について",
    author: "佐藤 健一",
    source: "日本経済新聞",
    status: "承認待ち",
    updatedAt: "2分前",
  },
  {
    id: "2",
    title: "円安・株高で個人資産形成の新潮流",
    author: "高橋 美咲",
    source: "ロイター",
    status: "編集中",
    updatedAt: "15分前",
  },
  {
    id: "3",
    title: "スタートアップ投資家が語る、失敗と教訓",
    author: "Bloomberg News",
    source: "Bloomberg",
    status: "要修正",
    updatedAt: "1時間前",
  },
  {
    id: "4",
    title: "G7首脳会議：気候変動対策の合意と課題",
    author: "中村 拓海",
    source: "NHK",
    status: "公開済み",
    updatedAt: "3時間前",
  },
  {
    id: "5",
    title: "インバウンド消費が過去最高更新、東京・大阪が牽引",
    author: "小林 さくら",
    source: "日本経済新聞",
    status: "承認待ち",
    updatedAt: "4時間前",
  },
]

const statusConfig: Record<ArticleStatus, { color: string; icon: React.ReactNode; bg: string }> = {
  承認待ち: {
    color: "text-[#F59E0B]",
    bg: "bg-[#FEF3C7] text-[#D97706]",
    icon: <Clock size={11} />,
  },
  編集中: {
    color: "text-[#3B82F6]",
    bg: "bg-blue-50 text-blue-600",
    icon: <Edit2 size={11} />,
  },
  公開済み: {
    color: "text-[#22C55E]",
    bg: "bg-green-50 text-[#22C55E]",
    icon: <CheckCircle size={11} />,
  },
  要修正: {
    color: "text-[#EF4444]",
    bg: "bg-red-50 text-[#EF4444]",
    icon: <AlertCircle size={11} />,
  },
}

export function EditorialQueue() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section
      className="bg-white rounded-xl border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden"
      aria-labelledby="editorial-queue-title"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-sm bg-[#F59E0B]" aria-hidden="true" />
          <h2
            id="editorial-queue-title"
            className="text-[13px] font-bold text-[#1A1A2E] font-['Work_Sans'] tracking-tight"
          >
            エディトリアルキュー
          </h2>
          <Badge className="bg-[#FEF3C7] text-[#D97706] border-0 text-[10px] font-bold px-1.5 py-0 h-4 font-['Work_Sans']">
            {articles.filter((a) => a.status === "承認待ち").length} 件待機中
          </Badge>
        </div>
        <button
          className="text-[11px] text-[#F59E0B] hover:text-[#D97706] font-semibold transition-colors flex items-center gap-0.5 font-['Work_Sans'] outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded"
          tabIndex={0}
          aria-label="すべての記事を表示"
        >
          すべて表示
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 gap-3 px-5 py-2.5 bg-[#F8F9FA] border-b border-[#E5E7EB]">
        <div className="col-span-6 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] font-['Work_Sans']">
          記事タイトル
        </div>
        <div className="col-span-2 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] font-['Work_Sans'] hidden md:block">
          著者
        </div>
        <div className="col-span-2 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] font-['Work_Sans']">
          ステータス
        </div>
        <div className="col-span-2 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] font-['Work_Sans'] text-right">
          アクション
        </div>
      </div>

      {/* Rows */}
      <ul role="list" className="divide-y divide-[#F3F4F6]">
        {articles.map((article) => {
          const cfg = statusConfig[article.status]
          return (
            <li
              key={article.id}
              className={cn(
                "grid grid-cols-12 gap-3 px-5 py-3.5 items-center transition-colors duration-100",
                hoveredId === article.id ? "bg-[#F8F9FA]" : "bg-white"
              )}
              onMouseEnter={() => setHoveredId(article.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Title */}
              <div className="col-span-6 min-w-0">
                <p className="text-[13px] font-semibold text-[#1A1A2E] truncate font-['Work_Sans'] leading-tight">
                  {article.title}
                </p>
                <p className="text-[11px] text-[#9CA3AF] font-['Work_Sans'] mt-0.5">
                  {article.source} · {article.updatedAt}
                </p>
              </div>

              {/* Author */}
              <div className="col-span-2 hidden md:block">
                <p className="text-[12px] text-[#4B5563] font-['Work_Sans'] truncate">
                  {article.author}
                </p>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full font-['Work_Sans']",
                    cfg.bg
                  )}
                >
                  {cfg.icon}
                  {article.status}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-1.5">
                <button
                  className="p-1.5 text-[#9CA3AF] hover:text-[#1A1A2E] hover:bg-[#F3F4F6] rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                  aria-label={`${article.title}を表示`}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter") {} }}
                >
                  <Eye size={14} />
                </button>
                <button
                  className="p-1.5 text-[#9CA3AF] hover:text-[#1A1A2E] hover:bg-[#F3F4F6] rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                  aria-label={`${article.title}を編集`}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter") {} }}
                >
                  <Edit2 size={14} />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
