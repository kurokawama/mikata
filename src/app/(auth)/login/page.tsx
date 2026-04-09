import { AuthForm } from "@/components/auth/auth-form";
import { login } from "@/app/login/actions";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string; message?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  async function loginAction(
    _state: { error?: string; success?: string } | null,
    formData: FormData
  ) {
    "use server";
    const result = await login(formData);
    return result ?? null;
  }

  return (
    <AuthForm
      type="login"
      action={loginAction}
      redirectParam={params.redirect}
      message={params.message ?? params.error}
    />
  );
}
