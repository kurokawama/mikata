/* v0-generated — adapted from components/generated/admindashboard */
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: '管理画面 — MIKATA',
  robots: { index: false, follow: false },
}
import { getUser } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { AdminDashboard } from './admin-dashboard'
import { getAdminStats, getDraftArticles } from './actions'

export default async function AdminPage() {
  const user = await getUser()
  if (!user) redirect('/login')

  const supabase = createAdminClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/')

  const [stats, drafts] = await Promise.all([
    getAdminStats(),
    getDraftArticles(),
  ])

  return (
    <AdminDashboard
      stats={stats ?? { draftCount: 0, publishedCount: 0, totalCount: 0, sourceCount: 0 }}
      drafts={drafts}
    />
  )
}
