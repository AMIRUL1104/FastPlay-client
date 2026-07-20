// src/components/cart/EmptyCart.tsx
import Link from "next/link";
import { FiShoppingBag, FiArrowLeft } from "react-icons/fi";

export default function EmptyCart() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center px-4 py-16">
            {/* আইকন হোল্ডারকে bg-mist এবং border-slate/15 এ রূপান্তর করা হয়েছে, আইকন কালার text-navy */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-mist border border-slate/15 text-navy shadow-xs animate-pulse">
                <FiShoppingBag size={36} />
            </div>

            {/* text-white থেকে text-navy এবং ইনলাইন ফন্ট সরিয়ে font-display ক্লাস */}
            <h2 className="text-2xl font-bold text-navy mb-2 font-display">
                Your Cart is Empty
            </h2>

            {/* text-gray-400 থেকে text-slate-muted করা হয়েছে */}
            <p className="max-w-sm text-sm text-slate-muted mb-8">
                {`Looks like you haven't added any sports equipment yet. Explore our top gear to get started!`}
            </p>

            {/* বোতামটি আগে ম্লান ছিল, এখন থিমের bg-navy ও hover:bg-copper দিয়ে প্রফেশনাল লুক দেওয়া হয়েছে */}
            <Link
                href="/products"
                className="flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white transition-all hover:bg-copper active:scale-95 shadow-xs"
            >
                <FiArrowLeft size={16} />
                Continue Shopping
            </Link>
        </div>
    );
}