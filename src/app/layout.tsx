import type { Metadata } from 'next'
import { Work_Sans, Newsreader, Montserrat, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['600', '700'],
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'MIKATA — 世界のミカタ',
  description:
    'AIが各国メディアの論調を分析し、独自解説+ソースリンクで多視点ニュースを日本語提供。同一ニュースを各国メディア視点で比較する日本初のサービス。',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ja"
      className={`${workSans.variable} ${newsreader.variable} ${montserrat.variable} ${notoSansJP.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
