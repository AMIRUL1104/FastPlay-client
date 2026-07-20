import Link from "next/link";
import { FaFutbol } from "react-icons/fa";
import { GiCricketBat, GiBiceps, GiTennisRacket } from "react-icons/gi";

const categories = [
  {
    label: "Football",
    slug: "football",
    icon: FaFutbol,
    description: "Boots, balls, jerseys & more",
  },
  {
    label: "Cricket",
    slug: "cricket",
    icon: GiCricketBat,
    description: "Bats, pads, gloves & gear",
  },
  {
    label: "Badminton",
    slug: "badminton",
    icon: GiTennisRacket,
    description: "Rackets, shuttles & bags",
  },
  {
    label: "Gym Equipment",
    slug: "gym-equipment",
    icon: GiBiceps,
    description: "Weights, bands & machines",
  },
];

export default function CategoriesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h2
          className="text-3xl sm:text-4xl font-bold text-(--navy) mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Shop by Category
        </h2>
        <p className="text-(--slate) text-sm sm:text-base max-w-md mx-auto">
          Find everything you need for your favourite sport
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map(({ label, slug, icon: Icon, description }) => (
          <Link
            key={slug}
            href={`/products?category=${slug}`}
            className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-xl border border-(--slate)/15 bg-white transition-all duration-200 hover:border-(--copper) hover:shadow-md"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full mb-4 transition-colors duration-200 bg-(--mist) group-hover:bg-(--peach)">
              <Icon
                size={28}
                className="text-(--navy) group-hover:text-(--copper) transition-colors duration-200"
              />
            </div>
            <h3 className="font-semibold text-(--navy) text-sm sm:text-base mb-1">
              {label}
            </h3>
            <p className="text-(--slate-muted) text-xs hidden sm:block">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
