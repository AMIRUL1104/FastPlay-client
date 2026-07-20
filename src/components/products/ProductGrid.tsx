import { Product } from "@/src/types/product.type";
import ProductCard from "@/src/lib/ui/ProductCard";
import { FiPackage } from "react-icons/fi";

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-28 text-center">
                <div className="w-20 h-20 rounded-full bg-(--mist) flex items-center justify-center mb-5 ring-4 ring-(--mist)">
                    <FiPackage size={32} className="text-(--slate-muted)" />
                </div>
                <h3
                    className="text-xl font-bold text-(--navy) mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    No products found
                </h3>
                <p className="text-sm text-(--slate-muted) max-w-xs">
                    Try adjusting your search terms or clearing your filters to see more results.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
}
