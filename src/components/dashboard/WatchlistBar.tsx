"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { usePrices } from "@/hooks/usePrices";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function WatchlistBar() {
  const { items } = useWatchlist();
  const { data, isLoading } = usePrices({
    ids: items,
    perPage: items.length || 5,
    enabled: items.length > 0,
    sortKey: "market_cap",
  });

  if (!items.length) return null;

  return (
    <Card className="space-y-3">
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-amber-300" />
        <p className="text-sm font-semibold text-white">Your Watchlist</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {isLoading && <p className="text-xs text-slate-400">Refreshing...</p>}
        {data?.map((coin) => (
          <Link
            key={coin.id}
            href={`/coins/${coin.id}`}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs transition hover:border-sky-500"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold uppercase text-white">
                {coin.symbol}
              </span>
              <Badge
                variant={
                  (coin.price_change_percentage_24h ?? 0) >= 0
                    ? "success"
                    : "danger"
                }
              >
                {formatPercent(coin.price_change_percentage_24h)}
              </Badge>
            </div>
            <p className="mt-1 text-slate-200">
              {formatCurrency(coin.current_price, { notation: "standard" })}
            </p>
          </Link>
        ))}
      </div>
    </Card>
  );
}
