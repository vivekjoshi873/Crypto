"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { usePrices } from "@/hooks/usePrices";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function EmptyWatchlistSvg() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-3 opacity-40"
    >
      <circle cx="40" cy="40" r="38" stroke="#1e2124" strokeWidth="2" />
      <path
        d="M40 20l5.878 11.91L59 33.82l-9.5 9.26L51.756 56 40 49.91 28.244 56l2.256-12.92L21 33.82l13.122-1.91L40 20z"
        stroke="#00c9a7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function WatchlistBar() {
  const { items } = useWatchlist();
  const { data, isLoading } = usePrices({
    ids: items,
    perPage: items.length || 5,
    enabled: items.length > 0,
    sortKey: "market_cap",
  });

  if (!items.length) {
    return (
      <Card className="flex flex-col items-center justify-center py-8 text-center">
        <EmptyWatchlistSvg />
        <p className="text-sm text-[#8b9196]">
          Your watchlist is empty. Star a coin to track it here.
        </p>
      </Card>
    );
  }

  return (
    <Card className="space-y-3">
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-[#00c9a7] fill-[#00c9a7]" />
        <p className="text-sm font-semibold text-[#f0f2f1]">Your Watchlist</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {isLoading && (
          <p className="text-xs text-[#8b9196]">Refreshing...</p>
        )}
        {data?.map((coin) => (
          <Link
            key={coin.id}
            href={`/coins/${coin.id}`}
            className="rounded-xl border border-[#1e2124] bg-[#0d0f10] px-3 py-2 text-xs transition hover:border-[#00c9a7]"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold uppercase text-[#f0f2f1]">
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
            <p className="mt-1 text-[#f0f2f1]">
              {formatCurrency(coin.current_price, { notation: "standard" })}
            </p>
          </Link>
        ))}
      </div>
    </Card>
  );
}
