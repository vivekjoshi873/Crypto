"use client";

import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  LineChart,
  Bell,
  Shield,
  Zap,
  Activity,
} from "lucide-react";
import { NumberTicker } from "../components/ui/number-ticker"
import { Boxes } from "../components/ui/background-boxes";
import { HyperText } from "../../src/components/ui/hyper-text"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
      {/* Hero Section */}
      <section className="flex min-h-[85vh] flex-col items-center justify-center text-center">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs text-sky-200">
          <Activity className="h-4 w-4" />
          <span className="uppercase tracking-wide">Live Market Data</span>
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 dark:text-white md:text-7xl">
          Track Crypto Markets
          <br />
          <HyperText className="bg-linear-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            In Real-Time
          </HyperText>
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-300 md:text-xl">
          Professional cryptocurrency dashboard with live prices, interactive
          charts, and personalized watchlists. Stay ahead of the market with
          real-time data.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row ">
          <Link href="/dashboard">
            <Button className="group relative overflow-hidden cursor-pointer flex items-center gap-3 rounded-xl bg-linear-to-r from-sky-500 to-emerald-500 px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_18px_45px_-18px_rgba(14,165,233,0.75)] hover:from-sky-400 hover:to-emerald-400 active:scale-95">
              <span className="absolute inset-0 bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute -inset-10 bg-linear-to-r from-white/40 via-white/10 to-transparent opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-50 group-hover:translate-x-8 group-hover:-translate-y-4" />
              <span className="relative flex items-center gap-2">
                Launch Dashboard
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:drop-shadow-[0_6px_14px_rgba(16,185,129,0.45)]" />
              </span>
            </Button>
          </Link>
          <Link href="#features">
            <Button className="rounded-xl cursor-pointer border border-white/10 bg-white/5 px-8 py-6 text-lg font-semibold text-gray-900 backdrop-blur transition-all hover:bg-white/10 dark:text-white " >
              Learn More
            </Button>
          </Link>
        </div>

        {/* Live Stats Preview */}
        <div className="mt-16 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          <Card className="space-y-2 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-emerald-400" />
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              <NumberTicker value={5000} />
            </p>
            <p className="text-sm text-slate-400">Cryptocurrencies</p>
          </Card>
          <Card className="space-y-2 text-center">
            <Activity className="mx-auto h-8 w-8 text-sky-400" />
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              <NumberTicker value={15} />
            </p>
            <p className="text-sm text-slate-400">Auto Refresh</p>
          </Card>
          <Card className="space-y-2 text-center">
            <Zap className="mx-auto h-8 w-8 text-amber-400" />
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              Real-Time
            </p>
            <p className="text-sm text-slate-400">Market Data</p>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-sky-300">
            Features
          </p>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Everything You Need
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Powerful features designed for crypto traders and enthusiasts
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          <Card className="space-y-4 p-6 transition-all hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">
              <LineChart className="h-6 w-6 text-sky-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Interactive Charts
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              View detailed price charts with multiple timeframes. Zoom, pan,
              and analyze market trends with precision.
            </p>
          </Card>

          <Card className="space-y-4 p-6 transition-all hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Live Price Updates
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Real-time price tracking with automatic 15-second refresh
              intervals. Never miss a market movement.
            </p>
          </Card>

          <Card className="space-y-4 p-6 transition-all hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
              <Bell className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Personal Watchlist
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Create and manage your custom watchlist. Track your favorite
              cryptocurrencies in one place.
            </p>
          </Card>

          <Card className="space-y-4 p-6 transition-all hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
              <Shield className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Reliable Data
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Powered by CoinGecko API, providing accurate and comprehensive
              market data you can trust.
            </p>
          </Card>

          <Card className="space-y-4 p-6 transition-all hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
              <Zap className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Lightning Fast
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Built with Next.js 15 for optimal performance. Experience
              blazing-fast page loads and smooth interactions.
            </p>
          </Card>

          <Card className="space-y-4 p-6 transition-all hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10">
              <Activity className="h-6 w-6 text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Market Overview
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Get a comprehensive view of the entire crypto market with global
              statistics and trends at a glance.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative rounded-2xl py-20">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Boxes />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center md:p-16">
          <p className="mb-8 text-xl text-slate-200 dark:text-slate-100 max-w-2xl">
            Join thousands of traders using our platform to track and analyze
            crypto markets
          </p>
          <Link href="/dashboard">
            <Button className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-emerald-500 px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/40 cursor-pointer">
              Get Started Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-sm text-slate-500">
          Data powered by CoinGecko API • Built with Next.js 15
        </p>
      </footer>
    </main>
  );
}
