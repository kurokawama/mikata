"use server";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteAccount(): Promise<{ error?: string } | void> {
  const user = await getUser();
  if (!user) {
    return { error: "認証が必要です" };
  }

  // Use service role to delete user (bypasses RLS)
  const adminClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Delete profile first (cascades to bookmarks, etc.)
  const { error: profileError } = await adminClient
    .from("profiles")
    .delete()
    .eq("id", user.id);

  if (profileError) {
    console.error("[deleteAccount] profile delete error:", profileError);
    return { error: "プロフィール削除に失敗しました" };
  }

  // Delete auth user
  const { error: authError } = await adminClient.auth.admin.deleteUser(user.id);

  if (authError) {
    console.error("[deleteAccount] auth delete error:", authError);
    return { error: "アカウント削除に失敗しました" };
  }

  redirect("/");
}
