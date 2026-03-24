"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from "motion/react";


const C = {
  bg: "#0d0f10",
  card: "#141618",
  border: "#1e2124",
  accent: "#00c9a7",
  glow: "rgba(0,201,167,0.15)",
  up: "#00d084",
  down: "#ff4d6d",
  text: "#f0f2f1",
  muted: "#8b9196",
};


const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};


const tickerCoins = [
  { symbol: "BTC", price: "67,234.12", pct: "+2.41", up: true },
  { symbol: "ETH", price: "3,521.87", pct: "+1.67", up: true },
  { symbol: "SOL", price: "172.43", pct: "+5.12", up: true },
  { symbol: "BNB", price: "612.90", pct: "-0.34", up: false },
  { symbol: "XRP", price: "0.6341", pct: "+0.82", up: true },
  { symbol: "ADA", price: "0.4812", pct: "-1.23", up: false },
  { symbol: "AVAX", price: "38.91", pct: "+3.57", up: true },
  { symbol: "DOGE", price: "0.1634", pct: "+4.21", up: true },
];


function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (isInView) {
      animate(motionVal, target, { duration: 1.8, ease: "easeOut" });
    }
  }, [isInView, motionVal, target]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = prefix + Math.round(v) + suffix;
    });
    return unsub;
  }, [spring, suffix, prefix]);

  return <span ref={ref}>0</span>;
}

