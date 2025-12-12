"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "@/lib/api";
import { HistoryPoint } from "@/lib/types";

export function useCoinHistory(id: string, days: string) {
  return useQuery<HistoryPoint[]>({
    queryKey: ["history", id, days],
    queryFn: () => fetchCoinHistory(id, days),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}
