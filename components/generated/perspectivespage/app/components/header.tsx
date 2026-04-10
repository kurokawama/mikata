"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { Menu, Search, Globe, X } from "lucide-react"

const navLinks = [
  { label: "ホーム", href: "/" },
  { label: "視点を探索", href: "/perspectives", active: true },
  { label: "トピック", href: "/topics" },
  { label: "プレミアム", href: "/premium" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-[#16213E]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded-sm"
          aria-label="MIKATA トップページへ"
        >
          <Globe className="h-5 w-5 text-[#F59E0B]" aria-hidden="true" />
          <span
            className="text-lg font-bold tracking-widest text-white"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            MIKATA
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="メインナビゲーション">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-4 py-2 text-sm rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] ${
                link.active
                  ? "text-[#F59E0B] font-medium"
                  : "text-[#9CA3AF] hover:text-white"
              }`}
              style={{ fontFamily: "'Work Sans', sans-serif" }}
              aria-current={link.active ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <button
            className="hidden md:flex items-center justify-center h-9 w-9 rounded-md text-[#9CA3AF] hover:text-white hover:bg-[#16213E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
            aria-label="検索"
            tabIndex={0}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>
          <Button
            className="hidden md:inline-flex h-8 text-xs font-semibold px-4 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] transition-colors focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            ログイン
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="flex md:hidden items-center justify-center h-9 w-9 rounded-md text-[#9CA3AF] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                aria-label="メニューを開く"
                tabIndex={0}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-l border-[#16213E] p-0"
              style={{ backgroundColor: "#1A1A2E" }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#16213E]">
                <span
                  className="text-base font-bold tracking-widest text-white"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  MIKATA
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[#9CA3AF] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded-sm"
                  aria-label="メニューを閉じる"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <nav className="flex flex-col px-4 py-6 gap-1" role="navigation" aria-label="モバイルナビゲーション">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 text-sm rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] ${
                      link.active
                        ? "text-[#F59E0B] bg-[#16213E] font-medium"
                        : "text-[#9CA3AF] hover:text-white hover:bg-[#16213E]"
                    }`}
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                    aria-current={link.active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-[#16213E]">
                  <Button className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] font-semibold text-sm rounded-lg">
                    ログイン
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
