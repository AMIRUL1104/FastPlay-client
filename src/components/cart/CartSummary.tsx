// src/components/cart/CartSummary.tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { Cart } from "@/src/types/cart.type";
import { clearCart } from "@/src/services/server/action";


interface CartSummaryProps {
    cart: Cart;
}

export default function CartSummary({ cart }: CartSummaryProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClearCart = () => {
        if (isPending || !confirm("Are you sure you want to clear your cart?")) return;
        startTransition(async () => {
            const res = await clearCart();
            if (res?.success) {
                router.refresh();
            }
        });
    };

    return (

        <div className="rounded-2xl border border-slate/15 bg-cream p-6 shadow-md sticky top-24">

            <h2 className="text-lg font-bold text-navy mb-6 font-display">
                Order Summary
            </h2>

            <div className="space-y-4">
                <div className="flex justify-between text-sm">

                    <span className="text-slate-muted">Total Items</span>
                    <span className="font-semibold text-navy">{cart.totalItems}</span>
                </div>


                <div className="flex justify-between text-sm border-b border-slate/10 pb-4">
                    <span className="text-slate-muted">Shipping</span>

                    <span className="font-semibold text-emerald-600">Free</span>
                </div>

                <div className="flex justify-between items-baseline pt-2">
                    <span className="text-base font-bold text-navy">Total Estimated</span>

                    <span className="text-2xl font-black text-copper">
                        ৳{cart.totalPrice.toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="mt-8 space-y-3">
                <button
                    onClick={() => router.push("/checkout")}
                    disabled={isPending || cart.items.length === 0}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-copper active:scale-98 disabled:opacity-40 disabled:scale-100 cursor-pointer"
                >
                    Proceed to Checkout
                    <FiArrowRight size={16} />
                </button>

                <button
                    onClick={handleClearCart}
                    disabled={isPending || cart.items.length === 0}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-peach hover:bg-peach/80 px-4 py-2.5 text-xs font-semibold text-terracotta transition-colors disabled:opacity-30 cursor-pointer"
                >
                    <FiTrash2 size={14} />
                    Clear Entire Cart
                </button>
            </div>
        </div>
    );
}