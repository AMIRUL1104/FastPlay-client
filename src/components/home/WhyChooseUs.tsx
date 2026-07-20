import { FiTruck, FiShield, FiStar, FiHeadphones } from "react-icons/fi";

const features = [
  {
    icon: FiTruck,
    title: "Fast Delivery",
    description:
      "Get your sports gear delivered to your doorstep quickly. Cash on delivery available.",
  },
  {
    icon: FiShield,
    title: "Authentic Products",
    description:
      "Every product is sourced from verified brands. No counterfeits, guaranteed.",
  },
  {
    icon: FiStar,
    title: "Premium Quality",
    description:
      "Only the best gear makes it to our store — built for performance, made to last.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    description:
      "Our AI assistant and support team are always ready to help you find the right gear.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h2
          className="text-3xl sm:text-4xl font-bold text-(--navy) mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Why Choose FastPlay?
        </h2>
        <p className="text-(--slate) text-sm sm:text-base max-w-md mx-auto">
          We make buying sports equipment simple, fast, and trustworthy
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-start p-6 rounded-xl border border-(--slate)/15 bg-white hover:border-(--copper) hover:shadow-md transition-all duration-200"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-(--peach) mb-4">
              <Icon size={22} className="text-(--copper)" />
            </div>
            <h3
              className="font-semibold text-(--navy) mb-2 text-base"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h3>
            <p className="text-(--slate) text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
