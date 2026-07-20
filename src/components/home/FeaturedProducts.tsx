import Link from "next/link";
import Image from "next/image";
import { Product } from "@/src/types/product.type";
import { FiShoppingCart } from "react-icons/fi";
import ProductCard from "@/src/lib/ui/ProductCard";

interface FeaturedProductsProps {
  products: Product[];
}



export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="bg-(--mist) px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-(--navy) mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Featured Products
            </h2>
            <p className="text-(--slate) text-sm sm:text-base">
              Hand-picked gear for peak performance
            </p>
          </div>
          <Link
            href="/products"
            className="self-start sm:self-auto shrink-0 px-5 py-2.5 rounded-md text-sm font-semibold border border-(--copper) text-(--copper) hover:bg-(--copper) hover:text-white transition-colors duration-200"
          >
            View All
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
