import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// POST /api/articles/publish-scheduled
// Called by n8n at 7:00 JST (premium) and 10:00 JST (free)
// Body: { mode: "premium" | "free" }
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const expectedKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const mode: "premium" | "free" = body.mode ?? "premium";

  const supabase = createServiceClient();
  const today = new Date().toISOString().split("T")[0];

  if (mode === "premium") {
    // 7:00 JST: publish approved drafts as premium
    const { data, error } = await supabase
      .from("articles")
      .update({ status: "published", is_premium: true })
      .eq("status", "draft")
      .gte("published_at", today)
      .select("id");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ published: data?.length ?? 0, mode: "premium" });
  } else {
    // 10:00 JST: unlock today's premium articles for free users
    const { data, error } = await supabase
      .from("articles")
      .update({ is_premium: false })
      .eq("status", "published")
      .eq("is_premium", true)
      .gte("published_at", today)
      .select("id");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ unlocked: data?.length ?? 0, mode: "free" });
  }
}
