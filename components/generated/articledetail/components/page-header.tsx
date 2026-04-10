'use client';

import { Button } from '@/components/ui/button';
import { Menu, Search, Home } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function PageHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-[#1A1A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1A1A2E] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm font-['Montserrat']">M</span>
            </div>
            <span className="hidden sm:inline font-['Montserrat'] font-bold text-[#1A1A2E]">
              MIKATA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-montserrat text-[#E8E8F0] hover:text-[#F59E0B] transition-colors"
            >
              ホーム
            </Link>
            <Link
              href="/"
              className="text-sm font-montserrat text-[#E8E8F0] hover:text-[#F59E0B] transition-colors"
            >
              カテゴリー
            </Link>
            <Link
              href="/"
              className="text-sm font-montserrat text-[#E8E8F0] hover:text-[#F59E0B] transition-colors"
            >
              検索
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
