'use server'

import { z } from 'zod/v4'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const loginSchema = z.object({
  email: z.email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
})

export async function login(formData: FormData) {
  const supabase = await createClient()

  const result = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { error } = await supabase.auth.signInWithPassword(result.data)

  if (error) {
    return { error: 'メールアドレスまたはパスワードが正しくありません' }
  }

  const redirectTo = formData.get('redirect') as string | null
  redirect(redirectTo || '/')
}
