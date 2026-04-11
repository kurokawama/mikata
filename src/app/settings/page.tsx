/* v0-generated — settings page */
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { getProfile } from './actions'
import { SettingsForm } from './settings-form'

export const metadata: Metadata = {
  title: '設定 — MIKATA',
  description: '通知設定やジャンルの優先表示を管理します。',
}

export default async function SettingsPage() {
  const profile = await getProfile()
  if (!profile) redirect('/login')

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-[#1A1A2E] py-12 sm:py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              設定
            </h1>
            <p className="mt-2 text-[#9CA3AF]">
              通知やジャンルの優先表示を管理します
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
          <SettingsForm profile={profile} />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
