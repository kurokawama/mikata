"use client"

import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { DashboardHeader } from "./components/dashboard-header"
import { StatsCards } from "./components/stats-cards"
import { EditorialQueue } from "./components/editorial-queue"
import { AdReviewPanel } from "./components/ad-review-panel"
import { SourceManagement } from "./components/source-management"
import { Separator } from "../components/ui/separator"
import { RefreshCw } from "lucide-react"

function formatDateTime() {
  const now = new Date()
  return now.toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-['Work_Sans']">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top header bar */}
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Scrollable content area */}
        <main
          className="flex-1 overflow-y-auto"
          id="main-content"
          aria-label="ダッシュボードメインコンテンツ"
        >
          <div className="max-w-[1400px] mx-auto px-5 py-6">

            {/* Page title row */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-widest mb-1 font-['Work_Sans']">
                  Overview Dashboard
                </p>
                <h1 className="text-3xl font-bold text-[#1A1A2E] font-['Newsreader'] leading-none tracking-tight">
                  ダッシュボード
                </h1>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#9CA3AF] font-['Work_Sans'] shrink-0">
                <RefreshCw size={11} className="text-[#9CA3AF]" aria-hidden="true" />
                <span>最終更新: {formatDateTime()}</span>
              </div>
            </div>

            {/* Stats row */}
            <StatsCards />

            <Separator className="my-6 bg-[#E5E7EB]" />

            {/* Main grid: left (queue + sources) + right (ads) */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">

              {/* Left column */}
              <div className="flex flex-col gap-6 min-w-0">
                {/* Editorial Queue */}
                <EditorialQueue />

                {/* Source Management */}
                <SourceManagement />
              </div>

              {/* Right column — Ad review */}
              <div className="xl:max-h-[calc(100vh-280px)] xl:overflow-y-auto xl:sticky xl:top-0">
                <AdReviewPanel />
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 pb-4 flex items-center justify-between text-[10px] text-[#D1D5DB] font-['Work_Sans']">
              <span>Copyright 2024 MIKATA</span>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-[#9CA3AF] transition-colors">プライバシーポリシー</a>
                <a href="#" className="hover:text-[#9CA3AF] transition-colors">利用規約</a>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
