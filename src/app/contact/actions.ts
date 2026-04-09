"use server";

import { createClient, getUser } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validations/contact";

export async function submitContact(
  _state: { error?: string; success?: string } | null,
  formData: FormData
) {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") ?? "",
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const user = await getUser();
  const supabase = await createClient();

  const { error } = await supabase.from("contact_submissions").insert({
    user_id: user?.id ?? null,
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
    status: "new" as const,
  });

  if (error) {
    return { error: "送信に失敗しました。もう一度お試しください" };
  }

  return { success: "お問い合わせを受け付けました。ありがとうございます" };
}
