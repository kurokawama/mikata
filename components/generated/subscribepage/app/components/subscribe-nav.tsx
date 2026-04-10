"use client";

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Input } from "../../components/ui/input";

const navLinks = [
  { label: "政治", href: "#" },
  { label: "経済", href: "#" },
  { label: "社会", href: "#" },
  { label: "国際", href: "#" },
  { label: "科学", href: "#" },
];

export function SubscribeNav() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            className="flex-shrink-0 text-xl tracking-widest text-white"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
            aria-label="MIKATA ホームへ"
          >
            MIKATA
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            role="navigation"
            aria-label="メインナビゲーション"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm text-[#E8E8F0] hover:text-white transition-colors rounded"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <Input
                  autoFocus
                  placeholder="検索..."
                  className="h-8 w-40 bg-[#16213E] border-[#E8E8F0]/20 text-white placeholder:text-[#9CA3AF] text-sm"
                  onBlur={() => setSearchOpen(false)}
                />
                <button
                  className="text-[#E8E8F0] hover:text-white"
                  onClick={() => setSearchOpen(false)}
                  aria-label="検索を閉じる"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                className="text-[#E8E8F0] hover:text-white p-1.5 rounded transition-colors"
                onClick={() => setSearchOpen(true)}
                aria-label="検索を開く"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSearchOpen(true)}
              >
                <Search size={16} />
              </button>
            )}

            {/* Login */}
            <a
              href="#"
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded text-sm text-[#E8E8F0] hover:text-white border border-[#E8E8F0]/20 hover:border-[#E8E8F0]/50 transition-all"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              ログイン
            </a>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="md:hidden text-[#E8E8F0] hover:text-white p-1.5 rounded transition-colors"
                  aria-label="メニューを開く"
                >
                  <Menu size={18} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 border-r border-[#16213E]"
                style={{ backgroundColor: "#1A1A2E" }}
              >
                <div className="mt-8 flex flex-col gap-1">
                  <div
                    className="mb-6 text-xl tracking-widest text-white"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    MIKATA
                  </div>
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="px-3 py-2.5 text-base text-[#E8E8F0] hover:text-white hover:bg-[#16213E] rounded transition-colors"
                      style={{ fontFamily: "'Work Sans', sans-serif" }}
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="mt-4 pt-4 border-t border-[#E8E8F0]/10">
                    <a
                      href="#"
                      className="px-3 py-2.5 text-base text-[#E8E8F0] hover:text-white hover:bg-[#16213E] rounded transition-colors block"
                      style={{ fontFamily: "'Work Sans', sans-serif" }}
                    >
                      ログイン
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
