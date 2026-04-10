"use client"

import { useState } from "react"
import { cn } from "../../lib/utils"
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  Globe,
  BarChart2,
  Settings,
  Plus,
  ChevronRight,
  X,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator"

const navItems = [
  { icon: LayoutDashboard, label: "ダッシュボード", href: "#", active: true },
  { icon: FileText,        label: "記事管理",         href: "#" },
  { icon: Megaphone,       label: "広告管理",         href: "#" },
  { icon: Globe,           label: "ソース",           href: "#" },
  { icon: BarChart2,       label: "アナリティクス",   href: "#" },
  { icon: Settings,        label: "設定",             href: "#" },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("ダッシュボード")

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-56 flex-col bg-[#1A1A2E] transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="サイドバーナビゲーション"
      >
        {/* Logo area */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-bold tracking-widest text-white font-['Montserrat']"
              aria-label="MIKATA ADMIN"
            >
              MIKATA
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-[#F59E0B] font-['Work_Sans'] uppercase">
              ADMIN
            </span>
          </div>
          <button
            className="lg:hidden text-white/60 hover:text-white transition-colors"
            onClick={onClose}
            aria-label="サイドバーを閉じる"
          >
            <X size={18} />
          </button>
        </div>

        {/* App label */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 font-['Work_Sans']">
            MIKATA CMS
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-1 space-y-0.5" role="navigation">
          {navItems.map(({ icon: Icon, label, href }) => {
            const isActive = activeItem === label
            return (
              <a
                key={label}
                href={href}
                role="menuitem"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveItem(label)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActiveItem(label)
                  }
                }}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] group",
                  isActive
                    ? "bg-[#F59E0B]/10 text-[#F59E0B] font-semibold border-l-2 border-[#F59E0B] font-['Work_Sans']"
                    : "text-white/60 hover:text-white hover:bg-white/5 font-['Work_Sans']"
                )}
              >
                <Icon size={16} className={cn("shrink-0", isActive ? "text-[#F59E0B]" : "text-white/50 group-hover:text-white")} />
                <span className="flex-1 text-[13px]">{label}</span>
                {isActive && <ChevronRight size={14} className="text-[#F59E0B]" />}
              </a>
            )
          })}
        </nav>

        <Separator className="bg-white/10 mx-4" />

        {/* New article button */}
        <div className="p-4">
          <Button
            className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] font-bold text-sm font-['Work_Sans'] rounded-xl h-10 transition-colors duration-200 shadow-lg shadow-amber-500/20"
            onClick={() => {}}
            aria-label="新規記事を作成する"
          >
            <Plus size={16} className="mr-1.5" />
            新規記事作成
          </Button>
        </div>
      </aside>
    </>
  )
}
