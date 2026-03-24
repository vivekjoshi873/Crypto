"use client";

import Link from "next/link";
import { ArrowRight, Radio, Database, Settings } from "lucide-react";
import { HyperText } from "../../src/components/ui/hyper-text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
      {/* Hero Section */}
      <section className="flex min-h-[85vh] flex-col items-center justify-center text-center">
        <h1 className="mb-6 text-5xl font-bold leading-tight text-[#f0f2f1] md:text-7xl">
          <HyperText className="text-[#00c9a7]">
            Crypto. Live. No fluff.
          </HyperText>
        </h1>

        <p className="mb-10 max-w-2xl text-base text-[#8b9196] md:text-lg leading-relaxed">
          I built this to learn React Query&apos;s live polling, Next.js 15 App
          Router, and working with real-time financial APIs. It ended up pretty
          good.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button className="group relative overflow-hidden cursor-pointer flex items-center gap-3 rounded-xl bg-[#00c9a7] px-8 py-6 text-lg font-semibold text-[#0d0f10] shadow-lg shadow-[#00c9a730] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#00d084] hover:shadow-[0_18px_45px_-18px_rgba(0,201,167,0.6)] active:scale-95">
              <span className="relative flex items-center gap-2">
                Open Dashboard
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-[#8b9196]">
          Open source. No login. No BS.
        </p>
      </section>

      {/* Features Section — 3 cards only */}
      <section id="features" className="py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="space-y-4 p-6 border-[#1e2124] hover:border-[#00c9a740] transition-colors duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00c9a720]">
              <Radio className="h-6 w-6 text-[#00c9a7]" />
            </div>
            <h3 className="text-lg font-semibold text-[#f0f2f1]">
              Live Polling
            </h3>
            <p className="text-sm text-[#8b9196] leading-relaxed">
              React Query refetches every 15s with exponential backoff. No
              websockets needed.
            </p>
          </Card>

          <Card className="space-y-4 p-6 border-[#1e2124] hover:border-[#00c9a740] transition-colors duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00c9a720]">
              <Database className="h-6 w-6 text-[#00c9a7]" />
            </div>
            <h3 className="text-lg font-semibold text-[#f0f2f1]">Real Data</h3>
            <p className="text-sm text-[#8b9196] leading-relaxed">
              CoinGecko API. Top 50 coins, sparklines, historical charts up to 1
              year.
            </p>
          </Card>

          <Card className="space-y-4 p-6 border-[#1e2124] hover:border-[#00c9a740] transition-colors duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00c9a720]">
              <Settings className="h-6 w-6 text-[#00c9a7]" />
            </div>
            <h3 className="text-lg font-semibold text-[#f0f2f1]">
              Zero Config
            </h3>
            <p className="text-sm text-[#8b9196] leading-relaxed">
              No login. Watchlist saved to localStorage. Works instantly.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e2124] py-8 text-center">
        <p className="text-sm text-[#8b9196]">
          Built by Vivek Joshi · Next.js 15 · CoinGecko API ·{" "}
          <a
            href="https://github.com/vivekjoshi873/Crypto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00c9a7] hover:underline"
          >
            View Source
          </a>
        </p>
      </footer>
    </main>
  );
}
