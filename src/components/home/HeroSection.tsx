import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] bg-(--navy) px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 15% 50%, rgba(217,155,127,0.08), transparent 55%), radial-gradient(circle at 85% 20%, rgba(165,111,99,0.07), transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-(--copper) text-(--copper)">
          Premium Sports Equipment
        </span>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Play Harder.{" "}
          <span className="text-(--copper)">Win Faster.</span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Discover top-quality sports gear for football, cricket, badminton,
          and gym — all in one place.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="w-full sm:w-auto px-8 py-3.5 rounded-md text-sm font-semibold text-white transition-colors duration-200 bg-(--copper) hover:bg-(--terracotta)"
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto px-8 py-3.5 rounded-md text-sm font-semibold transition-colors duration-200 border border-white/20 text-white/80 hover:border-(--copper) hover:text-(--copper)"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
