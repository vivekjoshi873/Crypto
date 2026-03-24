"use client";

import { Button } from "@/components/ui/button";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  message = "CoinGecko is taking a nap 😴 — Retrying in 15s...",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#ff4d6d30] bg-[#ff4d6d10] px-4 py-6 text-sm text-[#ff4d6d]">
      <p>{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="border-[#ff4d6d30] text-[#ff4d6d] hover:bg-[#ff4d6d15]"
        >
          Retry now
        </Button>
      )}
    </div>
  );
}
