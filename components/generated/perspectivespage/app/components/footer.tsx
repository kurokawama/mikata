import Link from "next/link"
import { Globe } from "lucide-react"
import { Separator } from "../components/ui/separator"

const footerLinks = {
  サービス: [
    { label: "視点を探索", href: "/perspectives" },
    { label: "トピック一覧", href: "/topics" },
    { label: "プレミアムプラン", href: "/premium" },
    { label: "API連携", href: "/api" },
  ],
  会社概要: [
    { label: "MIKATAについて", href: "/about" },
    { label: "ミッション", href: "/mission" },
    { label: "採用情報", href: "/careers" },
    { label: "お問い合わせ", href: "/contact" },
  ],
  サポート: [
    { label: "ヘルプセンター", href: "/help" },
    { label: "プライバシーポリシー", href: "/privacy" },
    { label: "利用規約", href: "/terms" },
    { label: "Cookieポリシー", href: "/cookies" },
  ],
}

export function Footer() {
  return (
    <footer
      className="border-t border-[#16213E]"
      style={{ backgroundColor: "#1A1A2E" }}
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded-sm w-fit"
              aria-label="MIKATA トップページへ"
            >
              <Globe className="h-5 w-5 text-[#F59E0B]" aria-hidden="true" />
              <span
                className="text-base font-bold tracking-widest text-white"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                MIKATA
              </span>
            </Link>
            <p
              className="text-sm text-[#9CA3AF] leading-relaxed max-w-xs"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              世界のニュースを多視点で。50カ国以上のメディアから最新情報をお届けします。
            </p>
            <div className="mt-5 flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full bg-[#22C55E] inline-block animate-pulse"
                aria-hidden="true"
              />
              <span
                className="text-xs text-[#9CA3AF]"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                リアルタイム更新中
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3
                className="text-xs font-semibold text-[#E8E8F0] uppercase tracking-wider mb-4"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {category}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#9CA3AF] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded-sm"
                      style={{ fontFamily: "'Work Sans', sans-serif" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-[#16213E]" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#4B5563]"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            © 2026 MIKATA Global Intelligence. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span
              className="text-xs text-[#4B5563]"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              言語:
            </span>
            <button
              className="text-xs text-[#9CA3AF] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded-sm px-1"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
              aria-label="日本語を選択（現在選択中）"
              aria-pressed="true"
            >
              日本語
            </button>
            <button
              className="text-xs text-[#4B5563] hover:text-[#9CA3AF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded-sm px-1"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
              aria-label="Englishを選択"
            >
              English
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
