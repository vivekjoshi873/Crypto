'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchTickers } from "@/lib/api";
import { Ticker } from "@/lib/types";

export function useTickers(id: string) {
  return useQuery<Ticker[]>({
    queryKey: ["tickers", id],
    queryFn: () => fetchTickers(id),
    enabled: Boolean(id),
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}

