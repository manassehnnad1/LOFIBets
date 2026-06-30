import { useState } from "react";
import { useBets } from "../context/BetsContext";
import type { PlacedBet } from "../context/BetsContext";

interface PnLCardProps {
  bet: PlacedBet;
  yetiImage: string;
  onClose: () => void;
  onClaim: () => void;
}

function PnLCard({ bet, onClose, onClaim }: PnLCardProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 16px",
        background: "rgba(10,13,20,0.75)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "340px",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
          fontFamily: "'Inter', sans-serif",
          position: "relative",
        }}
      >
        {/* Card top — image */}
        <div
          style={{
            background: "linear-gradient(135deg, #ff8c00, #ff6b00)",
            padding: "28px 24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            minHeight: "260px",
          }}
        >
          {/* halftone texture overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
            pointerEvents: "none",
          }} />

          {/* Yeti image */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
            <img
              src="/pnl1.jpg"
              alt="Yeti"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                imageRendering: "pixelated",
              }}
            />
          </div>
        </div>

        {/* Card bottom — dark section */}
        <div style={{ background: "#0a0d14", padding: "20px 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'Elms Sans', sans-serif",
            }}>
              {bet.won ? "W" : "L"}/10
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Slackey', sans-serif",
            fontSize: "1.6rem",
            color: bet.won ? "#D6FFFA" : "#f87171",
            margin: "0 0 4px",
            lineHeight: 1.1,
          }}>
            {bet.won ? "You Won! 🎉" : "Better Luck Next Time"}
          </h2>

          <p style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.45)",
            margin: "0 0 16px",
            lineHeight: 1.5,
            fontFamily: "'Elms Sans', sans-serif",
          }}>
            {bet.question}
          </p>

          {bet.won ? (
            <button
              onClick={onClaim}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "16px",
                fontFamily: "'Slackey', sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
                background: "#D6FFFA",
                color: "#0a0d14",
                boxShadow: "0 5px 0 #f0fdfa",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Claim {bet.payout} SUI →
            </button>
          ) : (
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "16px",
                fontFamily: "'Slackey', sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.5)",
                transition: "all 0.15s",
              }}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface MyBetsProps {
  yetiImage?: string;
}

export default function MyBets({ yetiImage = "/heroimg.png" }: MyBetsProps) {
  const { bets } = useBets();
  const [selectedBet, setSelectedBet] = useState<PlacedBet | null>(null);
  const [claimed, setClaimed] = useState<string[]>([]);

  function handleClaim() {
    if (selectedBet) {
      setClaimed((prev) => [...prev, selectedBet.id]);
      setSelectedBet(null);
    }
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Slackey&family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ padding: "32px 5vw", fontFamily: "'Elms Sans', sans-serif" }}>

        {/* Section header */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{
            fontFamily: "'Elms Sans', sans-serif",
            fontSize: "clamp(1.0rem, 3vw, 1.4rem)",
            color: "#0a0d14",
            margin: "0 0 4px",
          }}>
            My Bets
          </h2>
          <p style={{ fontSize: "0.82rem", color: "rgba(10,13,20,0.4)", margin: 0 }}>
            {bets.length} active position{bets.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Empty state */}
        {bets.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <p style={{ fontSize: "0.9rem", color: "rgba(10,13,20,0.4)", fontFamily: "'Elms Sans', sans-serif" }}>
              No bets yet. Go place one! 
            </p>
          </div>
        )}

        {/* Bets list */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "640px",
          margin: "0 auto",
        }}>
          {bets.map((bet) => {
            const isClaimed = claimed.includes(bet.id);
            return (
              <div
                key={bet.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "18px 20px",
                  borderRadius: "20px",
                  background: "#ffffff",
                  border: "2px solid rgba(10,13,20,0.07)",
                  boxShadow: "0 2px 0 rgba(10,13,20,0.04)",
                  opacity: isClaimed ? 0.4 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {/* Left — question + meta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: "'Elms Sans', sans-serif",
                    fontSize: "0.88rem",
                    color: "#0a0d14",
                    margin: "0 0 6px",
                    lineHeight: 1.4,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {bet.question}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* choice badge */}
                    <span style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      background: bet.choice === "YES" ? "rgba(46,143,255,0.1)" : "rgba(10,13,20,0.06)",
                      color: bet.choice === "YES" ? "#2E8FFF" : "#0a0d14",
                    }}>
                      {bet.choice}
                    </span>
                    {/* amount */}
                    <span style={{ fontSize: "0.75rem", color: "rgba(10,13,20,0.4)", fontWeight: 500 }}>
                      {bet.amount} SUI
                    </span>
                    {/* status */}
                    <span style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      background: bet.resolved
                        ? bet.won ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)"
                        : "rgba(10,13,20,0.05)",
                      color: bet.resolved
                        ? bet.won ? "#16a34a" : "#dc2626"
                        : "rgba(10,13,20,0.35)",
                    }}>
                      {bet.resolved ? (bet.won ? "Won" : "Lost") : "Active"}
                    </span>
                  </div>
                </div>

                {/* Right — claim button (only if resolved, won, not claimed) */}
                {bet.resolved && bet.won && !isClaimed && (
                  <button
                    onClick={() => setSelectedBet(bet)}
                    style={{
                      flexShrink: 0,
                      padding: "10px 18px",
                      borderRadius: "14px",
                      fontFamily: "'Slackey', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: "none",
                      background: "#232d47",
                      color: "#ffffff",
                      boxShadow: "0 4px 0 #7b96db",
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    Claim →
                  </button>
                )}

                {isClaimed && (
                  <span style={{
                    flexShrink: 0,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "rgba(10,13,20,0.3)",
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    Claimed ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PnL Card modal */}
      {selectedBet && (
        <PnLCard
          bet={selectedBet}
          yetiImage={yetiImage}
          onClose={() => setSelectedBet(null)}
          onClaim={handleClaim}
        />
      )}
    </>
  );
}