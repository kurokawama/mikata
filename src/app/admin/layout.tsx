import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Newspaper, Radio, Megaphone, Settings, Home } from "lucide-react";
import { getUser, getProfile } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const adminNav = [
  { href: "/admin", label: "ダッシュボード", icon: Home },
  { href: "/admin/articles", label: "記事管理", icon: Newspaper },
  { href: "/admin/sources", label: "ソース管理", icon: Radio },
  { href: "/admin/ads", label: "広告管理", icon: Megaphone },
  { href: "/admin/settings", label: "設定", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/login?redirect=/admin");

  const profile = await getProfile();
  if (profile?.role !== "admin") redirect("/");

  // Check if admin has TOTP configured
  const serviceClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data: totpSecret } = await serviceClient
    .from("admin_totp_secrets")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  // If TOTP is configured, verify the session cookie
  if (totpSecret) {
    const cookieStore = await cookies();
    const totpVerified = cookieStore.get("admin_totp_verified")?.value;
    if (!totpVerified) {
      redirect("/admin-totp");
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-800 text-white flex-shrink-0">
        <div className="p-6">
          <Link href="/admin" className="block">
            <span className="text-xl font-heading font-bold">
              MI<span className="text-amber-500">KA</span>TA
            </span>
            <span className="ml-2 text-xs text-navy-300">Admin</span>
          </Link>
        </div>
        <nav className="px-3 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-navy-200 transition-colors hover:bg-navy-700 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4 border-t border-navy-700">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-navy-300 hover:text-white"
          >
            ← サイトに戻る
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-navy-50">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
