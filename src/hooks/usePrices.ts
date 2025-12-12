"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMarketCoins, searchCoins } from "@/lib/api";
import { DEFAULT_PER_PAGE, DEFAULT_REFETCH_MS } from "@/lib/constants";
import { CoinMarket, SortKey } from "@/lib/types";

export type UsePricesOptions = {
  page?: number;
  perPage?: number;
  sortKey?: SortKey;
  direction?: "asc" | "desc";
  search?: string;
  refetchInterval?: number;
  enabled?: boolean;
  ids?: string[];
};

const sorters: Record<SortKey, (a: CoinMarket, b: CoinMarket) => number> = {
  market_cap: (a, b) => (a.market_cap ?? 0) - (b.market_cap ?? 0),
  current_price: (a, b) => (a.current_price ?? 0) - (b.current_price ?? 0),
  price_change_percentage_24h: (a, b) =>
    (a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0),
  price_change_percentage_7d_in_currency: (a, b) =>
    (a.price_change_percentage_7d_in_currency ?? 0) -
    (b.price_change_percentage_7d_in_currency ?? 0),
  total_volume: (a, b) => (a.total_volume ?? 0) - (b.total_volume ?? 0),
};

export function usePrices({
  page = 1,
  perPage = DEFAULT_PER_PAGE,
  sortKey = "market_cap",
  direction = "desc",
  search = "",
  refetchInterval = DEFAULT_REFETCH_MS,
  enabled = true,
  ids,
}: UsePricesOptions = {}) {
  const queryKey = useMemo(
    () => ["prices", { page, perPage, sortKey, direction, search, ids }],
    [page, perPage, sortKey, direction, search, ids]
  );

  return useQuery({
    queryKey,
    enabled,
    queryFn: async () => {
      if (ids?.length) {
        return fetchMarketCoins({ page, perPage, ids });
      }

      if (search.trim()) {
        const coins = await searchCoins(search.trim());
        const slice = coins.slice(0, perPage);
        return fetchMarketCoins({
          page: 1,
          perPage: slice.length || perPage,
          ids: slice,
        });
      }

      return fetchMarketCoins({
        page,
        perPage,
        order: "market_cap_desc",
      });
    },
    refetchInterval,
    refetchOnWindowFocus: true,
    staleTime: 5_000,
    select: (data) => {
      const sorted = [...data].sort(sorters[sortKey]);
      return direction === "desc" ? sorted.reverse() : sorted;
    },
    retry: 3,
    retryDelay: (attempt) => Math.min(2000 * 2 ** attempt, 15_000),
  });
}
