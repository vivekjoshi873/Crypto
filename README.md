# Cryptu

A live crypto dashboard that pulls real-time market data from CoinGecko. Top 50 coins, sparklines, historical charts, watchlist, and a portfolio tracker — all stored locally, no login required.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://crypto-blond-gamma.vercel.app/)

**[Live Demo →](https://crypto-blond-gamma.vercel.app/)**

---

## Why I built this

I wanted to get hands-on with three things:

1. **React Query (TanStack Query)** — specifically live polling with `refetchInterval`, exponential backoff on failures, and stale-while-revalidate caching. I wanted to understand how it handles concurrent component mounts and deduplication.
2. **Next.js 15 App Router** — the `app/` directory, server components vs client components, API routes that proxy external APIs to keep secrets server-side, and the new `params` as Promise pattern.
3. **Working with financial APIs** — CoinGecko's free tier has rate limits. I needed to handle failures gracefully, cache aggressively, and design the UI to stay useful even when data is stale.

---

## Technical decisions

| Decision                         | Why                                                                                                |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| **TanStack Query** over SWR      | Better devtools, built-in retry with backoff, `refetchInterval` is first-class                     |
| **Next.js API routes** as proxy  | Keeps the CoinGecko API key server-side. The client never sees it.                                 |
| **Recharts** for charts          | Already supports responsive containers and composable chart primitives. No need for D3 complexity. |
| **localStorage** for persistence | Watchlist and portfolio don't need a database. No auth, no backend — keeps it zero-config.         |
| **Geist Mono** font site-wide    | Gives the dashboard a distinctive, technical feel. Numbers align better in monospace.              |
| **Tailwind CSS v4**              | Latest version with `@theme inline` for design tokens. CSS-first config.                           |

---

## What was hard

1. **Hydration mismatches with localStorage** — `useState(() => readStorage(...))` causes SSR/client mismatch because the server doesn't have `window`. Fixed by initializing with defaults and loading from storage in `useEffect`.

2. **CoinGecko rate limiting** — The free API allows ~10-30 calls/minute. With 15s polling across multiple query keys (prices, global stats, tickers), you hit limits fast. Solved with `staleTime: 10000`, deduplication, and exponential backoff (`retryDelay: attempt => Math.min(2000 * 2^attempt, 15000)`).

3. **Sparkline data inconsistency** — CoinGecko returns sparkline data under different keys (`sparkline_7d.price` vs `sparkline_in_7d.price`) depending on the endpoint. Had to normalize this in the API client.

---

## What I'd change

1. **Add WebSocket support** — Polling every 15s is fine, but for a real trading dashboard you'd want sub-second updates. CoinGecko doesn't offer WebSockets on the free tier, but Binance does.

2. **Server-side caching layer** — Right now each user's browser makes its own API calls through the proxy. With Redis or even in-memory caching on the server, I could serve cached data to all users and dramatically reduce API calls.

---

## Quick start

```bash
# Clone
git clone https://github.com/vivekjoshi873/Crypto.git
cd Crypto

# Install
npm install

# Optional: add your own CoinGecko key for higher rate limits
# Create .env.local with:
#   COINGECKO_API_BASE=https://api.coingecko.com/api/v3
#   COINGECKO_API_KEY=your_key_here

# Run
npm run dev
# → http://localhost:3000
```

## Testing

```bash
npm test          # Unit tests (Jest + React Testing Library)
npm run e2e       # E2E tests (Playwright)
```

---

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- TanStack Query v5
- Recharts
- Motion (Framer Motion)
- Lucide icons
- Geist Mono font
- CoinGecko API

---

Built by [Vivek Joshi](https://github.com/vivekjoshi873) · [View Source](https://github.com/vivekjoshi873/Crypto)
