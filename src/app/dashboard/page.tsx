"use client";

import { useMemo, useState } from "react";
import { Activity, Bell, RefreshCcw } from "lucide-react";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { MarketTable } from "@/components/dashboard/MarketTable";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { Pagination } from "@/components/dashboard/Pagination";
import { WatchlistBar } from "@/components/dashboard/WatchlistBar";
import { ErrorState } from "@/components/common/ErrorState";
import { useGlobalStats } from "@/hooks/useGlobalStats";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { usePreferences } from "@/hooks/usePreferences";
import { usePrices } from "@/hooks/usePrices";
import { SEARCH_DEBOUNCE, DEFAULT_PER_PAGE } from "@/lib/constants";
import { SortKey } from "@/lib/types";

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { prefs, setPrefs } = usePreferences();
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE);

  const { data: stats, isLoading: statsLoading } = useGlobalStats();
  const {
    data = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = usePrices({
    page,
    perPage: DEFAULT_PER_PAGE,
    search: debouncedSearch,
    sortKey: prefs.sortKey,
    direction: prefs.direction,
    refetchInterval: prefs.refreshMs,
  });

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return data;
    return data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [data, debouncedSearch]);

  const handleSort = (key: SortKey) => {
    setPrefs((prev) => ({
      ...prev,
      sortKey: key,
      direction: prev.sortKey === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 lg:px-10">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Live Crypto</p>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
            Crypto Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            Real-time prices, charts, and your personal watchlist.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
            <Activity className="h-4 w-4" />
            Live 15s refresh
          </div>
        </div>
      </header>

      <SummaryCards stats={stats} isLoading={statsLoading} />
      <div className="my-4">
        <WatchlistBar />
      </div>

      <section className="mt-6 space-y-4">
        <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
          <SearchBar value={search} onChange={setSearch} className="md:max-w-md" />
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <button
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 transition hover:border-sky-500"
              onClick={() => refetch()}
            >
              <RefreshCcw className="h-4 w-4" />
              {isFetching ? "Refreshing..." : "Manual refresh"}
            </button>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2">
              <Bell className="h-4 w-4 text-amber-300" />
              <span>Polling every {Math.round(prefs.refreshMs / 1000)}s</span>
            </div>
          </div>
        </div>

        {error ? (
          <ErrorState
            message="Failed to load prices — retrying with backoff."
            onRetry={() => refetch()}
          />
        ) : (
          <MarketTable
            coins={filtered}
            sortKey={prefs.sortKey}
            onSort={handleSort}
            isLoading={isLoading}
          />
        )}

        <div className="flex items-center justify-between">
          <Pagination page={page} onPageChange={setPage} disabled={isFetching} />
          <p className="text-xs text-slate-400">
            Showing {filtered.length} of {DEFAULT_PER_PAGE} coins
          </p>
        </div>
      </section>
    </main>
  );
}

