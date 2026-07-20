
import CartItemRow from "@/src/components/cart/CartItemRow";
import CartSummary from "@/src/components/cart/CartSummary";
import EmptyCart from "@/src/components/cart/EmptyCart";
import { getCart } from "@/src/services/server/api";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = {
    title: "Your Shopping Cart — FastPlay",
};

export default async function CartPage() {
    // সার্ভার সাইড সিকিউর ডাটা ফেচিং
    const cartResponse = await getCart();
    const cart = cartResponse?.success ? cartResponse.data : null;

    if (!cart || !cart.items || cart.items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Title / Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                        Shopping Cart
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        You have <span className="font-bold text-[var(--copper)]">{cart.totalItems}</span> items in your cart
                    </p>
                </div>
                <Link
                    href="/products"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors self-start sm:self-auto"
                >
                    <FiArrowLeft size={16} />
                    Back to Gear Shop
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                <div className="lg:col-span-2 rounded-2xl border border-slate/15 bg-white p-6 shadow-sm">
                    <div className="hidden sm:flex justify-between border-b border-slate/15 pb-3 text-xs font-bold uppercase tracking-wider text-slate-muted">
                        <span>Product Details</span>
                        <div className="flex gap-16 md:gap-24 pr-12">
                            <span>Price</span>
                            <span>Qty</span>
                            <span>Total</span>
                        </div>
                    </div>

                    {/* Item Loop Area */}
                    <div className="flex flex-col">
                        {cart.items.map((item) => (
                            <CartItemRow key={item.productId} item={item} />
                        ))}
                    </div>
                </div>

                {/* Total Summary Block Column */}
                <div className="lg:col-span-1">
                    <CartSummary cart={cart} />
                </div>
            </div>
        </div>
    );
}