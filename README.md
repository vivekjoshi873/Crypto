## Crypto Dashboard

Live, responsive crypto dashboard built with Next.js (App Router), Tailwind v4, React Query, and Recharts. Features live polling, watchlist persistence, charting, and accessible UI.

### Quick start

```bash
npm install
npm run dev
# build
npm run build && npm run start
```

The app runs on `http://localhost:3000`.

### Environment

Create `.env.local`:

```
NEXT_PUBLIC_API_BASE=https://api.coingecko.com/api/v3
NEXT_PUBLIC_API_KEY=YOUR_KEY_OPTIONAL
```

The provided sample API key from the prompt can be pasted into `NEXT_PUBLIC_API_KEY` if needed; the app also works without a key for public CoinGecko endpoints.

### What’s included

- Dashboard: top 50 coins, search (debounced), sort, pagination, sparklines, responsive cards on mobile.
- Summary: total market cap, 24h movement, 24h volume.
- Coin details: large price, 24h/7d/30d %, market cap, supply, interactive chart with ranges (1D/7D/30D/90D/1Y), live ticker table, watchlist toggle.
- Watchlist: persisted in `localStorage`, quick chips on dashboard.
- Live updates: polling every 15s by default with manual refresh button; retry with exponential backoff on failures.
- Theming: light/dark via `next-themes`.
- Accessibility: semantic HTML, focusable controls, ARIA labels on interactive elements.

### Testing

- Unit tests: `npm test`
- Watch mode: `npm run test:watch`
- E2E smoke (Playwright): `npm run e2e` (starts `npm run dev` automatically)

### Swapping APIs

All requests go through `src/lib/api.ts`. Update `API_BASE`/`API_KEY` in `src/lib/constants.ts` or via environment variables. Endpoints used:

1) Markets (paginated): `/coins/markets?vs_currency=usd&page={page}&per_page={perPage}&sparkline=true&price_change_percentage=1h,24h,7d,30d`
2) Single history: `/coins/{id}/market_chart?vs_currency=usd&days={days}`
3) Tickers feed: `/coins/{id}/tickers`
4) Global stats: `/global`

Add a WebSocket feed by extending `usePrices` in `src/hooks/usePrices.ts` if your provider offers one.

### Notes

- Polling cadence and default sort persist in `localStorage` (`crypto-preferences`).
- Watchlist stored under `crypto-watchlist`.
- Images are allowed from CoinGecko hosts via `next.config.ts`.
