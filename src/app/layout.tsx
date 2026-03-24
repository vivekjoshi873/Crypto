import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cryptu — Live Crypto Dashboard",
  description:
    "Open-source crypto dashboard with live prices, charts, watchlist, and portfolio tracker. Built with Next.js 15 and CoinGecko API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-mono antialiased`}
      >
        <Providers>
          <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#1e2124]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              <div className="flex h-16 items-center">
                <Link
                  href="/"
                  className="text-2xl font-bold text-[#00c9a7] hover:text-[#00d084] transition-colors duration-300 uppercase"
                >
                  cryptu
                </Link>
              </div>
            </div>
          </header>
          <div className="pt-16">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
