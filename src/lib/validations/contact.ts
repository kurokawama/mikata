import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください").max(100),
  email: z.string().email("有効なメールアドレスを入力してください"),
  subject: z.string().max(200).optional().default(""),
  message: z.string().min(1, "メッセージを入力してください").max(5000),
});
