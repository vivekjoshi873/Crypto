import { DEFAULT_PER_PAGE } from "@/lib/constants";
import { CoinMarket, GlobalStats, HistoryPoint, Ticker } from "@/lib/types";

const API_BASE = "/api";

export type PricesRequest = {
  page?: number;
  perPage?: number;
  order?: string;
  ids?: string[];
};

const toHistory = (raw: Array<[number, number]>): HistoryPoint[] =>
  raw.map(([time, price]) => ({ time, price }));

export async function fetchMarketCoins({
  page = 1,
  perPage = DEFAULT_PER_PAGE,
  order = "market_cap_desc",
  ids,
}: PricesRequest): Promise<CoinMarket[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    page: page.toString(),
    per_page: perPage.toString(),
    order,
    sparkline: "true",
    price_change_percentage: "1h,24h,7d,30d",
  });

  if (ids?.length) {
    params.set("ids", ids.join(","));
  }

  const res = await fetch(`${API_BASE}/coins?${params.toString()}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to load markets");
  }

  return res.json();
}

export async function searchCoins(query: string): Promise<string[]> {
  if (!query) return [];

  const params = new URLSearchParams({ query });
  const res = await fetch(`${API_BASE}/search?${params.toString()}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to search coins");
  }

  const json = await res.json();
  return (json?.coins ?? []).map((c: { id: string }) => c.id);
}

export async function fetchGlobalStats(): Promise<GlobalStats> {
  const res = await fetch(`${API_BASE}/global`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to load global stats");
  }
  const json = await res.json();
  return {
    total_market_cap: json.data.total_market_cap.usd,
    market_cap_change_percentage_24h:
      json.data.market_cap_change_percentage_24h_usd,
    total_volume_24h: json.data.total_volume.usd,
  };
}

export async function fetchCoinHistory(
  id: string,
  days: string,
): Promise<HistoryPoint[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    days,
    precision: "2",
  });
  const res = await fetch(
    `${API_BASE}/coins/${id}/market_chart?${params.toString()}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to load history");
  }
  const json = await res.json();
  return toHistory(json.prices ?? []);
}

export async function fetchCoinDetails(id: string): Promise<CoinMarket> {
  const params = new URLSearchParams({
    localization: "false",
    tickers: "false",
    market_data: "true",
    community_data: "false",
    developer_data: "false",
    sparkline: "true",
  });
  const res = await fetch(
    `${API_BASE}/coins/${id}?${params.toString()}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to load coin");
  }
  const json = await res.json();
  return {
    id: json.id,
    symbol: json.symbol,
    name: json.name,
    image: json.image?.large ?? json.image?.small ?? "",
    market_cap_rank: json.market_cap_rank,
    current_price: json.market_data?.current_price?.usd ?? 0,
    market_cap: json.market_data?.market_cap?.usd ?? 0,
    total_volume: json.market_data?.total_volume?.usd ?? 0,
    price_change_percentage_24h:
      json.market_data?.price_change_percentage_24h ?? 0,
    price_change_percentage_7d_in_currency:
      json.market_data?.price_change_percentage_7d ?? 0,
    price_change_percentage_30d_in_currency:
      json.market_data?.price_change_percentage_30d ?? 0,
    circulating_supply: json.market_data?.circulating_supply ?? 0,
    sparkline_in_7d: {
      price:
        json.market_data?.sparkline_7d?.price ??
        json.market_data?.sparkline_in_7d?.price ??
        [],
    },
  };
}

export async function fetchTickers(id: string): Promise<Ticker[]> {
  const params = new URLSearchParams({
    include_exchange_logo: "false",
    depth: "false",
  });
  const res = await fetch(
    `${API_BASE}/coins/${id}/tickers?${params.toString()}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to load tickers");
  }

  const json = await res.json();
  type RawTicker = {
    market?: { name?: string };
    last: number;
    converted_last?: { usd?: number };
    converted_volume?: { usd?: number };
    volume?: number;
    trade_url?: string | null;
    timestamp?: string;
  };

  return (json?.tickers as RawTicker[] | undefined)?.slice(0, 12).map((t) => ({
    market: t.market?.name ?? "—",
    last: t.last,
    converted_last: t.converted_last?.usd,
    volume: t.converted_volume?.usd ?? t.volume ?? 0,
    trade_url: t.trade_url,
    timestamp: t.timestamp,
  })) ?? [];
}

