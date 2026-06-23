interface HowItWorksProps {
  yetiImage?: string;
}

const steps = [
  {
    number: "01",
    title: "Connect Your Wallet",
    description: "Link your Sui wallet in one click. ",
  },
  {
    number: "02",
    title: "Pick a Market",
    description: "Browse active prediction markets. ",
  },
  {
    number: "03",
    title: "Bet & Win",
    description: "Place your bet with $LOFI tokens and Win.",
  },
];

export default function HowItWorks({ yetiImage }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className="w-full bg-white py-24"
      style={{ fontFamily: "'Elms Sans', sans-serif" }}
    >
      {/* Centered title */}
      <h2
        className="text-center text-[#0a0d14]  translate-y-9 px-4"
        style={{
          fontFamily: "'Slackey', sans-serif",
          fontSize: "clamp(3rem, 7vw, 1rem)",
          letterSpacing: "0.04em",
        }}
      >
        How It Works
      </h2>

      {/* Two column layout — fixed widths, centered */}
      <div
        className="mx-auto flex flex-col md:flex-row items-center justify-center gap-36 px-[5vw]"
        style={{ maxWidth: "2000px" , marginTop: "5rem" }}
      >
        {/* Left — steps */}
        <div className="w-full md:w-[380px] shrink-0 flex flex-col gap-10">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-5 items-start">

              {/* Step number */}
              <span
                className="shrink-0 text-[#2E8FFF] leading-none mt-1"
                style={{
                  fontFamily: "'Elms Sans', sans-serif",
                  fontSize: "0.95rem",
                  letterSpacing: "0.1em",
                }}
              >
                {step.number}
              </span>

              {/* Vertical divider */}
              <div className="shrink-0 w-px self-stretch bg-[#0a0d14]/10" />

              {/* Content */}
              <div className="flex flex-col gap-1.5">
                <h2
                  className="text-[#0a0d14] font-semibold text-base text-xl leading-snug"
                  style={{ fontFamily: "'Elms Sans', sans-serif" }}
                >
                  {step.title}
                </h2>
                <p className="text-lg text-[#0a0d14]/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right — Yeti image */}
        <div className="w-full md:w-[520px] md:h-[420px] shrink-0 flex items-center justify-center">
          {yetiImage ? (
            <img
              src={yetiImage}
              alt="Lofi Yeti"
              className="w-full h-full rounded-2xl object-cover"
              style={{ objectPosition: "center right" }}
            />
          ) : (
            <div
              className="w-full rounded-2xl flex items-center justify-center"
              style={{
                aspectRatio: "3/4",
                background: "#f4f6f9",
                border: "2px dashed rgba(10,13,20,0.1)",
              }}
            >
              <p className="text-[#0a0d14]/30 text-sm text-center px-8">
                Pass yetiImage prop with your image path
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}