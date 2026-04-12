"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PushNotificationButton() {
  const [supported, setSupported] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setSupported(true);
      checkSubscription();
    }
  }, []);

  async function checkSubscription() {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      setSubscribed(!!sub);
    } catch {
      // ignore
    }
  }

  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return null;
    try {
      return await navigator.serviceWorker.register("/sw.js");
    } catch {
      return null;
    }
  }

  async function subscribe() {
    setLoading(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setLoading(false);
        return;
      }

      const reg = await registerServiceWorker();
      if (!reg) {
        setLoading(false);
        return;
      }

      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) {
        setLoading(false);
        return;
      }

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey) as BufferSource,
      });

      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });

      setSubscribed(true);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function unsubscribe() {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setSubscribed(false);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  if (!supported) return null;

  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-foreground">プッシュ通知</p>
        <p className="text-xs text-muted-foreground">
          {subscribed ? "毎朝8時に今日のニュースをお知らせします" : "通知を有効にして最新ニュースを受け取る"}
        </p>
      </div>
      <Button
        variant={subscribed ? "outline" : "default"}
        size="sm"
        onClick={subscribed ? unsubscribe : subscribe}
        disabled={loading}
      >
        {subscribed ? (
          <>
            <BellOff className="h-4 w-4 mr-1" />
            通知オフ
          </>
        ) : (
          <>
            <Bell className="h-4 w-4 mr-1" />
            通知オン
          </>
        )}
      </Button>
    </div>
  );
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}
