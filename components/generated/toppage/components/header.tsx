'use client'

import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#1A1A2E] border-b border-[#16213E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-white font-['Montserrat']">
              MIKATA
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              <a href="#" className="text-sm text-[#E8E8F0] hover:text-white transition">
                ニュース
              </a>
              <a href="#" className="text-sm text-[#E8E8F0] hover:text-white transition">
                特集
              </a>
              <a href="#" className="text-sm text-[#E8E8F0] hover:text-white transition">
                カテゴリー
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <div className="relative hidden lg:block w-48">
                <Input
                  placeholder="検索..."
                  className="bg-[#16213E] border-[#16213E] text-white placeholder:text-[#9CA3AF] pr-10"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-[#9CA3AF]" />
              </div>
              <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium">
                サインイン
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#1A1A2E] border-[#16213E]">
                <nav className="flex flex-col gap-4 mt-8">
                  <a href="#" className="text-[#E8E8F0] hover:text-white transition py-2">
                    ニュース
                  </a>
                  <a href="#" className="text-[#E8E8F0] hover:text-white transition py-2">
                    特集
                  </a>
                  <a href="#" className="text-[#E8E8F0] hover:text-white transition py-2">
                    カテゴリー
                  </a>
                  <div className="pt-4 border-t border-[#16213E]">
                    <Input
                      placeholder="検索..."
                      className="bg-[#16213E] border-[#16213E] text-white placeholder:text-[#9CA3AF] mb-4"
                    />
                    <Button className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium">
                      サインイン
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
