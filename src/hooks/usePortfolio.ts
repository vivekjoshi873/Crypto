"use client";

import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";

export type PortfolioHolding = {
  coinId: string;
  amount: number;
};

const STORAGE_KEY = "crypto-portfolio";

export function usePortfolio() {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);

  // Read from localStorage after mount to avoid SSR hydration mismatch
  useEffect(() => {
    setHoldings(readStorage<PortfolioHolding[]>(STORAGE_KEY, []));
  }, []);

  const setHolding = useCallback((coinId: string, amount: number) => {
    setHoldings((prev) => {
      const exists = prev.find((h) => h.coinId === coinId);
      let next: PortfolioHolding[];
      if (amount <= 0) {
        next = prev.filter((h) => h.coinId !== coinId);
      } else if (exists) {
        next = prev.map((h) => (h.coinId === coinId ? { ...h, amount } : h));
      } else {
        next = [...prev, { coinId, amount }];
      }
      writeStorage(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const removeHolding = useCallback((coinId: string) => {
    setHoldings((prev) => {
      const next = prev.filter((h) => h.coinId !== coinId);
      writeStorage(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const getAmount = useCallback(
    (coinId: string) => {
      return holdings.find((h) => h.coinId === coinId)?.amount ?? 0;
    },
    [holdings],
  );

  return { holdings, setHolding, removeHolding, getAmount };
}
