# 🚀 Cryptu - Cryptocurrency Dashboard

> Professional cryptocurrency dashboard with live prices, interactive charts, and personalized watchlists. Track crypto markets in real-time with modern UI and powerful features.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://crypto-blond-gamma.vercel.app/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)

## 🌐 Live Demo

**[https://crypto-blond-gamma.vercel.app/](https://crypto-blond-gamma.vercel.app/)**

## ✨ Features

### 🎨 Modern Landing Page
- **Animated Hero Section** with gradient text effects using HyperText component
- **Live Statistics** with NumberTicker animations (5000+ cryptocurrencies, 15s auto-refresh)
- **Interactive Boxes Background** with hover effects for engaging CTA section
- **Responsive Design** optimized for all screen sizes

### 📊 Real-Time Market Data
- **Live Price Updates** - Automatic 15-second refresh intervals
- **Top 50 Cryptocurrencies** - Sortable market overview
- **Sparkline Charts** - Visual 7-day price trends at a glance
- **Global Market Stats** - Total market cap, 24h volume, and dominance

### 📈 Interactive Charts
- **Multi-timeframe Analysis** - 1D, 7D, 30D, 90D, 1Y views
- **Recharts Integration** - Smooth, responsive price charts
- **Zoom & Pan** - Analyze market trends with precision
- **Historical Data** - Powered by CoinGecko API

### ⭐ Personal Watchlist
- **Quick Access** - Track your favorite cryptocurrencies
- **Persistent Storage** - Saved in localStorage
- **Easy Management** - Add/remove coins with one click
- **Dashboard Chips** - Quick filters for watchlist view

### 🎯 Coin Details Page
- **Comprehensive Stats** - Price, market cap, volume, supply
- **Price Changes** - 24h, 7d, 30d percentage movements
- **Live Ticker Feed** - Real-time exchange data
- **Watchlist Toggle** - Save coins for quick access

### 🌙 Theme Support
- **Dark Mode** - Eye-friendly dark theme (default)
- **Light Mode** - Clean, bright interface
- **Next-themes Integration** - Smooth theme transitions
- **System Preference** - Auto-detect user preference

### 🔍 Smart Search
- **Debounced Search** - Fast, efficient coin lookup
- **Real-time Results** - Instant filtering as you type
- **Responsive UI** - Works seamlessly on mobile

### ♿ Accessibility
- **Semantic HTML** - Proper structure and landmarks
- **ARIA Labels** - Screen reader friendly
- **Keyboard Navigation** - Full keyboard support
- **Focus Management** - Clear visual focus indicators

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (latest alpha)
- **State Management:** [TanStack Query (React Query)](https://tanstack.com/query)
- **Charts:** [Recharts](https://recharts.org/)
- **Animations:** [Motion (Framer Motion)](https://motion.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)
- **API:** [CoinGecko API](https://www.coingecko.com/en/api)
- **Font:** [Geist Mono](https://vercel.com/font) (site-wide)
- **Testing:** Jest + React Testing Library + Playwright
- **Deployment:** [Vercel](https://vercel.com/)

## 🎨 UI Components

### Magic UI Components
- **HyperText** - Animated scramble text effect
- **NumberTicker** - Smooth counting animations
- **Background Boxes** - Interactive 3D grid background
- **Card Hover Effect** - Elegant hover animations

### Custom Components
- Responsive Market Table with sorting
- Pagination controls
- Search Bar with debouncing
- Sparkline charts
- Price charts with range toggles
- Summary cards with live data
- Watchlist bar with quick filters
- Theme toggle button
- Loading skeletons
- Empty & Error states

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm/yarn/pnpm/bun

### Installation

```bash
# Clone the repository
git clone https://github.com/vivekjoshi873/Crypto.git
cd Crypto

# Install dependencies
npm install
# or
bun install

# Create environment file (optional)
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` file (optional):

```bash
NEXT_PUBLIC_API_BASE=https://api.coingecko.com/api/v3
NEXT_PUBLIC_API_KEY=YOUR_KEY_OPTIONAL
```

> **Note:** The app works without an API key for public CoinGecko endpoints. Add a key only if you need higher rate limits.

### Development

```bash
# Start development server
npm run dev

# App runs on http://localhost:3000
```

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Watch mode
npm run test:watch

# E2E tests with Playwright
npm run e2e
```

## 📁 Project Structure

```
crypto/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── coins/        # Coin data endpoints
│   │   │   ├── global/       # Global stats endpoint
│   │   │   └── search/       # Search endpoint
│   │   ├── coins/[id]/       # Coin detail pages
│   │   ├── dashboard/        # Dashboard page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout with logo
│   │   ├── page.tsx          # Landing page
│   │   └── providers.tsx     # React Query provider
│   ├── components/
│   │   ├── coin/             # Coin-specific components
│   │   ├── common/           # Shared components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── layout/           # Layout components
│   │   └── ui/               # UI primitives
│   ├── hooks/                 # Custom React hooks
│   │   ├── useCoinHistory.ts
│   │   ├── useDebouncedValue.ts
│   │   ├── useGlobalStats.ts
│   │   ├── usePreferences.ts
│   │   ├── usePrices.ts
│   │   ├── useTickers.ts
│   │   └── useWatchlist.ts
│   └── lib/                   # Utilities
│       ├── api.ts            # API client
│       ├── constants.ts      # App constants
│       ├── format.ts         # Formatting helpers
│       ├── storage.ts        # localStorage helpers
│       ├── types.ts          # TypeScript types
│       └── utils.ts          # Utility functions
├── e2e/                       # E2E tests
├── public/                    # Static assets
├── components.json            # Component config
├── jest.config.ts            # Jest configuration
├── playwright.config.ts      # Playwright config
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind config
└── tsconfig.json             # TypeScript config
```

## 🔧 Configuration

### API Endpoints

All API requests go through `src/lib/api.ts`. The following CoinGecko endpoints are used:

1. **Markets** (paginated): `/coins/markets`
2. **Coin History**: `/coins/{id}/market_chart`
3. **Tickers**: `/coins/{id}/tickers`
4. **Global Stats**: `/global`
5. **Search**: `/search`

### Local Storage

- `crypto-preferences` - User preferences (polling cadence, sort order)
- `crypto-watchlist` - Saved watchlist coins

### Customization

- **Polling Interval**: Modify in `src/lib/constants.ts`
- **Theme Colors**: Update in `src/app/globals.css`
- **Font**: Change in `src/app/layout.tsx`

## 🌟 Key Features Explained

### Live Polling
- Auto-refresh every 15 seconds
- Manual refresh button
- Exponential backoff on failures
- React Query cache management

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Optimized for all devices

### Performance
- Server Components where possible
- Client components only when needed
- Image optimization with Next.js
- Code splitting and lazy loading

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Vivek Joshi**
- GitHub: [@vivekjoshi873](https://github.com/vivekjoshi873)
- Repository: [Crypto Dashboard](https://github.com/vivekjoshi873/Crypto)

## 🙏 Acknowledgments

- **CoinGecko** for providing the crypto market data API
- **Vercel** for hosting and deployment
- **Next.js Team** for the amazing framework
- **Magic UI** for beautiful animated components

---

**Built with ❤️ using Next.js 15 | Deployed on Vercel**

[Live Demo](https://crypto-blond-gamma.vercel.app/) • [Report Bug](https://github.com/vivekjoshi873/Crypto/issues) • [Request Feature](https://github.com/vivekjoshi873/Crypto/issues)
