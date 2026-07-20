import { Product } from "@/src/types/product.type";
import { FiBox, FiTag, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import ProductCartActions from "./ProductCartActions";

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const inStock = product.stock > 0;

    return (
        <div className="flex flex-col justify-center">
            {/* Brand & Category */}
            <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-(--navy) text-white uppercase tracking-wide">
                    <FiTag size={10} />
                    {product.category}
                </span>
                {product.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-(--copper) text-white uppercase tracking-wide">
                        ★ Featured
                    </span>
                )}
            </div>

            {/* Product Name */}
            <h1
                className="text-2xl sm:text-3xl font-bold text-(--navy) leading-snug mb-2"
                style={{ fontFamily: "var(--font-display)" }}
            >
                {product.name}
            </h1>

            {/* Brand */}
            <p className="text-sm text-(--slate-muted) mb-5">
                By <span className="font-semibold text-(--slate)">{product.brand}</span>
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl font-extrabold text-(--copper)">
                    ৳{product.price.toLocaleString()}
                </span>
            </div>

            {/* Stock & Details row */}
            <div className="flex flex-wrap gap-3 mb-5">
                {/* Stock */}
                <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                        inStock
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-red-50 text-red-600 border border-red-100"
                    }`}
                >
                    {inStock ? (
                        <>
                            <FiCheckCircle size={14} />
                            {product.stock} in stock
                        </>
                    ) : (
                        <>
                            <FiAlertCircle size={14} />
                            Out of stock
                        </>
                    )}
                </div>

                {/* SKU / ID hint */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-(--cream) text-(--slate) border border-(--slate)/10">
                    <FiBox size={13} />
                    SKU: {product._id.slice(-8).toUpperCase()}
                </div>
            </div>

            {/* Description */}
            <div className="mb-1">
                <h2 className="text-sm font-bold text-(--navy) uppercase tracking-wider mb-2">
                    Description
                </h2>
                <p className="text-sm text-(--slate) leading-relaxed">
                    {product.description}
                </p>
            </div>

            {/* Cart Actions (client island) */}
            <ProductCartActions product={product} />
        </div>
    );
}
