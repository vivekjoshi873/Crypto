"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, animate } from "framer-motion";

/* ━━━━━━━━ DESIGN TOKENS ━━━━ */
const C = {
  bg: "#0d0f10",
  card: "#141618",
  border: "#1e2124",
  teal: "#00c9a7",
  tealGlow: "rgba(0,201,167,0.15)",
  up: "#00d084",
  down: "#ff4d6d",
  text: "#f0f2f1",
  muted: "#8b9196",
};

/* ━━━━━━━━ ANIMATED COUNTER ━━━━━━━━ */
function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.round(v) + suffix;
        },
      });
    }
  }, [isInView, to, suffix]);

  return (
    <span
      ref={ref}
      style={{
        fontSize: "56px",
        fontWeight: 700,
        color: C.teal,
        fontFamily: "monospace",
        display: "block",
      }}
    >
      0{suffix}
    </span>
  );
}

/* ━━━━━━━━ TICKER DATA ━━━━━━━━ */
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

const PREVIEW_ROWS = [
  {
    coin: "Bitcoin",
    sym: "BTC",
    price: "$67,420",
    change: "+2.4%",
    up: true,
    fire: true,
  },
  {
    coin: "Ethereum",
    sym: "ETH",
    price: "$3,512",
    change: "+1.8%",
    up: true,
    fire: false,
  },
  {
    coin: "Solana",
    sym: "SOL",
    price: "$172",
    change: "-0.9%",
    up: false,
    fire: false,
  },
  {
    coin: "BNB",
    sym: "BNB",
    price: "$584",
    change: "+0.6%",
    up: true,
    fire: false,
  },
];

const STACK = [
  "Next.js 15",
  "TypeScript",
  "React Query",
  "Tailwind v4",
  "Recharts",
  "Framer Motion",
  "CoinGecko API",
  "Vercel",
];

