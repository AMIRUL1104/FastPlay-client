import { Product } from "@/src/types/product.type";
import { ProductCard } from "./ProductCard";

interface ProductRecommendationsProps {
  products: Product[];
}

export function ProductRecommendations({ products }: ProductRecommendationsProps) {
  if (!products.length) return null;

  return (
    <div className="mt-2.5">
      <p
        className="text-[11px] font-medium text-(--slate-muted) mb-2 px-0.5"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {products.length} product{products.length > 1 ? "s" : ""} found
      </p>

      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
