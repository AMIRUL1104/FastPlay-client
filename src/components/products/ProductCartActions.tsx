"use client";

import { Product } from "@/src/types/product.type";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import QuantitySelector from "./QuantitySelector";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

interface ProductCartActionsProps {
    product: Product;
}

export default function ProductCartActions({ product }: ProductCartActionsProps) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="space-y-4 pt-6 border-t border-(--slate)/10">
            {product.stock > 0 ? (
                <>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-(--navy)">Quantity:</span>
                        <QuantitySelector
                            quantity={quantity}
                            stock={product.stock}
                            onChange={setQuantity}
                        />
                    </div>
                    <div className="flex gap-3">
                        <AddToCartButton product={product} quantity={quantity} />
                        <Link
                            id="continue-shopping-link"
                            href="/products"
                            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold border border-(--slate)/25 text-(--slate) hover:border-(--navy) hover:text-(--navy) transition-colors duration-200"
                        >
                            <FiShoppingBag size={16} />
                            <span className="hidden sm:inline">Browse More</span>
                        </Link>
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-3">
                    <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm font-medium text-red-600 text-center">
                        This product is currently out of stock
                    </div>
                    <Link
                        href="/products"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-(--slate)/25 text-(--navy) hover:bg-(--mist) transition-colors duration-200"
                    >
                        <FiShoppingBag size={15} />
                        Browse Other Products
                    </Link>
                </div>
            )}
        </div>
    );
}
