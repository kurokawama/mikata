'use server'

import { z } from 'zod/v4'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const signupSchema = z.object({
  email: z.email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
})

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const result = signupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'このメールアドレスは既に登録されています' }
    }
    return { error: '登録に失敗しました。もう一度お試しください' }
  }

  redirect('/signup/confirm')
}
