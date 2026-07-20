import { FiUsers, FiPackage, FiShoppingBag, FiAward } from "react-icons/fi";

const stats = [
  { icon: FiUsers, value: "10,000+", label: "Happy Customers" },
  { icon: FiPackage, value: "500+", label: "Products Available" },
  { icon: FiShoppingBag, value: "25,000+", label: "Orders Delivered" },
  { icon: FiAward, value: "4", label: "Sport Categories" },
];

export default function StatisticsSection() {
  return (
    <section className="bg-(--navy) px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FastPlay by the Numbers
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto">
            Trusted by thousands of athletes across Bangladesh
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center p-6 rounded-xl border border-white/10 bg-white/5"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-(--copper)/15 mb-4">
                <Icon size={22} className="text-(--copper)" />
              </div>
              <span
                className="text-3xl sm:text-4xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {value}
              </span>
              <span className="text-white/60 text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
