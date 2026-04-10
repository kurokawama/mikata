"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "ニュース", href: "#" },
    { label: "研究", href: "#" },
    { label: "イベント", href: "#" },
    { label: "お問い合わせ", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#16213E] text-white border-b border-[#4B5563] backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl sm:text-2xl font-light font-['Newsreader'] text-white">
              CLIMATE
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#9CA3AF] hover:text-[#F59E0B] transition-colors font-['Work Sans']"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="hidden sm:inline-flex text-white border-[#4B5563] hover:bg-[#1A1A2E] text-sm px-4 py-2"
            >
              ログイン
            </Button>
            <Button
              className="bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] font-semibold text-sm px-4 py-2"
            >
              登録
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-[#9CA3AF] hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-[#4B5563]">
            <div className="pt-4 space-y-3 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#9CA3AF] hover:text-[#F59E0B] transition-colors px-2 py-2 font-['Work Sans']"
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="outline"
                className="text-white border-[#4B5563] hover:bg-[#1A1A2E] text-sm w-full mt-2"
              >
                ログイン
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
