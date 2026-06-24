import { useState } from "react";

const MARKETS = [
  {
    id: "1",
    question: "Will Argentina win their 2026 World Cup match today?",
    category: "World Cup",
    emoji: "⚽",
    yesPool: 12400,
    noPool: 8600,
    endsAt: "June 26, 2026",
    hot: true,
    image: "/market1.png", // drop your image in public/
  },
  {
    id: "2",
    question: "Will $LOFI hit $1 before the end of July 2026?",
    category: "$LOFI",
    emoji: "🎯",
    yesPool: 34200,
    noPool: 21800,
    endsAt: "July 31, 2026",
    hot: true,
    image: "/imgy2.jpg",
  },
  {
    id: "3",
    question: "Will Sui Network surpass $10B TVL by Q3 2026?",
    category: "Sui",
    emoji: "🌊",
    yesPool: 9100,
    noPool: 15300,
    endsAt: "Sept 30, 2026",
    hot: false,
    image: "/market3.png",
  },
];

const CATEGORIES = ["All", "World Cup", "$LOFI", "Sui", "Crypto", "Sports"];

function formatPool(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}

function getPct(yes: number, no: number) {
  const total = yes + no;
  return {
    yesPct: Math.round((yes / total) * 100),
    noPct: Math.round((no / total) * 100),
  };
}

interface Market {
  id: string;
  question: string;
  category: string;
  yesPool: number;
  noPool: number;
  endsAt: string;
  image: string;
}

function BetModal({ market, onClose }: { market: Market; onClose: () => void }) {
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);
  const [amount, setAmount] = useState("");
  const { yesPct, noPct } = getPct(market.yesPool, market.noPool);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 16px",
        background: "rgba(10,13,20,0.6)",
        backdropFilter: "blur(4px)",
        overflowY: "auto"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "#ffffff",
          borderRadius: "0px",
          padding: "28px",
          position: "relative",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          fontFamily: "'Elms Sans', sans-serif",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "rgba(10,13,20,0.3)",
            fontSize: "18px",
          }}
        >
          ✕
        </button>

        {/* Category */}
        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2E8FFF" }}>
          {market.category}
        </span>

        {/* Question */}
        <h3 style={{ fontFamily: "'Elms Sans', sans-serif", fontSize: "1.05rem", color: "#0a0d14", margin: "10px 0 16px", lineHeight: 1.4 }}>
          {market.question}
        </h3>

        {/* ── Market image (modal) ── */}
        <div style={{ width: "100%", borderRadius: "36px", overflow: "visible", marginBottom: "20px", aspectRatio: "8/5" }}>
          <img
            src={market.image}
            alt={market.question}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Pool bar */}
        <div style={{ width: "100%", height: "8px", borderRadius: "999px", background: "#f4f6f9", overflow: "hidden", marginBottom: "8px" }}>
          <div style={{ width: `${yesPct}%`, height: "100%", borderRadius: "999px", background: "linear-gradient(to right, #2E8FFF, #6db8ff)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 600, marginBottom: "24px" }}>
          <span style={{ color: "#2E8FFF" }}>YES {yesPct}%</span>
          <span style={{ color: "rgba(10,13,20,0.4)" }}>NO {noPct}%</span>
        </div>

        {/* Choice label */}
        <p style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", color: "rgba(10,13,20,0.4)", marginBottom: "12px" }}>
          Your Bet?
        </p>

        {/* YES / NO buttons */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <button
            onClick={() => setChoice("yes")}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "0px",
              fontFamily: "'Elms Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "2px solid #2E8FFF",
              background: choice === "yes" ? "#2E8FFF" : "transparent",
              color: choice === "yes" ? "#ffffff" : "#2E8FFF",
              boxShadow: choice === "yes" ? "0 4px 0 #1a6fd4" : "0 4px 0 #c8deff",
              transition: "all 0.15s",
            }}
          >
            YES
          </button>
          <button
            onClick={() => setChoice("no")}
            style={{
              flex: 1,
              padding: "12px",
              fontFamily: "'Elms Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "2px solid #0a0d14",
              background: choice === "no" ? "#0a0d14" : "transparent",
              color: choice === "no" ? "#ffffff" : "#0a0d14",
              boxShadow: choice === "no" ? "0 4px 0 #000000" : "0 4px 0 #d0d3d8",
              transition: "all 0.15s",
            }}
          >
            NO
          </button>
        </div>

        {/* Amount label */}
        <p style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", color: "rgba(10,13,20,0.4)", marginBottom: "8px" }}>
          Amount ($LOFI)
        </p>

        {/* Amount input */}
        <div style={{ display: "flex", alignItems: "center", background: "#f4f6f9", padding: "12px 16px", border: "2px solid rgba(10,13,20,0.06)", marginBottom: "20px" }}>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#0a0d14" }}
          />
          <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(10,13,20,0.3)" }}>$LOFI</span>
        </div>

        {/* Place bet */}
        <button
          disabled={!choice || !amount}
          style={{
            width: "100%",
            padding: "16px",
            fontFamily: "'Elms Sans', sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: choice && amount ? "pointer" : "not-allowed",
            border: "none",
            background: choice && amount ? "#2E8FFF" : "#f4f6f9",
            color: choice && amount ? "#ffffff" : "rgba(10,13,20,0.3)",
            boxShadow: choice && amount ? "0 5px 0 #1a6fd4" : "0 5px 0 #d8dce2",
            transition: "all 0.15s",
            opacity: choice && amount ? 1 : 0.6,
          }}
        >
          Place Bet →
        </button>

        <p style={{ textAlign: "center", fontSize: "0.7rem", color: "rgba(10,13,20,0.3)", marginTop: "14px" }}>
          Ends {market.endsAt} · On-chain via Sui
        </p>
      </div>
    </div>
  );
}

