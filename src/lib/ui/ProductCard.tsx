"use client";

import AddToCartButton from "@/src/components/products/AddToCartButton";
import { Product } from "@/src/types/product.type";
import Image from "next/image";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

function ProductCard({ product }: { product: Product }) {
    return (
        <div className="bg-white rounded-xl border border-[var(--slate)]/15 overflow-hidden group hover:shadow-lg hover:border-[var(--copper)] transition-all duration-300 flex flex-col">
            {/* Image */}
            <div className="relative w-full aspect-square bg-[var(--mist)] overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Category badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-[var(--navy)] text-white">
                    {product.category}
                </span>
                {/* Featured badge */}
                {product.featured && (
                    <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[var(--copper)] text-white">
                        ★ Hot
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-[var(--slate-muted)] mb-1">{product.brand}</p>
                <h3 className="text-sm font-semibold text-[var(--navy)] line-clamp-2 mb-3 flex-1">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-bold text-[var(--copper)]">
                        ৳{product.price.toLocaleString()}
                    </span>
                    <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${product.stock > 0
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-500"
                            }`}
                    >
                        {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 max-sm:flex-col mt-auto items-center">
                    {/* রিয়াল এপিআই অ্যাকশন ও লোডিং স্টেটসহ নতুন বাটন */}
                    <AddToCartButton product={product} quantity={1} />

                    {/* View Details Link */}
                    <Link
                        href={`/products/${product._id}`}
                        title="View product details"
                        className="flex h-[44px] items-center justify-center gap-1 px-4 rounded-xl text-xs font-semibold border border-[var(--slate)]/25 text-[var(--slate)] hover:border-[var(--navy)] hover:text-[var(--navy)] transition-colors duration-200"
                    >
                        <FiEye size={14} />
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;