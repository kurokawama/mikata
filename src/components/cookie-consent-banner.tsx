"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const COOKIE_KEY = "mikata_cookie_consent";

export function CookieConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Delay slightly to avoid hydration flash
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 p-4 shadow-lg backdrop-blur-sm sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:rounded-lg sm:border">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Cookieの使用について</p>
          <p className="mt-1 text-xs text-muted-foreground">
            サービス向上のため分析Cookieを使用します。機能性Cookie（認証）は常に有効です。
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={accept} className="bg-amber-500 text-white hover:bg-amber-400 text-xs px-3 py-1 h-7">
              同意する
            </Button>
            <Button size="sm" variant="outline" onClick={decline} className="text-xs px-3 py-1 h-7">
              拒否する
            </Button>
          </div>
        </div>
        <button
          onClick={decline}
          className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
          aria-label="閉じる"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
