import { useEffect } from "react";



export default function About() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Full page background image */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url(/imgy1.jpg)", objectPosition: "top" }}
      />

      {/* Dark overlay over background */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ background: "rgba(5,8,18,0.55)" }}
      />

      {/* Page content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center py-16 px-[5vw] text-center">
        <div className="max-w-3xl">
          <h1
            className="text-4xl md:text-5xl text-white font-semibold "
            style={{ fontFamily: "'Elms Sans', sans-serif", marginBottom: "1rem" }}
          >
            About LOFIBets
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            LOFIBets is a community-first prediction market built on Sui. Here we place simple, honest bets directly with $SUI tokens on the things that matter to the ecosystem and broader events, with clarity, trust, and no unnecessary complexity.
          </p>
        </div>
      </div>
    </div>
  );
}