export default function Markets() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  const filtered = activeCategory === "All"
    ? MARKETS
    : MARKETS.filter((m) => m.category === activeCategory);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Slackey&family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'Inter', sans-serif" }}>

        {/* ── Navbar ── */}
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 5vw", borderBottom: "1px solid rgba(10,13,20,0.06)" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "0.1em", color: "#0a0d14" }}>
            LOFIBets
          </span>

          <button
            style={{
              fontFamily: "'Slackey', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: "16px",
              background: "#3d4f7c",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 5px 0 #232d47",
              letterSpacing: "0.02em",
            }}
          >
            Connect Wallet
          </button>
        </nav>

        {/* ── Page header ── */}
        <div style={{ padding: "48px 5vw 24px" }}>
          <h1 style={{ fontFamily: "'Slackey', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#0a0d14", margin: "0 0 6px" }}>
            All Markets
          </h1>
          <p style={{ fontSize: "0.85rem", color: "rgba(10,13,20,0.4)", margin: 0 }}>
            Bet with $LOFI · On-chain · Trustless
          </p>
        </div>

        {/* ── Category filter ── */}
        <div style={{ padding: "0 5vw 32px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                background: activeCategory === cat ? "#0a0d14" : "transparent",
                color: activeCategory === cat ? "#ffffff" : "#0a0d14",
                border: `1px solid ${activeCategory === cat ? "#0a0d14" : "rgba(10,13,20,0.15)"}`,
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Markets grid ── */}
        <div style={{ padding: "0 5vw 80px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {filtered.map((market) => {
            const { yesPct, noPct } = getPct(market.yesPool, market.noPool);
            return (
              <div
                key={market.id}
                onClick={() => setSelectedMarket(market)}
                style={{
                  background: "#ffffff",
                  border: "2px solid rgba(10,13,20,0.07)",
                  borderRadius: "24px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  cursor: "pointer",
                  boxShadow: "0 4px 0 rgba(10,13,20,0.06)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {/* Top row — category + small image thumbnail */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#2E8FFF" }}>
                    {market.emoji} {market.category}
                  </span>

                  {/* ── Small thumbnail image ── */}
                  <img
                    src={market.image}
                    alt={market.category}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      border: "2px solid rgba(10,13,20,0.06)",
                    }}
                  />
                </div>

                {/* Question */}
                <h3 style={{ fontFamily: "'Slackey', sans-serif", fontSize: "0.95rem", color: "#0a0d14", margin: 0, lineHeight: 1.4 }}>
                  {market.question}
                </h3>

                {/* Pool bar */}
                <div style={{ width: "100%", height: "6px", borderRadius: "999px", background: "#f4f6f9", overflow: "hidden" }}>
                  <div style={{ width: `${yesPct}%`, height: "100%", borderRadius: "999px", background: "linear-gradient(to right, #2E8FFF, #6db8ff)" }} />
                </div>

                {/* Pct labels */}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 600 }}>
                  <span style={{ color: "#2E8FFF" }}>YES {yesPct}%</span>
                  <span style={{ color: "rgba(10,13,20,0.4)" }}>NO {noPct}%</span>
                </div>

                {/* Volume + bet buttons */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(10,13,20,0.06)" }}>
                  <span style={{ fontSize: "0.75rem", color: "rgba(10,13,20,0.4)", fontWeight: 500 }}>
                    {formatPool(market.yesPool + market.noPool)} $LOFI
                  </span>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedMarket(market); }}
                      style={{
                        padding: "7px 16px",
                        borderRadius: "12px",
                        fontFamily: "'Slackey', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        background: "transparent",
                        color: "#2E8FFF",
                        border: "2px solid #2E8FFF",
                        boxShadow: "0 3px 0 #c8deff",
                      }}
                    >
                      YES
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedMarket(market); }}
                      style={{
                        padding: "7px 16px",
                        borderRadius: "12px",
                        fontFamily: "'Slackey', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        background: "transparent",
                        color: "#0a0d14",
                        border: "2px solid #0a0d14",
                        boxShadow: "0 3px 0 #d0d3d8",
                      }}
                    >
                      NO
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedMarket && (
        <BetModal market={selectedMarket} onClose={() => setSelectedMarket(null)} />
      )}
    </>
  );
}