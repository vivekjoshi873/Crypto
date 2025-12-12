'use client';

import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";
import { SortKey } from "@/lib/types";
import { DEFAULT_REFETCH_MS } from "@/lib/constants";

type Preferences = {
  sortKey: SortKey;
  refreshMs: number;
  direction: "asc" | "desc";
};

const STORAGE_KEY = "crypto-preferences";

export function usePreferences() {
  const [prefs, setPrefs] = useState<Preferences>({
    sortKey: "market_cap",
    refreshMs: DEFAULT_REFETCH_MS,
    direction: "desc",
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = readStorage(STORAGE_KEY, {
      sortKey: "market_cap",
      refreshMs: DEFAULT_REFETCH_MS,
      direction: "desc",
    });
    setPrefs(stored);
  }, []);

  useEffect(() => {
    if (isClient) {
      writeStorage(STORAGE_KEY, prefs);
    }
  }, [prefs, isClient]);

  return { prefs, setPrefs };
}

