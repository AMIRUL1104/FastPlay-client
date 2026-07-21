import Link from "next/link";
import { FiShoppingBag, FiArrowLeft } from "react-icons/fi";

export default function EmptyCheckout() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 py-16 bg-white">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-mist border border-slate/15 text-navy shadow-xs animate-pulse">
                <FiShoppingBag size={40} />
            </div>

            <h2 className="text-2xl font-bold text-navy mb-2 font-display">
                Your Cart is Empty
            </h2>

            <p className="max-w-sm text-sm text-slate-muted mb-8">
                You cannot proceed to checkout without adding items to your cart. Explore our premium sports gear to get started!
            </p>

            <Link
                href="/products"
                className="flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white transition-all hover:bg-copper active:scale-95 shadow-md cursor-pointer"
            >
                <FiArrowLeft size={16} />
                Continue Shopping
            </Link>
        </div>
    );
}