"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  message = "Failed to load data.",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-6 text-sm text-rose-100">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        <p>{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
