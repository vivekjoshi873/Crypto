"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  animate,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ━━━━━━━━ DESIGN TOKENS ━━━━ */
const C = {
  bg: "#0d0f10",
  card: "#141618",
  border: "#1e2124",
  teal: "#00c9a7",
  tealGlow: "rgba(0,201,167,0.15)",
  tealDim: "rgba(0,201,167,0.08)",
  up: "#00d084",
  down: "#ff4d6d",
  text: "#f0f2f1",
  muted: "#8b9196",
};

const ease = [0.22, 1, 0.36, 1] as const;

/* ━━━━ TICKER DATA ━━━━ */
const TICKERS = [
  { s: "BTC", p: "$67,420", c: "+2.4%", up: true },
  { s: "ETH", p: "$3,512", c: "+1.8%", up: true },
  { s: "SOL", p: "$172", c: "-0.9%", up: false },
  { s: "BNB", p: "$584", c: "+0.6%", up: true },
  { s: "XRP", p: "$0.62", c: "-1.2%", up: false },
  { s: "ADA", p: "$0.48", c: "+3.1%", up: true },
  { s: "AVAX", p: "$38", c: "+4.2%", up: true },
  { s: "DOGE", p: "$0.16", c: "-2.3%", up: false },
];

/* ━━━━ ANIMATED COUNTER ━━━━ */
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (isInView) {
      animate(motionVal, target, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, motionVal, target]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
    return unsub;
  }, [spring, suffix]);

  return <span ref={ref}>0</span>;
}

