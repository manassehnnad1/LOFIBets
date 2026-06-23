import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";


export default function HowItWorks() {
  const navigate = useNavigate();

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
            How It Works
          </h1>
          <p className="text-lg md:text-xl font-bold text-white/70 leading-relaxed">
            1. Connect your Wallet <br /> 2. Find a market <br /> 3. Place a bet with your $LOFI  or $SUI tokens and Win.
          </p>

          {/* <button className="fixed top-6 left-6 z-30 text-black text-lg bg-white w-32 h-9 font-bold cursor-pointer transition-all hover:translate-x-[4px] duration-200 rounded-2xl" style={{ fontFamily: "Elms Sans, san-serif" }}>
            <MoveLeft className="inline-block translate-x-[-4px] h-4" />
            Back
          </button> */}
        </div>
      </div>
    </div>
  );
}