/* ━━━━━━━━ MAIN COMPONENT ━━━━━━━━ */
export default function LandingPage() {
  const router = useRouter();
  const headlineWords = "Crypto. Live. No fluff.".split(" ");

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        color: C.text,
        fontFamily: "inherit",
      }}
    >
   
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* BG Layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {/* Layer 1 - Dot grid SVG */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
            <svg width="100%" height="100%">
              <defs>
                <pattern
                  id="dots"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#00c9a7" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          {/* Layer 2 - Fade overlay div */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 20%, #0d0f10 75%)",
            }}
          />

          {/* Layer 3 - Floating orbs */}
          <motion.div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              top: "-10%",
              left: "-10%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,201,167,0.12), transparent 70%)",
            }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              top: "10%",
              right: "-5%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,201,167,0.12), transparent 70%)",
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              bottom: "20%",
              left: "30%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,201,167,0.12), transparent 70%)",
            }}
            animate={{ y: [0, -15, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: "12px",
              letterSpacing: "0.15em",
              color: C.teal,
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            LIVE CRYPTO DASHBOARD
          </motion.div>

          <motion.div
            variants={{
              show: { transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            animate="show"
          >
            <div
              style={{
                fontSize: "clamp(52px, 8vw, 96px)",
                fontWeight: 700,
                color: C.text,
                display: "block",
                lineHeight: 1.1,
              }}
            >
              {["Crypto.", "Live."].map((w, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                  {w}
                </motion.span>
              ))}
            </div>
            <div
              style={{
                fontSize: "clamp(52px, 8vw, 96px)",
                fontWeight: 700,
                color: C.teal,
                display: "block",
                lineHeight: 1.1,
              }}
            >
              {["No", "fluff."].map((w, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                  {w}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              fontSize: "18px",
              color: C.muted,
              maxWidth: "520px",
              lineHeight: 1.8,
              margin: "24px auto 40px",
            }}
          >
            Built to understand React Query polling, Next.js 15 App Router, and
            real-time financial APIs. It ended up pretty good.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(0,201,167,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/dashboard")}
              style={{
                background: C.teal,
                color: C.bg,
                fontWeight: 600,
                padding: "14px 32px",
                borderRadius: 8,
                border: "none",
                fontSize: "15px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Open Dashboard →
            </motion.button>
            <motion.a
              href="https://github.com/vivekjoshi873/Crypto"
              target="_blank"
              whileHover={{ borderColor: C.teal, color: C.teal }}
              style={{
                background: "transparent",
                border: `1px solid ${C.border}`,
                color: C.muted,
                padding: "14px 32px",
                borderRadius: 8,
                fontSize: "15px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              View Source ↗
            </motion.a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: "absolute",
              bottom: "32px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2">
              <path d="M7 10l5 5 5-5" />
            </svg>
          </motion.div>
        </div>
      </section>

     
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          padding: "12px 0",
          borderTop: "1px solid rgba(0,201,167,0.15)",
          borderBottom: "1px solid rgba(0,201,167,0.15)",
          background: "rgba(0,201,167,0.03)",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: "48px", width: "max-content" }}
        >
          {[...TICKERS, ...TICKERS].map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: C.muted,
                  fontWeight: 600,
                }}
              >
                {t.s}
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "13px",
                  color: C.text,
                  fontWeight: 500,
                }}
              >
                {t.p}
              </span>
              <span
                style={{
                  fontSize: "11px",
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
              <div
                style={{
                  width: "1px",
                  height: "16px",
                  background: C.border,
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>

  
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {[
            { to: 50, suffix: "+", label: "Cryptocurrencies" },
            { to: 15, suffix: "s", label: "Auto-refresh" },
            { to: 100, suffix: "%", label: "Always free" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${C.teal}`,
                borderRadius: 12,
                padding: "32px 24px",
              }}
            >
              <AnimatedCounter to={stat.to} suffix={stat.suffix} />
              <div
                style={{
                  fontSize: "12px",
                  color: C.muted,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "8px",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

  
      <section style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: C.text,
            }}
          >
            Built different.
          </div>
          <div
            style={{
              width: "40px",
              height: "3px",
              background: C.teal,
              borderRadius: "2px",
              margin: "12px 0 40px",
            }}
          />
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            {
              title: "Live polling",
              body: "TanStack Query refetches every 15s with exponential backoff. No websockets needed.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2">
                  <circle cx="12" cy="12" r="3" fill={C.teal}>
                    <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="12" cy="12" r="8" opacity="0.2" />
                </svg>
              ),
            },
            {
              title: "Real market data",
              body: "CoinGecko API. Top 50 coins, 7-day sparklines, and 1Y charts from a single free API.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2">
                  <path d="M3 18v-4M9 18V8M15 18V12M21 18V4" />
                </svg>
              ),
            },
            {
              title: "Zero config",
              body: "No login. No setup. Watchlist saves to localStorage and survives page refreshes.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              ),
            },
          ].map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
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
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(0,201,167,0.1)",
                  border: "1px solid rgba(0,201,167,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                {feat.icon}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: "8px",
                }}
              >
                {feat.title}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: C.muted,
                  lineHeight: 1.7,
                }}
              >
                {feat.body}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

 
      <section
        className="preview-section"
        style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <div className="preview-grid">
          {/* Left Col */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: C.teal,
                textTransform: "uppercase",
                marginBottom: "16px",
                fontWeight: 600,
              }}
            >
              LIVE PREVIEW
            </div>
            <div
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                color: C.text,
                marginBottom: "16px",
              }}
            >
              Everything at a glance.
            </div>
            <div
              style={{
                fontSize: "16px",
                color: C.muted,
                lineHeight: 1.8,
                maxWidth: "380px",
                marginBottom: "32px",
              }}
            >
              Sort by price, market cap, or 24h change. Star any coin to track it
              in your personal watchlist.
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              style={{
                background: C.teal,
                color: C.bg,
                fontWeight: 600,
                padding: "14px 32px",
                borderRadius: 8,
                border: "none",
                fontSize: "15px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Open Dashboard →
            </button>
          </motion.div>

          {/* Right Col */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#0d0f10",
                padding: "10px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: C.muted,
                  fontFamily: "monospace",
                }}
              >
                cryptu
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: C.teal,
                    animation: "blink 1.5s ease infinite",
                  }}
                />
                <div
                  style={{
                    fontSize: "11px",
                    color: C.teal,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  LIVE
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 80px",
                padding: "8px 16px",
                borderBottom: `1px solid ${C.border}`,
                fontSize: "11px",
                color: C.muted,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <span>Name</span>
              <span style={{ textAlign: "right" }}>Price</span>
              <span style={{ textAlign: "right" }}>24H</span>
            </div>

            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {PREVIEW_ROWS.map((row, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 80px",
                    padding: "10px 16px",
                    borderBottom: `1px solid ${C.border}`,
                    alignItems: "center",
                    fontSize: "13px",
                  }}
                >
                  <div>
                    <span style={{ color: C.text, fontWeight: 500 }}>{row.coin}</span>
                    <span
                      style={{
                        color: C.muted,
                        fontSize: "11px",
                        marginLeft: "6px",
                      }}
                    >
                      {row.sym}
                    </span>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      color: C.text,
                      fontFamily: "monospace",
                    }}
                  >
                    {row.price}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 4,
                        fontSize: "12px",
                        background: row.up
                          ? "rgba(0,208,132,0.12)"
                          : "rgba(255,77,109,0.12)",
                        color: row.up ? C.up : C.down,
                      }}
                    >
                      {row.change}
                      {row.fire && " 🔥"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

   
      <section
        style={{
          padding: "60px 24px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: C.muted,
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          BUILT WITH
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {STACK.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ borderColor: C.teal, color: C.teal, y: -2 }}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: "13px",
                color: C.text,
                cursor: "default",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: "120px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* BG Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,201,167,0.05), transparent)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              fontWeight: 700,
              color: C.text,
              marginBottom: "16px",
            }}
          >
            Open source. No login. No BS.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontSize: "16px",
              color: C.muted,
              marginBottom: "40px",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Just a developer project, built to learn, shipped because it turned out well.
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 48px rgba(0,201,167,0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/dashboard")}
            style={{
              background: C.teal,
              color: C.bg,
              fontWeight: 700,
              padding: "18px 48px",
              borderRadius: "10px",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Open Dashboard →
          </motion.button>
        </div>
      </section>

      <footer
        style={{
          padding: "24px",
          textAlign: "center",
          borderTop: `1px solid ${C.border}`,
          fontSize: "13px",
          color: C.muted,
        }}
      >
        Built by Vivek Joshi · Next.js 15 · CoinGecko API ·{" "}
        <a
          href="https://github.com/vivekjoshi873/Crypto"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: C.teal, textDecoration: "none" }}
        >
          View Source
        </a>
      </footer>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .preview-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </div>
  );
}
