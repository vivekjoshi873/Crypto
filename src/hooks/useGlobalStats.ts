'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchGlobalStats } from "@/lib/api";

export function useGlobalStats() {
  return useQuery({
    queryKey: ["global-stats"],
    queryFn: fetchGlobalStats,
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}

