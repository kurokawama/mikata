import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import * as OTPAuth from "otpauth";

function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// GET /api/admin/totp/setup — generate new TOTP secret for admin
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Only admin users can set up TOTP
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const secret = new OTPAuth.Secret({ size: 20 });
  const totp = new OTPAuth.TOTP({
    issuer: "MIKATA",
    label: user.email ?? "admin",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret,
  });

  const serviceClient = createServiceClient();
  await serviceClient
    .from("admin_totp_secrets")
    .upsert({ user_id: user.id, secret: secret.base32 }, { onConflict: "user_id" });

  return NextResponse.json({
    uri: totp.toString(),
    secret: secret.base32,
  });
}
