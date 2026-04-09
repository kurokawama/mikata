import { AuthForm } from "@/components/auth/auth-form";
import { signup } from "@/app/signup/actions";

export default function SignupPage() {
  async function signupAction(
    _state: { error?: string; success?: string } | null,
    formData: FormData
  ) {
    "use server";
    const result = await signup(formData);
    return result ?? null;
  }

  return <AuthForm type="signup" action={signupAction} />;
}
