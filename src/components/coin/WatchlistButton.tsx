"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/hooks/useWatchlist";
import { cn } from "@/components/ui/cn";

type Props = {
  coinId: string;
};

export function WatchlistButton({ coinId }: Props) {
  const { toggle, isWatched } = useWatchlist();
  const active = isWatched(coinId);

  return (
    <Button
      variant={active ? "outline" : "primary"}
      className="flex items-center gap-2"
      onClick={() => toggle(coinId)}
      aria-pressed={active}
    >
      <Star className={cn("h-4 w-4", active && "fill-amber-300 text-amber-300")} />
      {active ? "On Watchlist" : "Add to Watchlist"}
    </Button>
  );
}

