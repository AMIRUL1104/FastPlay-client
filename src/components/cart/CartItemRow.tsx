// src/components/cart/CartItemRow.tsx
"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { CartItem } from "@/src/types/cart.type"; // আপনার পাথ অনুযায়ী ইমপোর্ট করুন
import { removeCartItem, updateCartItem } from "@/src/services/server/action";

interface CartItemRowProps {
    item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [localQuantity, setLocalQuantity] = useState(item.quantity);

    const handleQuantityChange = async (newQty: number) => {
        if (newQty < 1 || isPending) return;
        setLocalQuantity(newQty);

        startTransition(async () => {
            const res = await updateCartItem(item.productId, { quantity: newQty });
            if (res?.success) {
                router.refresh();
            } else {
                // এরর হলে ওল্ড স্টেট ব্যাকআপ করা
                setLocalQuantity(item.quantity);
            }
        });
    };

    const handleRemove = async () => {
        if (isPending) return;
        startTransition(async () => {
            const res = await removeCartItem(item.productId);
            if (res?.success) {
                router.refresh();
            }
        });
    };

    return (
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate/15 py-5 transition-opacity duration-200 ${isPending ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
            {/* Product info section */}

            <div className="flex gap-4 w-full sm:w-auto flex-1 min-w-0">
                {/* Product Image */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate/15 bg-mist">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col justify-center flex-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-copper block truncate">
                        {item.brand}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-navy line-clamp-2 leading-snug pr-2">
                        {item.name}
                    </h3>
                    <p className="text-xs text-slate-muted capitalize mt-0.5 block truncate">
                        {item.category}
                    </p>
                </div>
            </div>

            {/* Control & Pricing Actions */}
            <div className="mt-4 sm:mt-0 flex w-full sm:w-auto items-center justify-between sm:gap-12 shrink-0">
                {/* text-gray-300 থেকে text-slate করা হয়েছে এবং টাকার সাইন ৳ দেওয়া হয়েছে */}
                <span className="text-sm font-semibold text-slate md:w-20 md:text-right">
                    ৳{item.price.toLocaleString()}
                </span>

                {/* Quantity Selector Component - bg-cream এবং border-slate/15 */}
                <div className="flex items-center rounded-lg border border-slate/15 bg-cream p-1">
                    <button
                        onClick={() => handleQuantityChange(localQuantity - 1)}
                        disabled={localQuantity <= 1 || isPending}
                        className="p-1.5 text-slate-muted hover:text-navy transition-colors disabled:opacity-30 cursor-pointer"
                        aria-label="Decrease quantity"
                    >
                        <FiMinus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-navy select-none">
                        {localQuantity}
                    </span>
                    <button
                        onClick={() => handleQuantityChange(localQuantity + 1)}
                        disabled={isPending}
                        className="p-1.5 text-slate-muted hover:text-navy transition-colors disabled:opacity-30 cursor-pointer"
                        aria-label="Increase quantity"
                    >
                        <FiPlus size={14} />
                    </button>
                </div>

                {/* Subtotal - text-[var(--copper)] থেকে সরাসরি text-copper */}
                <span className="text-sm font-bold text-copper md:w-24 md:text-right">
                    ৳{(item.price * localQuantity).toLocaleString()}
                </span>

                {/* Remove Trigger Button - হোভারে থিমের text-terracotta সেট করা হয়েছে */}
                <button
                    onClick={handleRemove}
                    disabled={isPending}
                    className="p-2 text-slate-muted hover:text-terracotta transition-colors disabled:opacity-30 cursor-pointer"
                    aria-label="Remove item"
                >
                    <FiTrash2 size={16} />
                </button>
            </div>
        </div>
    );
}