import Link from "next/link";
import { FiMessageCircle } from "react-icons/fi";

export default function AIAssistantBanner() {
  return (
    <section className="bg-(--peach) px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-2xl bg-white border border-(--copper)/20 px-8 py-10 sm:px-12 sm:py-14 shadow-sm">
          {/* Icon */}
          <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-(--peach)">
            <FiMessageCircle size={36} className="text-(--copper)" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <h2
              className="text-2xl sm:text-3xl font-bold text-(--navy) mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Not sure what to buy?
            </h2>
            <p className="text-(--slate) text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Talk to our AI Shopping Assistant. It can recommend the perfect
              gear based on your sport, budget, and skill level — instantly.
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-white bg-(--copper) hover:bg-(--terracotta) transition-colors duration-200"
            >
              <FiMessageCircle size={16} />
              Ask AI Assistant
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
