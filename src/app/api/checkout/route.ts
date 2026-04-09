import { NextResponse } from "next/server";
import { stripe, PRICE_ID, TRIAL_PERIOD_DAYS } from "@/lib/stripe";
import { getUser } from "@/lib/supabase/server";

export async function POST() {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: PRICE_ID, quantity: 1 }],
    subscription_data: {
      trial_period_days: TRIAL_PERIOD_DAYS,
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings`,
    metadata: {
      user_id: user.id,
    },
    customer_email: user.email,
  });

  return NextResponse.json({ url: session.url });
}
