import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import webpush from "web-push";

function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || "mailto:admin@mikata.vercel.app",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// POST /api/push/notify — called by n8n at 8am JST to send daily push
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const expectedKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const title = body.title || "MIKATAの今日のニュース";
  const message = body.message || "本日の多視点ニュースが公開されました";

  const serviceClient = createServiceClient();
  const { data: subscriptions, error } = await serviceClient
    .from("push_subscriptions")
    .select("endpoint, p256dh, auth");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!subscriptions || subscriptions.length === 0) {
    return NextResponse.json({ sent: 0, message: "no subscriptions" });
  }

  const payload = JSON.stringify({
    title,
    body: message,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    url: "/",
  });

  let sent = 0;
  let failed = 0;
  const expiredEndpoints: string[] = [];

  await Promise.allSettled(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload
        );
        sent++;
      } catch (err: unknown) {
        const statusCode = (err as { statusCode?: number }).statusCode;
        if (statusCode === 410 || statusCode === 404) {
          expiredEndpoints.push(sub.endpoint);
        }
        failed++;
      }
    })
  );

  // Clean up expired subscriptions
  if (expiredEndpoints.length > 0) {
    await serviceClient
      .from("push_subscriptions")
      .delete()
      .in("endpoint", expiredEndpoints);
  }

  return NextResponse.json({ sent, failed, expired: expiredEndpoints.length });
}
