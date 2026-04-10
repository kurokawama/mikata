"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Input } from "../../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header
      className="h-14 bg-[#1A1A2E] flex items-center justify-between px-4 gap-4 border-b border-white/10 shrink-0"
      role="banner"
    >
      {/* Mobile menu button */}
      <button
        className="lg:hidden text-white/60 hover:text-white transition-colors p-1 rounded-md focus-visible:ring-2 focus-visible:ring-[#F59E0B] outline-none"
        onClick={onMenuClick}
        aria-label="メニューを開く"
        tabIndex={0}
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xs relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
        />
        <Input
          type="search"
          placeholder="検索..."
          className="h-8 pl-8 bg-white/8 border-white/15 text-white/80 placeholder:text-white/30 text-sm rounded-lg focus-visible:ring-[#F59E0B] focus-visible:border-[#F59E0B] font-['Work_Sans']"
          aria-label="記事を検索"
        />
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <button
          className="relative p-1.5 text-white/60 hover:text-white transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-[#F59E0B] outline-none"
          aria-label="通知"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") {} }}
        >
          <Bell size={18} />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#F59E0B] rounded-full border border-[#1A1A2E]" aria-hidden="true" />
        </button>

        <Avatar className="h-8 w-8 border-2 border-white/20 cursor-pointer hover:border-[#F59E0B] transition-colors">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="管理者アバター" />
          <AvatarFallback className="bg-[#F59E0B] text-[#1A1A2E] text-xs font-bold font-['Montserrat']">
            MK
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
