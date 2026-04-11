'use server'

import { getUser } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { z } from 'zod'

const PreferencesSchema = z.object({
  preferred_genres: z.array(z.string()).max(10),
  push_enabled: z.boolean(),
  display_name: z.string().max(50).nullable(),
})

export async function getProfile() {
  const user = await getUser()
  if (!user) return null

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('profiles')
    .select('display_name, preferred_genres, push_enabled, role, subscription_status, free_trial_ends_at')
    .eq('id', user.id)
    .single()

  return data
}

export async function updatePreferences(formData: FormData) {
  const user = await getUser()
  if (!user) throw new Error('認証が必要です')

  const preferred_genres = formData.getAll('genres').map(String)
  const push_enabled = formData.get('push_enabled') === 'on'
  const display_name = formData.get('display_name')?.toString() || null

  const parsed = PreferencesSchema.parse({ preferred_genres, push_enabled, display_name })

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('profiles')
    .update({
      preferred_genres: parsed.preferred_genres,
      push_enabled: parsed.push_enabled,
      display_name: parsed.display_name,
    })
    .eq('id', user.id)

  if (error) throw new Error('設定の保存に失敗しました')

  return { success: true }
}
