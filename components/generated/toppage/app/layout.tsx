import type { Metadata } from 'next'
import { Newsreader, Work_Sans, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MIKATA — 世界のミカタ | 多視点ニュース',
  description: '複雑な世界を、確かな視点から読み解く。MIKATAは各国メディアの報道を比較・分析する多視点ニュースアプリです。',
  generator: 'v0.app',
  keywords: ['ニュース', '多視点', '国際報道', 'メディア分析', 'MIKATA'],
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${newsreader.variable} ${workSans.variable} ${montserrat.variable} font-sans antialiased bg-[#F8F9FA] text-[#1A1A2E]`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
