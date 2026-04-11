'use server'

import { z } from 'zod/v4'
import { createClient } from '@/lib/supabase/server'

const resetSchema = z.object({
  email: z.email('有効なメールアドレスを入力してください'),
})

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const result = resetSchema.safeParse({
    email: formData.get('email'),
  })

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(result.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/settings`,
  })

  if (error) {
    return { error: 'リセットメールの送信に失敗しました' }
  }

  return { success: true }
}
