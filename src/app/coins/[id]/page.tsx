"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PriceChart } from "@/components/coin/PriceChart";
import { PriceFeed } from "@/components/coin/PriceFeed";
import { RangeToggle } from "@/components/coin/RangeToggle";
import { StatGrid } from "@/components/coin/StatGrid";
import { WatchlistButton } from "@/components/coin/WatchlistButton";
import { ErrorState } from "@/components/common/ErrorState";
import { usePrices } from "@/hooks/usePrices";
import { useCoinHistory } from "@/hooks/useCoinHistory";
import { useTickers } from "@/hooks/useTickers";
import { HISTORY_RANGES } from "@/lib/constants";
import { formatCurrency, formatPercent } from "@/lib/format";

export default function CoinDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [range, setRange] = useState<string>(HISTORY_RANGES[1].value);
  const { data: coins, isLoading, error, refetch } = usePrices({
    ids: [id],
    perPage: 1,
  });
  const coin = coins?.[0];
  const { data: history, isLoading: historyLoading } = useCoinHistory(
    id,
    range,
  );
  const { data: tickers, isLoading: tickersLoading } = useTickers(id);

  if (error) {
    return (
      <div className="p-6">
        <ErrorState
          message="Failed to load coin details."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 lg:px-10">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {coin?.image && (
            <Image
              src={coin.image}
              alt={coin?.name ?? "coin"}
              width={56}
              height={56}
              className="rounded-full"
            />
          )}
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Rank #{coin?.market_cap_rank ?? "—"}
            </p>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              {coin?.name ?? "Loading..."}
            </h1>
            <p className="text-slate-400">{coin?.symbol?.toUpperCase()}</p>
          </div>
        </div>
        {coin && <WatchlistButton coinId={id} />}
      </div>

      <section className="mt-6 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">Price</p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(coin?.current_price ?? 0, {
                  notation: "standard",
                  maximumFractionDigits: 4,
                })}
              </p>
              <p className="text-sm text-slate-400">
                24h:{" "}
                <span
                  className={
                    (coin?.price_change_percentage_24h ?? 0) >= 0
                      ? "text-emerald-300"
                      : "text-rose-300"
                  }
                >
                  {formatPercent(coin?.price_change_percentage_24h ?? 0)}
                </span>
              </p>
            </div>
            <RangeToggle value={range} onChange={setRange} />
          </div>
          <PriceChart data={history} isLoading={historyLoading || isLoading} />
        </Card>

        <Card>
          <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Latest Markets</h3>
          <PriceFeed data={tickers} isLoading={tickersLoading} />
          <div className="mt-3 text-xs text-slate-500">
            Live tickers update every ~30s. Data courtesy of CoinGecko.
          </div>
        </Card>
      </section>

      <section className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Market Stats</h3>
        <StatGrid coin={coin} />
      </section>

      <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
        <ExternalLink className="h-4 w-4" />
        Data refreshes automatically; pan/zoom available with mouse wheel.
      </div>
    </main>
  );
}

