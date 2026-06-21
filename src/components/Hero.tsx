import { useState } from "react";
import { MoveUpRight} from 'lucide-react'
import BubbleMenu from "./BubbleMenu";

const NAV_ITEMS = ["Markets", "My Bets", "Leaderboard", "About"];

interface HeroProps {
  heroImage: string;
  logoImage: string;
}

export default function Hero({ heroImage, logoImage }: HeroProps) {
  const [activeNav, setActiveNav] = useState("Markets");

  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{
          height: "100svh",
          minHeight: "600px",
          fontFamily: "'Inter', sans-serif",
          paddingTop: "40px"
        }}
      >
        {/* ── Background image ── */}
        <div
          className="absolute inset-0 bg-cover bg-top z-0"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* ── Dual vignette overlay ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 10% 95%, rgba(5,8,18,0.82) 0%, transparent 70%),
              linear-gradient(to top, rgba(5,8,18,0.75) 0%, transparent 40%),
              linear-gradient(to bottom, rgba(5,8,18,0.35) 0%, transparent 25%)
            `,
          }}
        />

        {/* ── Content layer ── */}
        <div className="relative z-30 flex flex-col items-start h-full px-[5vw] pt-10">

          {/* Logo */}
          <span
            className="text-white text-2xl font-semibold  translate-x-7 md:translate-x-25"
            style={{ fontFamily: "'Elms Sans', sans-serif" }}
          >
            LOFIBets
          </span>

          {/* Bubble Menu — top right, inside content bounds */}
          <div className="absolute top-8 right-4 z-40">
            <BubbleMenu
              logo={<span style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#0a0d14", fontWeight: 700 }}>LOFI</span>}
              menuBg="#ffffff"
              menuContentColor="#0a0d14"
              useFixedPosition={true}
              items={[
                { label: "markets", href: "#markets", ariaLabel: "Markets", rotation: -8, hoverStyles: { bgColor: "#2E8FFF", textColor: "#ffffff" } },
                { label: "how it works", href: "#how-it-works", ariaLabel: "How it works", rotation: 8, hoverStyles: { bgColor: "#2E8FFF", textColor: "#ffffff" } },
                { label: "about", href: "#about", ariaLabel: "About", rotation: 8, hoverStyles: { bgColor: "#2E8FFF", textColor: "#ffffff" } },
              ]}
            />
          </div>

          {/* Bottom-left hero text */}
          <div className="absolute bottom-[14%] left-[5vw] max-w-[520px]">

            {/* Headline */}
            <h1
              className="text-white mb-4 leading-[0.95] tracking-wide"
              style={{
                fontFamily: "'Slackey', sans-serif",
                fontSize: "clamp(2.2rem, 7vw, 5.5rem)",
                textShadow: "0 2px 32px rgba(0,0,0,0.6)",
              }}
            >
              Predict. Bet.
              Win.
            </h1>

            <p className="text-white translate-x-8 md:translate-x-2 mb-6">Trade Markets with your $LOFI tokens.</p>

            <button
              className="rounded-2xl text-sm font-semibold text-[#0a0d14] cursor-pointer border-none transition-all duration-200 hover:-translate-y-px"
              style={{
                background: "#ffffff",
                fontFamily: "'Elms Sans', sans-serif",
                padding: "12px 30px",
                marginTop: "10px",
              }}
            >
              Launch App <MoveUpRight className="inline-block ml-2" size={12} />
            </button>

          </div>
        </div>
      </section>
    </>
  );
}