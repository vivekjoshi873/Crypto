"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpDown, Star, Plus } from "lucide-react";
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
  onAddPortfolio?: (coin: CoinMarket) => void;
};

function PriceEmoji({ value }: { value: number }) {
  if (value > 5) return <span title="Up more than 5%">🔥</span>;
  if (value < -5) return <span title="Down more than 5%">🥶</span>;
  return null;
}

export function MarketTable({
  coins,
  onSort,
  sortKey,
  isLoading,
  onAddPortfolio,
}: Props) {
  const { toggle, isWatched } = useWatchlist();

  const headers: Array<{ key: SortKey; label: string }> = useMemo(
    () => [
      { key: "current_price", label: "Price" },
      { key: "price_change_percentage_24h", label: "24h %" },
      { key: "price_change_percentage_7d_in_currency", label: "7d %" },
      { key: "market_cap", label: "Market Cap" },
      { key: "total_volume", label: "Volume" },
    ],
    []
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1e2124] bg-[#141618]">
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead className="bg-[#0d0f10] text-xs uppercase tracking-wide text-[#8b9196]">
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
                        sortKey === h.key
                          ? "text-[#00c9a7]"
                          : "text-[#8b9196]"
                      )}
                    />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3">Sparkline</th>
              {onAddPortfolio && <th className="px-4 py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              const change24h = coin.price_change_percentage_24h ?? 0;
              const change7d =
                coin.price_change_percentage_7d_in_currency ?? 0;
              const positive24h = change24h >= 0;
              const positive7d = change7d >= 0;
              return (
                <tr
                  key={coin.id}
                  className="market-row border-t border-[#1e2124] text-sm"
                >
                  <td className="px-4 py-3">
                    <button
                      className="text-[#00c9a7] transition hover:scale-110"
                      aria-label="Toggle watchlist"
                      onClick={() => toggle(coin.id)}
                    >
                      <Star
                        className={cn(
                          "h-4 w-4",
                          isWatched(coin.id) && "fill-[#00c9a7]"
                        )}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[#8b9196]">
                    {coin.market_cap_rank}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/coins/${coin.id}`}
                      className="flex items-center gap-2"
                    >
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-[#f0f2f1]">
                          {coin.name}
                        </p>
                        <p className="text-xs uppercase text-[#8b9196]">
                          {coin.symbol}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[#f0f2f1]">
                    {formatCurrency(coin.current_price, {
                      notation: "standard",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={positive24h ? "success" : "danger"}>
                      {formatPercent(change24h)}
                      <PriceEmoji value={change24h} />
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={positive7d ? "success" : "danger"}>
                      {formatPercent(change7d)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[#f0f2f1]">
                    {formatCurrency(coin.market_cap)}
                  </td>
                  <td className="px-4 py-3 text-[#f0f2f1]">
                    {formatCurrency(coin.total_volume)}
                  </td>
                  <td className="px-4 py-3">
                    <Sparkline coin={coin} />
                  </td>
                  {onAddPortfolio && (
                    <td className="px-4 py-3">
                      <button
                        className="rounded-lg border border-[#1e2124] p-1.5 text-[#8b9196] transition hover:border-[#00c9a7] hover:text-[#00c9a7]"
                        aria-label={`Add ${coin.name} to portfolio`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddPortfolio(coin);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
            {isLoading && (
              <tr>
                <td
                  colSpan={onAddPortfolio ? 10 : 9}
                  className="px-4 py-6 text-center text-sm text-[#8b9196]"
                >
                  Loading market data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-3 p-3 md:hidden">
        {coins.map((coin) => {
          const change24h = coin.price_change_percentage_24h ?? 0;
          const change7d = coin.price_change_percentage_7d_in_currency ?? 0;
          return (
            <Link
              key={coin.id}
              href={`/coins/${coin.id}`}
              className="rounded-xl border border-[#1e2124] bg-[#141618] p-3"
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
                    <p className="font-semibold text-[#f0f2f1]">{coin.name}</p>
                    <p className="text-xs uppercase text-[#8b9196]">
                      {coin.symbol}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {onAddPortfolio && (
                    <button
                      className="rounded-lg border border-[#1e2124] p-1 text-[#8b9196] transition hover:border-[#00c9a7] hover:text-[#00c9a7] cursor-pointer"
                      aria-label={`Add ${coin.name} to portfolio`}
                      onClick={(e) => {
                        e.preventDefault();
                        onAddPortfolio(coin);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    className="text-[#00c9a7] transition hover:scale-110"
                    aria-label="Toggle watchlist"
                    onClick={(e) => {
                      e.preventDefault();
                      toggle(coin.id);
                    }}
                  >
                    <Star
                      className={cn(
                        "h-5 w-5",
                        isWatched(coin.id) && "fill-[#00c9a7]"
                      )}
                    />
                  </button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-[#8b9196]">
                <span>Price</span>
                <span className="text-right font-semibold text-[#f0f2f1]">
                  {formatCurrency(coin.current_price, { notation: "standard" })}
                </span>
                <span>24h</span>
                <span className="text-right">
                  <Badge variant={change24h >= 0 ? "success" : "danger"}>
                    {formatPercent(change24h)}
                    <PriceEmoji value={change24h} />
                  </Badge>
                </span>
                <span>7d</span>
                <span className="text-right">
                  <Badge variant={change7d >= 0 ? "success" : "danger"}>
                    {formatPercent(change7d)}
                  </Badge>
                </span>
                <span>Cap</span>
                <span className="text-right">
                  {formatCurrency(coin.market_cap)}
                </span>
                <span>Volume</span>
                <span className="text-right">
                  {formatCurrency(coin.total_volume)}
                </span>
              </div>
              <div className="mt-3">
                <Sparkline coin={coin} />
              </div>
            </Link>
          );
        })}
        {isLoading && (
          <p className="text-center text-sm text-[#8b9196]">
            Loading market data...
          </p>
        )}
      </div>
    </div>
  );
}
