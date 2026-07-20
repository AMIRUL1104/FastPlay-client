// src/components/products/ProductAddToCartBtn.tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { addToCart } from "@/src/services/server/action";

interface AddToCartBtnProps {
    productId: string;
}

export default function ProductAddToCartBtn({ productId }: AddToCartBtnProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = () => {
        if (isPending) return;

        startTransition(async () => {
            const res = await addToCart({ productId, quantity: 1 });
            if (res?.success) {
                // সেশন রিফ্রেশ করে কার্ট আপডেট নিশ্চিত করা
                router.refresh();
            } else {
                // আপনি চাইলে এখানে টোস্ট নোটিফিকেশন অ্যালার্ট ট্রিগার করতে পারেন
                alert(res?.message || "Please login to add items to cart.");
            }
        });
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-copper active:scale-98 disabled:opacity-50 disabled:scale-100 cursor-pointer"
        >
            <FiShoppingCart size={16} className={isPending ? "animate-spin" : ""} />
            {isPending ? "Adding..." : "Add to Cart"}
        </button>
    );
}