export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://api.coingecko.com/api/v3";

export const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY ?? "CG-oHsaTe5cBAV6kHiLEr7zaeif";

export const DEFAULT_REFETCH_MS = 15000;
export const DEFAULT_PER_PAGE = 25;
export const SEARCH_DEBOUNCE = 300;
export const HISTORY_RANGES = [
  { label: "1D", value: "1" },
  { label: "7D", value: "7" },
  { label: "30D", value: "30" },
  { label: "90D", value: "90" },
  { label: "1Y", value: "365" },
];
