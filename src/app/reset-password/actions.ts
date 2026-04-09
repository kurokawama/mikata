"use server";

import { createClient } from "@/lib/supabase/server";
import { resetPasswordSchema } from "@/lib/validations/auth";

export async function resetPassword(formData: FormData) {
  const raw = { email: formData.get("email") };

  const parsed = resetPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback` }
  );

  if (error) {
    return { error: "パスワードリセットメールの送信に失敗しました" };
  }

  return { success: "パスワードリセットメールを送信しました。メールを確認してください" };
}
