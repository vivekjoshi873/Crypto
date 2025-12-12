export type CoinMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
  circulating_supply?: number;
  sparkline_in_7d?: { price: number[] };
};

export type GlobalStats = {
  total_market_cap: number;
  market_cap_change_percentage_24h: number;
  total_volume_24h: number;
};

export type HistoryPoint = {
  time: number;
  price: number;
};

export type Ticker = {
  market: string;
  last: number;
  converted_last?: number;
  volume: number;
  trade_url?: string | null;
  timestamp?: string;
};

export type SortKey =
  | "market_cap"
  | "current_price"
  | "price_change_percentage_24h"
  | "price_change_percentage_7d_in_currency"
  | "total_volume";