/* ━━━━ ICON COMPONENTS ━━━━ */
function PulsingDot() {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "rgba(0,201,167,0.1)",
        border: "1px solid rgba(0,201,167,0.2)",
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: C.teal,
          animation: "pulse-dot 2s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,201,167,0.5); transform: scale(1); }
          50% { box-shadow: 0 0 0 6px rgba(0,201,167,0); transform: scale(1.2); }
        }
      `}</style>
    </span>
  );
}

function BarChartIcon() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "rgba(0,201,167,0.1)",
        border: "1px solid rgba(0,201,167,0.2)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={C.teal}
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="3" y="14" width="4" height="7" rx="1" />
        <rect x="10" y="8" width="4" height="13" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    </span>
  );
}

function LightningIcon() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "rgba(0,201,167,0.1)",
        border: "1px solid rgba(0,201,167,0.2)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={C.teal}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
      </svg>
    </span>
  );
}

/* ━━━━ MAIN LANDING PAGE ━━━━ */
export default function LandingPage() {
  const line1Words = ["Crypto.", "Live."];
  const line2Words = ["No", "fluff."];

  const previewRows = [
    {
      name: "Bitcoin",
      sym: "BTC",
      price: "$67,420",
      change: "+2.4%",
      up: true,
    },
    {
      name: "Ethereum",
      sym: "ETH",
      price: "$3,512",
      change: "+1.8%",
      up: true,
    },
    {
      name: "Solana",
      sym: "SOL",
      price: "$172",
      change: "-0.9%",
      up: false,
    },
    { name: "BNB", sym: "BNB", price: "$584", change: "+0.6%", up: true },
  ];

  return (
    <main style={{ background: C.bg, color: C.text, overflow: "hidden" }}>
      {/* ═══════════════════════════════════════════════
          SECTION 1 — HERO (full viewport height)
         ═══════════════════════════════════════════════ */}
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
        {/* Layer 1 — Dot grid SVG */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.35,
          }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="#00c9a7" opacity="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Layer 2 — Radial gradient fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 20%, #0d0f10 80%)",
          }}
        />

        {/* Layer 3 — Floating teal orbs */}
        {[
          { size: 600, top: "5%", left: "5%", dur: 8, pos: "top-left" },
          { size: 400, top: "10%", right: "5%", dur: 10, pos: "top-right" },
          { size: 300, top: "40%", left: "45%", dur: 12, pos: "center" },
        ].map((orb, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: orb.top,
              left: (orb as any).left || "auto",
              right: (orb as any).right || "auto",
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,201,167,0.12), transparent 70%)",
              pointerEvents: "none",
            }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: orb.dur,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 800,
          }}
        >
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{
              fontSize: 12,
              letterSpacing: "0.15em",
              color: C.teal,
              textTransform: "uppercase",
              marginBottom: 24,
              fontWeight: 600,
            }}
          >
            LIVE CRYPTO DASHBOARD
          </motion.div>

          {/* Headline — staggered word by word */}
          <motion.div
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07 } },
            }}
            initial="hidden"
            animate="show"
          >
            {/* Line 1 */}
            <div
              style={{
                fontSize: "clamp(52px, 8vw, 96px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: C.text,
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
                fontSize: "clamp(52px, 8vw, 96px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: C.teal,
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

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease }}
            style={{
              fontSize: 18,
              color: C.muted,
              maxWidth: 500,
              lineHeight: 1.8,
              margin: "28px auto 0",
            }}
          >
            Built to understand React Query polling, Next.js 15 App Router, and
            real-time financial APIs. It ended up pretty good.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease }}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              justifyContent: "center",
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 32px rgba(0,201,167,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: C.teal,
                  color: C.bg,
                  fontWeight: 600,
                  padding: "14px 28px",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 15,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Open Dashboard →
              </motion.button>
            </Link>
            <a
              href="https://github.com/vivekjoshi873/Crypto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{
                  borderColor: C.teal,
                  color: C.teal,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "transparent",
                  border: `1px solid ${C.border}`,
                  color: C.muted,
                  padding: "14px 28px",
                  borderRadius: 8,
                  fontSize: 15,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                View Source ↗
              </motion.button>
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
        
        </motion.div>
      </section>

  
      <div
        style={{
          width: "100%",
          borderTop: "1px solid rgba(0,201,167,0.15)",
          borderBottom: "1px solid rgba(0,201,167,0.15)",
          background: "rgba(0,201,167,0.03)",
          padding: "12px 0",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            width: "max-content",
          }}
        >
          {[...TICKERS, ...TICKERS].map((t, i) => (
            <span
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingRight: 32,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: C.muted,
                  fontFamily: "monospace",
                }}
              >
                {t.s}
              </span>
              <span
                style={{ fontSize: 13, color: C.text, fontWeight: 500 }}
              >
                {t.p}
              </span>
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 4,
                  background: t.up
                    ? "rgba(0,208,132,0.15)"
                    : "rgba(255,77,109,0.15)",
                  color: t.up ? C.up : C.down,
                }}
              >
                {t.c}
              </span>
              {i < [...TICKERS, ...TICKERS].length - 1 && (
                <span style={{ color: C.border, margin: "0 8px" }}>·</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gap: 24,
          }}
        >
          {[
            { num: 50, suffix: "+", label: "Cryptocurrencies" },
            { num: 15, suffix: "s", label: "Auto-refresh interval" },
            { num: 100, suffix: "%", label: "Free, no login needed" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.15 }}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "32px 24px",
                textAlign: "center",
                borderLeft: `3px solid ${C.teal}`,
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: C.teal,
                  fontFamily: "monospace",
                  lineHeight: 1,
                }}
              >
                <AnimatedCounter target={stat.num} suffix={stat.suffix} />
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: C.muted,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: 8,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

  
      <section
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          style={{ marginBottom: 40 }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: C.text,
              marginBottom: 12,
            }}
          >
            Built different.
          </h2>
          <div
            style={{
              width: 40,
              height: 3,
              background: C.teal,
              borderRadius: 2,
            }}
          />
        </motion.div>

        <div
          className="features-grid"
          style={{
            display: "grid",
            gap: 24,
          }}
        >
          {[
            {
              icon: <PulsingDot />,
              title: "Live polling",
              body: "TanStack Query refetches every 15s with exponential backoff on failures. No websockets, no complexity.",
            },
            {
              icon: <BarChartIcon />,
              title: "Real market data",
              body: "CoinGecko API. Top 50 coins, 7-day sparklines, and 1Y historical charts from a single free API.",
            },
            {
              icon: <LightningIcon />,
              title: "Zero config",
              body: "No login. No setup. Watchlist saves to localStorage and survives page refreshes.",
            },
          ].map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.15 }}
              whileHover={{
                y: -6,
                borderColor: C.teal,
                boxShadow: "0 0 40px rgba(0,201,167,0.1)",
              }}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "28px 24px",
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
              <p
                style={{
                  fontSize: 14,
                  color: C.muted,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {feat.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>


      <section
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "60px 24px 100px",
        }}
      >
        <div className="preview-grid" style={{ display: "grid", gap: 48, alignItems: "center" }}>
          {/* Left column — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
          >
            <span
              style={{
                fontSize: 11,
                color: C.teal,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 600,
              }}
            >
              LIVE PREVIEW
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                color: C.text,
                fontWeight: 700,
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
                maxWidth: 380,
                marginBottom: 28,
              }}
            >
              Sort by price, market cap, or 24h change. Star any coin to add it
              to your personal watchlist.
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 32px rgba(0,201,167,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: C.teal,
                  color: C.bg,
                  fontWeight: 600,
                  padding: "14px 28px",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 15,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Open Dashboard →
              </motion.button>
            </Link>
          </motion.div>

          {/* Right column — fake dashboard card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* Card header bar */}
            <div
              style={{
                background: C.bg,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: C.muted,
                }}
              >
                cryptu dashboard
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: C.teal,
                    display: "inline-block",
                    animation: "blink 1.5s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    color: C.teal,
                    fontWeight: 600,
                  }}
                >
                  LIVE
                </span>
              </span>
            </div>

            <style>{`
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
            `}</style>

            {/* Table */}
            <div style={{ width: "100%", padding: "0 8px" }}>
              {/* Column headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 90px",
                  fontSize: 11,
                  color: C.muted,
                  padding: "8px 12px",
                  borderBottom: `1px solid ${C.border}`,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                <span>NAME</span>
                <span style={{ textAlign: "right" }}>PRICE</span>
                <span style={{ textAlign: "right" }}>24H</span>
              </div>

              {/* Data rows */}
              <motion.div
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                  },
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
              >
                {previewRows.map((row, i) => {
                  const pctNum = parseFloat(row.change);
                  const hot = pctNum > 2;
                  return (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        show: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5, ease },
                        },
                      }}
                      className="preview-row"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 100px 90px",
                        alignItems: "center",
                        padding: "10px 12px",
                        borderBottom: `1px solid ${C.border}`,
                        transition: "background 0.2s",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            color: C.text,
                          }}
                        >
                          {row.name}
                        </span>
                        <span style={{ fontSize: 12, color: C.muted }}>
                          ({row.sym})
                        </span>
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
                            padding: "2px 8px",
                            borderRadius: 4,
                            background: row.up
                              ? "rgba(0,208,132,0.12)"
                              : "rgba(255,77,109,0.12)",
                            color: row.up ? C.up : C.down,
                          }}
                        >
                          {row.change}
                          {hot && " 🔥"}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

 
      <section
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          style={{ marginBottom: 32 }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: C.text,
              marginBottom: 12,
            }}
          >
            What&apos;s under the hood.
          </h2>
          <div
            style={{
              width: 40,
              height: 3,
              background: C.teal,
              borderRadius: 2,
            }}
          />
        </motion.div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {[
            "Next.js 15",
            "TypeScript",
            "React Query",
            "Tailwind v4",
            "Recharts",
            "Framer Motion",
            "CoinGecko API",
            "Vercel",
          ].map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease, delay: i * 0.06 }}
              whileHover={{ borderColor: C.teal, color: C.teal, y: -2 }}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 13,
                color: C.text,
                cursor: "default",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 6 — FINAL CTA
         ═══════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          padding: "120px 24px",
          textAlign: "center",
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,201,167,0.05), transparent)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          style={{ marginBottom: 16 }}
        >
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              color: C.text,
              lineHeight: 1.15,
            }}
          >
            Open source. No login. No BS.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          style={{
            fontSize: 16,
            color: C.muted,
            maxWidth: 520,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Just a developer project built to learn and shipped because it turned
          out well.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 48px rgba(0,201,167,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={{
                background: C.teal,
                color: C.bg,
                border: "none",
                borderRadius: 8,
                padding: "18px 44px",
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

      {/* ═══════════════════════════════════════════════
          FOOTER
         ═══════════════════════════════════════════════ */}
      <footer
        style={{
          borderTop: `1px solid ${C.border}`,
          padding: "24px 0",
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
          style={{ color: C.muted, textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.teal)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          View Source
        </a>
      </footer>

      {/* ═══════════════════════════════════════════════
          RESPONSIVE + UTILITY STYLES
         ═══════════════════════════════════════════════ */}
      <style>{`
        .stats-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        .features-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        .preview-grid {
          grid-template-columns: 1fr 1.15fr;
        }
        .preview-row:hover {
          background: rgba(0,201,167,0.04);
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          .preview-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
