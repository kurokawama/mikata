import { redirect } from 'next/navigation'
import { getUser } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ManualSubmitForm } from './manual-submit-form'

export default async function ManualSubmitPage() {
  const user = await getUser()
  if (!user) redirect('/login')

  const supabase = createAdminClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="h-14 bg-[#1A1A2E] flex items-center px-5">
        <a
          href="/admin"
          className="text-white/60 hover:text-white text-sm transition-colors mr-4"
        >
          &larr; ダッシュボード
        </a>
        <h1 className="text-lg font-bold text-white font-[family-name:var(--font-montserrat)]">
          手動投入
        </h1>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-8">
        <ManualSubmitForm />
      </main>
    </div>
  )
}
