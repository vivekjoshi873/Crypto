import { DEFAULT_PER_PAGE } from "@/lib/constants";
import { CoinMarket, GlobalStats, HistoryPoint, Ticker } from "@/lib/types";

// Headers: { 'Accept':'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? '' }
// 10 second timeout using AbortController
// Retry once on 429 or network failure (wait 2s then retry)
// try/catch returning a meaningful error object instead of throwing

const API_BASE = "/api";

type ApiResult<T> = {
  data: T | null;
  error: string | null;
};

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function customFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResult<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  const headers = {
    ...options.headers,
    Accept: "application/json",
    "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? "",
  };

  const executeFetch = async (): Promise<Response> => {
    return fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });
  };

  try {
    let res: Response;
    try {
      res = await executeFetch();
    } catch (err: any) {
      // Network failure or timeout retry once
      console.warn("Retrying due to network failure/timeout...");
      await wait(2000);
      res = await executeFetch();
    }

    // Retry once on 429
    if (res.status === 429) {
      console.warn("Retrying due to 429...");
      await wait(2000);
      res = await executeFetch();
    }

    clearTimeout(timeoutId);

    if (!res.ok) {
      return {
        data: null,
        error: `API error: ${res.status} ${res.statusText}`,
      };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (error: any) {
    clearTimeout(timeoutId);
    return {
      data: null,
      error:
        error.name === "AbortError"
          ? "Request timed out after 10s"
          : error.message,
    };
  }
}

const toHistory = (raw: Array<[number, number]>): HistoryPoint[] =>
  raw.map(([time, price]) => ({ time, price }));

// Rebuilding functions following the new pattern while attempting to maintain return types where possible
// Note: Returning ApiResult instead of throwing is a behavior change requested by the user.

export async function fetchMarketCoins({
  page = 1,
  perPage = DEFAULT_PER_PAGE,
  order = "market_cap_desc",
  ids,
}: {
  page?: number;
  perPage?: number;
  order?: string;
  ids?: string[];
}): Promise<CoinMarket[] | any> {
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

  const { data, error } = await customFetch<CoinMarket[]>(
    `${API_BASE}/coins?${params.toString()}`,
    { next: { revalidate: 0 } },
  );

  return error ? { error } : (data ?? []);
}

export async function searchCoins(query: string): Promise<string[] | any> {
  if (!query) return [];

  const params = new URLSearchParams({ query });
  const { data, error } = await customFetch<any>(
    `${API_BASE}/search?${params.toString()}`,
    { next: { revalidate: 0 } },
  );

  if (error) return { error };
  return (data?.coins ?? []).map((c: { id: string }) => c.id);
}

export async function fetchGlobalStats(): Promise<GlobalStats | any> {
  const { data, error } = await customFetch<any>(`${API_BASE}/global`, {
    next: { revalidate: 60 },
  });

  if (error) return { error };
  if (!data?.data) return { error: "Invalid data format from global stats" };

  return {
    total_market_cap: data.data.total_market_cap.usd,
    market_cap_change_percentage_24h:
      data.data.market_cap_change_percentage_24h_usd,
    total_volume_24h: data.data.total_volume.usd,
  };
}

export async function fetchCoinHistory(
  id: string,
  days: string,
): Promise<HistoryPoint[] | any> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    days,
    precision: "2",
  });
  const { data, error } = await customFetch<any>(
    `${API_BASE}/coins/${id}/market_chart?${params.toString()}`,
    { cache: "no-store" },
  );

  if (error) return { error };
  return toHistory(data?.prices ?? []);
}

export async function fetchCoinDetails(id: string): Promise<CoinMarket | any> {
  const params = new URLSearchParams({
    localization: "false",
    tickers: "false",
    market_data: "true",
    community_data: "false",
    developer_data: "false",
    sparkline: "true",
  });
  const { data, error } = await customFetch<any>(
    `${API_BASE}/coins/${id}?${params.toString()}`,
    { cache: "no-store" },
  );

  if (error) return { error };
  if (!data) return { error: "No data returned for coin details" };

  return {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    image: data.image?.large ?? data.image?.small ?? "",
    market_cap_rank: data.market_cap_rank,
    current_price: data.market_data?.current_price?.usd ?? 0,
    market_cap: data.market_data?.market_cap?.usd ?? 0,
    total_volume: data.market_data?.total_volume?.usd ?? 0,
    price_change_percentage_24h:
      data.market_data?.price_change_percentage_24h ?? 0,
    price_change_percentage_7d_in_currency:
      data.market_data?.price_change_percentage_7d ?? 0,
    price_change_percentage_30d_in_currency:
      data.market_data?.price_change_percentage_30d ?? 0,
    circulating_supply: data.market_data?.circulating_supply ?? 0,
    sparkline_in_7d: {
      price:
        data.market_data?.sparkline_7d?.price ??
        data.market_data?.sparkline_in_7d?.price ??
        [],
    },
  };
}

export async function fetchTickers(id: string): Promise<Ticker[] | any> {
  const params = new URLSearchParams({
    include_exchange_logo: "false",
    depth: "false",
  });
  const { data, error } = await customFetch<any>(
    `${API_BASE}/coins/${id}/tickers?${params.toString()}`,
    { cache: "no-store" },
  );

  if (error) return { error };

  type RawTicker = {
    market?: { name?: string };
    last: number;
    converted_last?: { usd?: number };
    converted_volume?: { usd?: number };
    volume?: number;
    trade_url?: string | null;
    timestamp?: string;
  };

  return (
    (data?.tickers as RawTicker[] | undefined)?.slice(0, 12).map((t) => ({
      market: t.market?.name ?? "—",
      last: t.last,
      converted_last: t.converted_last?.usd,
      volume: t.converted_volume?.usd ?? t.volume ?? 0,
      trade_url: t.trade_url,
      timestamp: t.timestamp,
    })) ?? []
  );
}
