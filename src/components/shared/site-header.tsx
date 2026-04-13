/* v0-generated — adapted from components/generated/toppage/components/header.tsx */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, Search, LogOut, Settings } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const navLinks = [
  { href: '/sports', label: 'スポーツ' },
  { href: '/economy', label: '経済' },
  { href: '/gaming', label: 'ゲーム' },
  { href: '/perspectives', label: '各国視点' },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isPremium, setIsPremium] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // 初期ユーザー状態を取得
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) fetchRole(user.id)
    })

    // 認証状態の変化をリアルタイムで監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        fetchRole(currentUser.id)
      } else {
        setIsPremium(false)
      }
    })

    return () => subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchRole(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()
    setIsPremium(data?.role === 'premium_user')
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    setIsPremium(false)
    router.push('/')
    router.refresh()
  }

  const AuthSection = () => {
    if (user) {
      return (
        <div className="flex items-center gap-2">
          {isPremium && (
            <span className="hidden lg:inline text-xs font-semibold px-2 py-0.5 rounded bg-[#F59E0B] text-[#1A1A2E]">
              プレミアム
            </span>
          )}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-[#E8E8F0] hover:text-white hover:bg-[#16213E]"
          >
            <Link href="/settings">
              <Settings className="h-4 w-4 mr-1" />
              設定
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-[#9CA3AF] hover:text-white hover:bg-[#16213E]"
          >
            <LogOut className="h-4 w-4 mr-1" />
            ログアウト
          </Button>
        </div>
      )
    }
    return (
      <Button asChild className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium">
        <Link href="/login">ログイン</Link>
      </Button>
    )
  }

  const MobileAuthSection = () => {
    if (user) {
      return (
        <div className="flex flex-col gap-2 pt-4 border-t border-[#16213E]">
          {isPremium && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F59E0B] text-[#1A1A2E] w-fit">
              プレミアム会員
            </span>
          )}
          <Button
            asChild
            variant="ghost"
            className="justify-start text-[#E8E8F0] hover:text-white hover:bg-[#16213E]"
          >
            <Link href="/settings" onClick={() => setIsOpen(false)}>
              <Settings className="h-4 w-4 mr-2" />
              設定
            </Link>
          </Button>
          <Button
            variant="ghost"
            onClick={() => { handleLogout(); setIsOpen(false) }}
            className="justify-start text-[#9CA3AF] hover:text-white hover:bg-[#16213E]"
          >
            <LogOut className="h-4 w-4 mr-2" />
            ログアウト
          </Button>
        </div>
      )
    }
    return (
      <div className="pt-4 border-t border-[#16213E]">
        <Button asChild className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium">
          <Link href="/login" onClick={() => setIsOpen(false)}>ログイン</Link>
        </Button>
      </div>
    )
  }

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
              <AuthSection />
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
                  <div className="relative">
                    <Input
                      placeholder="検索..."
                      className="bg-[#16213E] border-[#16213E] text-white placeholder:text-[#9CA3AF] mb-4"
                    />
                  </div>
                  <MobileAuthSection />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
