import { redirect } from 'next/navigation'
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
