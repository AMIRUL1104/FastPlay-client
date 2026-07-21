"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { AddToCartPayload } from "@/src/types/cart.type";
import { Product } from "@/src/types/product.type";
import { addToCart } from "@/src/services/server/action";
import { toast } from "react-toastify";

interface AddToCartButtonProps {
    product: Product;
    quantity: number;
}

export default function AddToCartButton({ product, quantity }: AddToCartButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const isOutOfStock = product.stock === 0;

    const handleAddToCart = () => {
        if (isPending || isOutOfStock) return;

        const payload: AddToCartPayload = {
            productId: product._id,
            quantity,
        };

        startTransition(async () => {
            try {
                const res = await addToCart(payload);
                // console.log(res)
                if (res?.success) {
                    // সেশন ও কার্ট ডেটা রিফ্রেশ করার জন্য
                    toast.success("addede to cart")
                    router.refresh();
                } else {
                    alert(res?.message || "Please login to add items to cart.");
                }
            } catch (error) {
                console.error("Failed to add item to cart:", error);
                alert("Something went wrong. Please try again.");
            }
        });
    };

    // বোতামের ডাইনামিক টেক্সট নির্ধারণ
    const getButtonText = () => {
        if (isOutOfStock) return "Out of Stock";
        if (isPending) return "Adding...";
        return "Add to Cart";
    };

    return (
        <button
            id="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={isOutOfStock || isPending}
            className="flex-1 flex items-center justify-center gap-1 px-1 py-2 rounded-lg text-xs font-semibold bg-(--navy) text-white hover:bg-(--copper) transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
            <FiShoppingCart
                size={17}
                className={isPending ? "animate-spin" : ""}
            />
            {getButtonText()}
        </button>
    );
}