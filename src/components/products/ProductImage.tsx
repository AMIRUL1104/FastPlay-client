import { Product } from "@/src/types/product.type";
import Image from "next/image";

interface ProductImageProps {
    product: Product;
}

export default function ProductImage({ product }: ProductImageProps) {
    return (
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-(--mist) border border-(--slate)/10 shadow-sm">
            <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
            />

            {/* Featured badge */}
            {product.featured && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-(--copper) text-white shadow-md">
                    ★ Featured
                </span>
            )}

            {/* Category badge */}
            <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-(--navy)/90 text-white backdrop-blur-sm">
                {product.category}
            </span>
        </div>
    );
}
