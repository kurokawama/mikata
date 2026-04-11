/* v0-generated — adapted from components/generated/toppage/components/header.tsx */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const navLinks = [
  { href: '/sports', label: 'スポーツ' },
  { href: '/economy', label: '経済' },
  { href: '/gaming', label: 'ゲーム' },
  { href: '/perspectives', label: '各国視点' },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#1A1A2E] border-b border-[#16213E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white font-montserrat">
              MIKATA
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#E8E8F0] hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <div className="relative hidden lg:block w-48">
                <Input
                  placeholder="検索..."
                  className="bg-[#16213E] border-[#16213E] text-white placeholder:text-[#9CA3AF] pr-10"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-[#9CA3AF]" />
              </div>
              <Button asChild className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium">
                <Link href="/login">ログイン</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#1A1A2E] border-[#16213E]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-[#E8E8F0] hover:text-white transition py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-[#16213E]">
                    <Input
                      placeholder="検索..."
                      className="bg-[#16213E] border-[#16213E] text-white placeholder:text-[#9CA3AF] mb-4"
                    />
                    <Button asChild className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium">
                      <Link href="/login">ログイン</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
