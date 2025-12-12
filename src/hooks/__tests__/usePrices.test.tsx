import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePrices } from "@/hooks/usePrices";
import type { CoinMarket } from "@/lib/types";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchInterval: 0 } },
  });
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Wrapper;
};

describe("usePrices", () => {
  it("returns market data", async () => {
    const mock: CoinMarket[] = [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        image: "/btc.png",
        market_cap_rank: 1,
        current_price: 70000,
        market_cap: 1_000_000,
        total_volume: 50_000,
        price_change_percentage_24h: 1.2,
        price_change_percentage_7d_in_currency: 3,
        price_change_percentage_30d_in_currency: 4,
        sparkline_in_7d: { price: [1, 2, 3] },
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mock,
    } as unknown as Response);

    const { result } = renderHook(
      () => usePrices({ perPage: 1, refetchInterval: 0 }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0].id).toBe("bitcoin");
  });
});
