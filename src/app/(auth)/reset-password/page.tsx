import { AuthForm } from "@/components/auth/auth-form";
import { resetPassword } from "@/app/reset-password/actions";

export default function ResetPasswordPage() {
  async function resetAction(
    _state: { error?: string; success?: string } | null,
    formData: FormData
  ) {
    "use server";
    return await resetPassword(formData);
  }

  return <AuthForm type="reset" action={resetAction} />;
}
