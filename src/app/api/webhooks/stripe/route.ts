import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";

// Use service_role for webhook handler (server-side only)
function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Stripe v22 moved current_period_end to item level
function getSubscriptionPeriodEnd(subscription: Stripe.Subscription): string {
  const firstItem = subscription.items?.data?.[0];
  const periodEnd = firstItem?.current_period_end ?? Math.floor(Date.now() / 1000);
  return new Date(periodEnd * 1000).toISOString();
}

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.subscription && session.metadata?.user_id) {
        const subResponse = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const subscription = subResponse as Stripe.Subscription;
        await supabase.from("subscriptions").upsert(
          {
            user_id: session.metadata.user_id,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: subscription.id,
            status: subscription.status === "trialing" ? "trialing" : "active",
            current_period_end: getSubscriptionPeriodEnd(subscription),
          },
          { onConflict: "stripe_subscription_id" }
        );
        await supabase
          .from("profiles")
          .update({
            subscription_status:
              subscription.status === "trialing" ? "trialing" : "active",
            trial_ends_at: subscription.trial_end
              ? new Date(subscription.trial_end * 1000).toISOString()
              : null,
          })
          .eq("id", session.metadata.user_id);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const { data: existingSub } = await supabase
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_subscription_id", subscription.id)
        .single();

      if (existingSub) {
        const status = mapStripeStatus(subscription.status);
        await supabase
          .from("subscriptions")
          .update({
            status,
            current_period_end: getSubscriptionPeriodEnd(subscription),
          })
          .eq("stripe_subscription_id", subscription.id);

        await supabase
          .from("profiles")
          .update({ subscription_status: status })
          .eq("id", existingSub.user_id);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const { data: existingSub } = await supabase
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_subscription_id", subscription.id)
        .single();

      if (existingSub) {
        await supabase
          .from("subscriptions")
          .update({ status: "canceled" })
          .eq("stripe_subscription_id", subscription.id);

        await supabase
          .from("profiles")
          .update({ subscription_status: "canceled" })
          .eq("id", existingSub.user_id);
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as unknown as { subscription?: string };
      const subscriptionId = invoice.subscription;
      if (subscriptionId) {
        const { data: existingSub } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_subscription_id", subscriptionId)
          .single();

        if (existingSub) {
          await supabase
            .from("subscriptions")
            .update({ status: "past_due" })
            .eq("stripe_subscription_id", subscriptionId);

          await supabase
            .from("profiles")
            .update({ subscription_status: "past_due" })
            .eq("id", existingSub.user_id);
        }
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}

function mapStripeStatus(
  status: Stripe.Subscription.Status
): "active" | "trialing" | "canceled" | "past_due" | "incomplete" {
  switch (status) {
    case "active":
      return "active";
    case "trialing":
      return "trialing";
    case "canceled":
      return "canceled";
    case "past_due":
      return "past_due";
    default:
      return "incomplete";
  }
}
