'use client';

import { useCallback, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";

const STORAGE_KEY = "crypto-watchlist";

export function useWatchlist() {
  const [items, setItems] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEY, []),
  );

  const toggle = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      writeStorage(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const isWatched = useCallback(
    (id: string) => items.includes(id),
    [items],
  );

  return { items, toggle, isWatched };
}

