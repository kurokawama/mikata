import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import * as OTPAuth from "otpauth";

function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// POST /api/admin/totp/verify — verify TOTP token for admin session
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const { user_id, token } = body ?? {};

  if (!user_id || !token) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("admin_totp_secrets")
    .select("secret")
    .eq("user_id", user_id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "TOTP not configured" }, { status: 404 });
  }

  const totp = new OTPAuth.TOTP({
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(data.secret),
  });

  const delta = totp.validate({ token, window: 1 });
  if (delta === null) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Set admin session cookie (1 hour)
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_totp_verified", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600,
    path: "/admin",
  });
  return response;
}
