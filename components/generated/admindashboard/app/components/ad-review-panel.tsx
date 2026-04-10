"use client"

import { useState } from "react"
import { Check, X, ChevronRight, Megaphone } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { cn } from "../../lib/utils"

interface AdItem {
  id: string
  advertiser: string
  title: string
  description: string
  category: string
  imageUrl: string
  budget: string
  status: "pending" | "approved" | "rejected"
}

const ads: AdItem[] = [
  {
    id: "ad1",
    advertiser: "TechVision株式会社",
    title: "AI導入コンサルティングキャンペーン",
    description: "中小企業向けAI導入支援サービス。無料診断実施中。",
    category: "テクノロジー",
    imageUrl: "/placeholder.svg?height=80&width=200",
    budget: "¥850,000",
    status: "pending",
  },
  {
    id: "ad2",
    advertiser: "FinanceEdge",
    title: "次世代投資運用プラットフォーム",
    description: "AIが最適なポートフォリオを自動構築。今なら3ヶ月無料。",
    category: "金融",
    imageUrl: "/placeholder.svg?height=80&width=200",
    budget: "¥1,200,000",
    status: "pending",
  },
  {
    id: "ad3",
    advertiser: "GreenEnergy Japan",
    title: "再生可能エネルギー転換サポート",
    description: "企業の脱炭素化を支援。補助金申請から導入まで。",
    category: "環境",
    imageUrl: "/placeholder.svg?height=80&width=200",
    budget: "¥620,000",
    status: "pending",
  },
]

export function AdReviewPanel() {
  const [adStatuses, setAdStatuses] = useState<Record<string, "pending" | "approved" | "rejected">>(
    Object.fromEntries(ads.map((ad) => [ad.id, ad.status]))
  )

  const handleApprove = (id: string) => {
    setAdStatuses((prev) => ({ ...prev, [id]: "approved" }))
  }

  const handleReject = (id: string) => {
    setAdStatuses((prev) => ({ ...prev, [id]: "rejected" }))
  }

  const pendingCount = Object.values(adStatuses).filter((s) => s === "pending").length

  return (
    <section
      className="bg-white rounded-xl border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden"
      aria-labelledby="ad-review-title"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2.5">
          <Megaphone size={14} className="text-[#F59E0B]" aria-hidden="true" />
          <h2
            id="ad-review-title"
            className="text-[13px] font-bold text-[#1A1A2E] font-['Work_Sans']"
          >
            広告審査パネル
          </h2>
          {pendingCount > 0 && (
            <Badge className="bg-[#DC2626] text-white border-0 text-[10px] font-bold px-1.5 h-4 font-['Work_Sans']">
              + {pendingCount}件
            </Badge>
          )}
        </div>
        <button
          className="text-[11px] text-[#F59E0B] hover:text-[#D97706] font-semibold font-['Work_Sans'] flex items-center gap-0.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded"
          tabIndex={0}
          aria-label="すべての広告を表示"
        >
          すべて表示 <ChevronRight size={12} />
        </button>
      </div>

      {/* Ad list */}
      <ul role="list" className="divide-y divide-[#F3F4F6]">
        {ads.map((ad) => {
          const status = adStatuses[ad.id]
          return (
            <li key={ad.id} className="p-4">
              {/* Ad image */}
              <div className="w-full h-20 rounded-lg overflow-hidden mb-3 bg-[#F3F4F6] relative">
                <img
                  src={ad.imageUrl}
                  alt={`${ad.title}の広告画像`}
                  className="w-full h-full object-cover"
                />
                {/* Category badge over image */}
                <span className="absolute top-2 left-2 bg-[#1A1A2E]/70 text-white text-[9px] font-bold px-2 py-0.5 rounded font-['Work_Sans'] uppercase tracking-wide">
                  {ad.category}
                </span>
              </div>

              {/* Ad info */}
              <p className="text-[10px] text-[#9CA3AF] font-['Work_Sans'] mb-0.5">
                {ad.advertiser}
              </p>
              <p className="text-[12px] font-semibold text-[#1A1A2E] font-['Work_Sans'] leading-snug mb-1">
                {ad.title}
              </p>
              <p className="text-[11px] text-[#4B5563] font-['Work_Sans'] leading-relaxed mb-2 line-clamp-2">
                {ad.description}
              </p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] text-[#9CA3AF] font-['Work_Sans']">予算上限</span>
                <span className="text-[12px] font-bold text-[#1A1A2E] font-['Work_Sans']">{ad.budget}</span>
              </div>

              {/* Status / Actions */}
              {status === "pending" ? (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(ad.id)}
                    className="flex-1 h-8 bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] text-[11px] font-bold rounded-lg transition-colors duration-200 font-['Work_Sans']"
                    aria-label={`${ad.title}を承認`}
                    tabIndex={0}
                  >
                    <Check size={13} className="mr-1" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(ad.id)}
                    variant="outline"
                    className="flex-1 h-8 border-[#E5E7EB] text-[#4B5563] hover:bg-[#F8F9FA] text-[11px] font-bold rounded-lg transition-colors duration-200 font-['Work_Sans']"
                    aria-label={`${ad.title}を拒否`}
                    tabIndex={0}
                  >
                    <X size={13} className="mr-1" />
                    Reject
                  </Button>
                </div>
              ) : status === "approved" ? (
                <div className="flex items-center justify-center gap-1.5 py-1.5 bg-green-50 rounded-lg border border-green-100">
                  <Check size={13} className="text-[#22C55E]" />
                  <span className="text-[11px] font-semibold text-[#22C55E] font-['Work_Sans']">承認済み</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1.5 py-1.5 bg-red-50 rounded-lg border border-red-100">
                  <X size={13} className="text-[#EF4444]" />
                  <span className="text-[11px] font-semibold text-[#EF4444] font-['Work_Sans']">却下済み</span>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
