"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCcw, LayoutDashboard, Briefcase } from "lucide-react";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { MarketTable } from "@/components/dashboard/MarketTable";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { Pagination } from "@/components/dashboard/Pagination";
import { WatchlistBar } from "@/components/dashboard/WatchlistBar";
import { ErrorState } from "@/components/common/ErrorState";
import { PortfolioModal } from "@/components/dashboard/PortfolioModal";
import { PortfolioTab } from "@/components/dashboard/PortfolioTab";
import { useGlobalStats } from "@/hooks/useGlobalStats";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { usePreferences } from "@/hooks/usePreferences";
import { usePrices } from "@/hooks/usePrices";
import { usePortfolio } from "@/hooks/usePortfolio";
import { SEARCH_DEBOUNCE, DEFAULT_PER_PAGE } from "@/lib/constants";
import { SortKey, CoinMarket } from "@/lib/types";

function LastUpdatedCounter({ intervalMs }: { intervalMs: number }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
    const timer = setInterval(() => {
      setSeconds((s) => {
        const next = s + 1;
        return next >= intervalMs / 1000 ? 0 : next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <span className="text-xs text-[#8b9196]">
      Last updated {seconds}s ago
    </span>
  );
}

type TabKey = "dashboard" | "portfolio";

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [modalCoin, setModalCoin] = useState<CoinMarket | null>(null);
  const { prefs, setPrefs } = usePreferences();
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE);
  const { holdings, setHolding, removeHolding, getAmount } = usePortfolio();

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
        coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [data, debouncedSearch]);

  const handleSort = (key: SortKey) => {
    setPrefs((prev) => ({
      ...prev,
      sortKey: key,
      direction:
        prev.sortKey === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const handleAddPortfolio = useCallback((coin: CoinMarket) => {
    setModalCoin(coin);
  }, []);

  const handleSavePortfolio = useCallback(
    (amount: number) => {
      if (modalCoin) {
        setHolding(modalCoin.id, amount);
      }
    },
    [modalCoin, setHolding]
  );

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 lg:px-10">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#f0f2f1] md:text-4xl">
            Dashboard
          </h1>
          <p className="text-sm text-[#8b9196]">
            Real-time prices, charts, and your personal watchlist.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start">
          <div className="flex items-center gap-2 rounded-full border border-[#00c9a730] bg-[#00c9a710] px-3 py-2 text-xs text-[#00c9a7]">
            <div className="h-2 w-2 rounded-full bg-[#00c9a7] animate-pulse" />
            Live · {Math.round(prefs.refreshMs / 1000)}s refresh
          </div>
        </div>
      </header>

      <SummaryCards stats={stats} isLoading={statsLoading} />

      {/* Tab Switcher */}
      <div className="mt-6 flex gap-1 rounded-xl border border-[#1e2124] bg-[#0d0f10] p-1 w-fit">
        <button
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === "dashboard"
              ? "bg-[#141618] text-[#00c9a7]"
              : "text-[#8b9196] hover:text-[#f0f2f1]"
            }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <LayoutDashboard className="h-4 w-4" />
          Market
        </button>
        <button
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === "portfolio"
              ? "bg-[#141618] text-[#00c9a7]"
              : "text-[#8b9196] hover:text-[#f0f2f1]"
            }`}
          onClick={() => setActiveTab("portfolio")}
        >
          <Briefcase className="h-4 w-4" />
          Portfolio
          {holdings.length > 0 && (
            <span className="rounded-full bg-[#00c9a720] px-1.5 py-0.5 text-[10px] text-[#00c9a7]">
              {holdings.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === "dashboard" && (
        <>
          <div className="my-4">
            <WatchlistBar />
          </div>

          <section className="mt-6 space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-[#1e2124] bg-[#141618] p-4 md:flex-row md:items-center md:justify-between">
              <SearchBar
                value={search}
                onChange={setSearch}
                className="md:max-w-md"
              />
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <LastUpdatedCounter intervalMs={prefs.refreshMs} />
                <button
                  className="flex items-center gap-2 rounded-lg border border-[#1e2124] px-3 py-2 text-[#8b9196] transition hover:border-[#00c9a7] hover:text-[#00c9a7]"
                  onClick={() => refetch()}
                >
                  <RefreshCcw className="h-4 w-4" />
                  {isFetching ? "Refreshing..." : "Refresh"}
                </button>
              </div>
            </div>

            {error ? (
              <ErrorState onRetry={() => refetch()} />
            ) : (
              <MarketTable
                coins={filtered}
                sortKey={prefs.sortKey}
                onSort={handleSort}
                isLoading={isLoading}
                onAddPortfolio={handleAddPortfolio}
              />
            )}

            <div className="flex items-center justify-between">
              <Pagination
                page={page}
                onPageChange={setPage}
                disabled={isFetching}
              />
              <p className="text-xs text-[#8b9196]">
                Showing {filtered.length} of {DEFAULT_PER_PAGE} coins
              </p>
            </div>
          </section>
        </>
      )}

      {activeTab === "portfolio" && (
        <div className="mt-6">
          <PortfolioTab holdings={holdings} onRemove={removeHolding} />
        </div>
      )}

      {/* Portfolio Modal */}
      {modalCoin && (
        <PortfolioModal
          coin={modalCoin}
          currentAmount={getAmount(modalCoin.id)}
          onSave={handleSavePortfolio}
          onClose={() => setModalCoin(null)}
        />
      )}
    </main>
  );
}
