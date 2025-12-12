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
  title: "Crypto Dashboard",
  description: "Live crypto market overview with charts and watchlist",
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
          <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              <div className="flex h-16 items-center">
                <Link
                  href="/"
                  className="text-2xl font-bold bg-linear-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent hover:from-sky-300 hover:to-emerald-300 transition-all duration-300 uppercase"
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
