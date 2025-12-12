"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpDown, Star } from "lucide-react";
import { useMemo } from "react";
import { Sparkline } from "@/components/dashboard/Sparkline";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPercent } from "@/lib/format";
import { CoinMarket, SortKey } from "@/lib/types";
import { useWatchlist } from "@/hooks/useWatchlist";
import { cn } from "@/components/ui/cn";

type Props = {
  coins: CoinMarket[];
  onSort: (key: SortKey) => void;
  sortKey: SortKey;
  isLoading: boolean;
};

export function MarketTable({ coins, onSort, sortKey, isLoading }: Props) {
  const { toggle, isWatched } = useWatchlist();

  const headers: Array<{ key: SortKey; label: string }> = useMemo(
    () => [
      { key: "current_price", label: "Price" },
      { key: "price_change_percentage_24h", label: "24h %" },
      { key: "price_change_percentage_7d_in_currency", label: "7d %" },
      { key: "market_cap", label: "Market Cap" },
      { key: "total_volume", label: "Volume" },
    ],
    [],
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">Watch</th>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Name</th>
              {headers.map((h) => (
                <th
                  key={h.key}
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => onSort(h.key)}
                >
                  <div className="flex items-center gap-1">
                    {h.label}
                    <ArrowUpDown
                      className={cn(
                        "h-3 w-3",
                        sortKey === h.key ? "text-white" : "text-slate-500",
                      )}
                    />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3">Sparkline</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              const positive = (coin.price_change_percentage_24h ?? 0) >= 0;
              return (
                <tr
                  key={coin.id}
                  className="border-t border-white/5 text-sm transition hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <button
                      className="text-amber-300 transition hover:scale-110"
                      aria-label="Toggle watchlist"
                      onClick={() => toggle(coin.id)}
                    >
                      <Star
                        className={cn("h-4 w-4", isWatched(coin.id) && "fill-amber-300")}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{coin.market_cap_rank}</td>
                  <td className="px-4 py-3">
                    <Link href={`/coins/${coin.id}`} className="flex items-center gap-2">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-white">{coin.name}</p>
                        <p className="text-xs uppercase text-slate-400">{coin.symbol}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">{formatCurrency(coin.current_price, { notation: "standard" })}</td>
                  <td className="px-4 py-3">
                    <Badge variant={positive ? "success" : "danger"}>
                      {formatPercent(coin.price_change_percentage_24h)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        (coin.price_change_percentage_7d_in_currency ?? 0) >= 0
                          ? "success"
                          : "danger"
                      }
                    >
                      {formatPercent(coin.price_change_percentage_7d_in_currency ?? 0)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    {formatCurrency(coin.market_cap)}
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    {formatCurrency(coin.total_volume)}
                  </td>
                  <td className="px-4 py-3">
                    <Sparkline coin={coin} />
                  </td>
                </tr>
              );
            })}
            {isLoading && (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-sm text-slate-400">
                  Loading market data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-3 p-3 md:hidden">
        {coins.map((coin) => (
          <Link
            key={coin.id}
            href={`/coins/${coin.id}`}
            className="rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-white">{coin.name}</p>
                  <p className="text-xs uppercase text-slate-400">{coin.symbol}</p>
                </div>
              </div>
              <button
                className="text-amber-300 transition hover:scale-110"
                aria-label="Toggle watchlist"
                onClick={(e) => {
                  e.preventDefault();
                  toggle(coin.id);
                }}
              >
                <Star
                  className={cn("h-5 w-5", isWatched(coin.id) && "fill-amber-300")}
                />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-300">
              <span>Price</span>
              <span className="text-right font-semibold text-white">
                {formatCurrency(coin.current_price, { notation: "standard" })}
              </span>
              <span>24h</span>
              <span className="text-right">
                <Badge
                  variant={
                    (coin.price_change_percentage_24h ?? 0) >= 0 ? "success" : "danger"
                  }
                >
                  {formatPercent(coin.price_change_percentage_24h)}
                </Badge>
              </span>
              <span>7d</span>
              <span className="text-right">
                <Badge
                  variant={
                    (coin.price_change_percentage_7d_in_currency ?? 0) >= 0
                      ? "success"
                      : "danger"
                  }
                >
                  {formatPercent(coin.price_change_percentage_7d_in_currency ?? 0)}
                </Badge>
              </span>
              <span>Cap</span>
              <span className="text-right">{formatCurrency(coin.market_cap)}</span>
              <span>Volume</span>
              <span className="text-right">{formatCurrency(coin.total_volume)}</span>
            </div>
            <div className="mt-3">
              <Sparkline coin={coin} />
            </div>
          </Link>
        ))}
        {isLoading && (
          <p className="text-center text-sm text-slate-400">Loading market data...</p>
        )}
      </div>
    </div>
  );
}