function PulsingDot() {
  return (
    <span style={{ position: "relative", display: "inline-block", width: 24, height: 24 }}>
      <span
        style={{
          position: "absolute",
          top: 6,
          left: 6,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: C.accent,
          animation: "pulse-dot 2s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,201,167,0.5); transform: scale(1); }
          50% { box-shadow: 0 0 0 8px rgba(0,201,167,0); transform: scale(1.15); }
        }
      `}</style>
    </span>
  );
}

function BarChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="6" width="4" height="15" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={C.accent} stroke="none">
      <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
    </svg>
  );
}


export default function LandingPage() {
  /* headline words split */
  const line1Words = ["Crypto.", "Live."];
  const line2Words = ["No", "fluff."];

  return (
    <main style={{ background: C.bg, color: C.text, overflow: "hidden" }}>
      {/* ════════════════ HERO ════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {/* dot-grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "radial-gradient(circle, #f0f2f1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            zIndex: 0,
          }}
        />

        {/* radial fade overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 30%, #0d0f10 75%)",
            zIndex: 1,
          }}
        />

        {/* floating orbs */}
        {[
          { top: "12%", left: "15%", size: 420 },
          { top: "55%", left: "70%", size: 360 },
          { top: "35%", left: "45%", size: 500 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: orb.top,
              left: orb.left,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.glow}, transparent 70%)`,
              filter: "blur(80px)",
              zIndex: 1,
              pointerEvents: "none",
            }}
            animate={{ y: [0, -24, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 7 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* hero content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 800 }}>
          {/* headline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={{ marginBottom: 8 }}
          >
            {/* Line 1 */}
            <div
              style={{
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              {line1Words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease },
                    },
                  }}
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            {/* Line 2 */}
            <div
              style={{
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: C.accent,
              }}
            >
              {line2Words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease },
                    },
                  }}
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease }}
            style={{
              maxWidth: 520,
              margin: "24px auto 0",
              color: C.muted,
              fontSize: 18,
              lineHeight: 1.7,
            }}
          >
            Built to understand React Query polling, Next.js 15 App Router, and
            real-time financial APIs. Top 50 coins. Live every 15 seconds.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } },
            }}
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            <motion.div variants={staggerItem}>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 24px rgba(0,201,167,0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: C.accent,
                    color: C.bg,
                    border: "none",
                    borderRadius: 8,
                    padding: "14px 28px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Open Dashboard →
                </motion.button>
              </Link>
            </motion.div>

            <motion.div variants={staggerItem}>
              <a
                href="https://github.com/vivekjoshi873/Crypto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    borderColor: C.accent,
                    boxShadow: `0 0 20px ${C.glow}`,
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "transparent",
                    color: C.accent,
                    border: `1px solid ${C.accent}`,
                    borderRadius: 8,
                    padding: "14px 28px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  View Source ↗
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ──── Ticker strip ──── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            borderTop: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
            background: "rgba(20,22,24,0.7)",
            backdropFilter: "blur(8px)",
            overflow: "hidden",
            padding: "14px 0",
          }}
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content" }}
          >
            {[...tickerCoins, ...tickerCoins].map((c, i) => (
              <span key={i} style={{ fontSize: 14, letterSpacing: "0.02em" }}>
                <span style={{ color: C.text, fontWeight: 600 }}>{c.symbol}</span>
                <span style={{ color: C.muted, margin: "0 8px" }}>|</span>
                <span style={{ color: C.muted }}>${c.price}</span>
                <span style={{ color: C.muted, margin: "0 8px" }}>|</span>
                <span style={{ color: c.up ? C.up : C.down, fontWeight: 600 }}>
                  {c.pct}%
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ STATS BAR ════════════════ */}
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}
        >
          {[
            { num: 50, suffix: "+", label: "Cryptocurrencies tracked" },
            { num: 15, suffix: "s", label: "Auto-refresh interval" },
            { num: 100, suffix: "%", label: "Free — no login needed" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              style={{
                borderLeft: `3px solid ${C.accent}`,
                paddingLeft: 24,
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: C.accent,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                <AnimatedCounter target={stat.num} suffix={stat.suffix} />
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: C.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════ FEATURES ════════════════ */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px 80px" }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {[
            {
              icon: <PulsingDot />,
              title: "React Query. 15s. Exponential backoff.",
              body: "No websockets. TanStack Query refetches on interval with smart caching so the UI never flickers.",
            },
            {
              icon: <BarChartIcon />,
              title: "CoinGecko API. Sparklines. 1Y history.",
              body: "Top 50 coins, 7-day sparklines, and up to 1 year of historical chart data — all from a single free API.",
            },
            {
              icon: <LightningIcon />,
              title: "No login. No setup. Just works.",
              body: "Watchlist persists to localStorage. Open it and it\u2019s already working. Nothing to configure.",
            },
          ].map((feat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{
                y: -4,
                borderColor: C.accent,
                boxShadow: `0 0 32px rgba(0,201,167,0.08)`,
                transition: { duration: 0.2 },
              }}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 28,
                transition: "border-color 0.25s, box-shadow 0.25s",
              }}
            >
              <div style={{ marginBottom: 16 }}>{feat.icon}</div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 10,
                }}
              >
                {feat.title}
              </h3>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, margin: 0 }}>
                {feat.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════ DASHBOARD PREVIEW ════════════════ */}
      <section
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "60px 24px 100px",
        }}
      >
        <motion.div
          {...fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
            alignItems: "center",
          }}
          className="preview-grid"
        >
          {/* Left text */}
          <motion.div {...fadeUp}>
            <span
              style={{
                fontSize: 12,
                color: C.accent,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 700,
              }}
            >
              Dashboard Preview
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                color: C.text,
                margin: "12px 0 16px",
                lineHeight: 1.15,
              }}
            >
              Everything at a glance.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: C.muted,
                lineHeight: 1.7,
                maxWidth: 440,
                marginBottom: 28,
              }}
            >
              Sort by price, market cap, or 24h change. Star coins to add them to
              your watchlist instantly.
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 24px rgba(0,201,167,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: C.accent,
                  color: C.bg,
                  border: "none",
                  borderRadius: 8,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Launch Dashboard →
              </motion.button>
            </Link>
          </motion.div>

          {/* Right — fake mini dashboard */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              padding: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* LIVE badge */}
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 700,
                color: C.accent,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: C.accent,
                  display: "inline-block",
                  animation: "blink 1.4s ease-in-out infinite",
                }}
              />
              LIVE
            </div>
            <style>{`
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.2; }
              }
            `}</style>

            {/* Mini header row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 100px 90px",
                fontSize: 11,
                color: C.muted,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                paddingBottom: 12,
                marginBottom: 4,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <span>Coin</span>
              <span style={{ textAlign: "right" }}>Price</span>
              <span style={{ textAlign: "right" }}>24h</span>
            </div>

            {/* Rows */}
            <motion.div
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {[
                { coin: "BTC", name: "Bitcoin", price: "$67,234", pct: "+2.41%", up: true, hot: false },
                { coin: "ETH", name: "Ethereum", price: "$3,521", pct: "+1.67%", up: true, hot: false },
                { coin: "SOL", name: "Solana", price: "$172.43", pct: "+5.12%", up: true, hot: true },
                { coin: "BNB", name: "BNB", price: "$612.90", pct: "-0.34%", up: false, hot: false },
              ].map((row, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 100px 90px",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: C.text }}>
                      {row.coin}
                    </span>
                    <span style={{ fontSize: 12, color: C.muted }}>{row.name}</span>
                    {row.hot && <span style={{ fontSize: 13 }}>🔥</span>}
                  </div>
                  <span
                    style={{
                      textAlign: "right",
                      fontSize: 14,
                      color: C.text,
                      fontWeight: 500,
                    }}
                  >
                    {row.price}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: 6,
                        color: row.up ? C.up : C.down,
                        background: row.up
                          ? "rgba(0,208,132,0.12)"
                          : "rgba(255,77,109,0.12)",
                      }}
                    >
                      {row.pct}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* responsive helper – make preview side-by-side on md+ */}
        <style>{`
          @media (min-width: 768px) {
            .preview-grid {
              grid-template-columns: 1fr 1.15fr !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════ FINAL CTA ════════════════ */}
      <section
        style={{
          position: "relative",
          padding: "100px 24px",
          textAlign: "center",
          background: `radial-gradient(ellipse at center, rgba(0,201,167,0.05) 0%, transparent 65%), ${C.bg}`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              color: C.text,
              marginBottom: 16,
              lineHeight: 1.15,
            }}
          >
            Open source. No login. No BS.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: C.muted,
              maxWidth: 520,
              margin: "0 auto 36px",
              lineHeight: 1.7,
            }}
          >
            Just a developer project built to learn and shipped because it turned
            out well.
          </p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 36px rgba(0,201,167,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: C.accent,
                color: C.bg,
                border: "none",
                borderRadius: 8,
                padding: "18px 40px",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Open Dashboard →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer
        style={{
          borderTop: `1px solid ${C.border}`,
          padding: "28px 24px",
          textAlign: "center",
          fontSize: 13,
          color: C.muted,
        }}
      >
        Built by Vivek Joshi &nbsp;·&nbsp; Next.js 15 &nbsp;·&nbsp; CoinGecko
        API &nbsp;·&nbsp;{" "}
        <a
          href="https://github.com/vivekjoshi873/Crypto"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: C.accent, textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          View Source
        </a>
      </footer>
    </main>
  );
}
