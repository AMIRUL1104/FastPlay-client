"use client";

import { AddToCartPayload } from "@/src/types/cart.type";
import { Product } from "@/src/types/product.type";
import { FiShoppingCart } from "react-icons/fi";

interface AddToCartButtonProps {
    product: Product;
    quantity: number;
}

export default function AddToCartButton({ product, quantity }: AddToCartButtonProps) {
    const handleAddToCart = () => {
        const payload: AddToCartPayload = {
            productId: product._id,
            quantity,
        };
        console.log("Add to cart payload:", payload);
    };

    return (
        <button
            id="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-(--navy) text-white hover:bg-(--copper) active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
            <FiShoppingCart size={17} />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
    );
}
