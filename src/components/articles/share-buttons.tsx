"use client";

import { X as XIcon, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareOnX = () => {
    const text = `${title} #MIKATA\n${url}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">シェア:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnX}
        className="h-7 gap-1.5 px-3 text-xs"
        aria-label="Xでシェア"
      >
        <XIcon className="h-3.5 w-3.5" />
        X
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={copyLink}
        className="h-7 gap-1.5 px-3 text-xs"
        aria-label="リンクをコピー"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
        {copied ? "コピー済み" : "リンク"}
      </Button>
    </div>
  );
}
