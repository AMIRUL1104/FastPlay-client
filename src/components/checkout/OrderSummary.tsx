import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { Cart } from "@/src/types/cart.type"; // আপনার পাথ অনুযায়ী ইমপোর্ট করুন

interface OrderSummaryProps {
    cart: Cart;
    isPending?: boolean; // ফরমের পেন্ডিং স্টেট সিঙ্ক করার জন্য
}

export default function OrderSummary({ cart, isPending = false }: OrderSummaryProps) {
    return (
        <div className="rounded-2xl border border-slate/15 bg-cream p-6 shadow-md lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-navy mb-6 font-display border-b border-slate/10 pb-3">
                Order Summary
            </h2>

            {/* Product Items Mini List */}
            <div className="max-h-[240px] overflow-y-auto pr-1 space-y-3 mb-6 scrollbar-thin">
                {cart.items.map((item) => (
                    <div key={item.productId} className="flex gap-3 bg-white p-2.5 rounded-xl border border-slate/10">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-mist border border-slate/10">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="56px"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-center min-w-0">
                            <h4 className="text-xs font-bold text-navy line-clamp-1">{item.name}</h4>
                            <p className="text-[11px] text-slate-muted mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <div className="flex items-center justify-end font-semibold text-xs text-navy shrink-0 pl-2">
                            ৳{item.subtotal.toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pricing Information */}
            <div className="space-y-4 border-t border-slate/10 pt-4">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-muted">Total Items</span>
                    <span className="font-semibold text-navy">{cart.totalItems}</span>
                </div>

                <div className="flex justify-between text-sm border-b border-slate/10 pb-4">
                    <span className="text-slate-muted">Shipping Fee</span>
                    <span className="font-semibold text-emerald-600">Free</span>
                </div>

                <div className="flex justify-between items-baseline pt-2">
                    <span className="text-base font-bold text-navy">Total Bill</span>
                    <span className="text-2xl font-black text-copper">
                        ৳{cart.totalPrice.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Trigger Button - HTML ফর্মকে সাবমিট আইডির মাধ্যমে রিমোটলি অ্যাটাচ করা হয়েছে */}
            <div className="mt-8">
                <button
                    type="submit"
                    form="checkout-form"
                    disabled={isPending}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-5 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-copper active:scale-98 disabled:opacity-40 disabled:scale-100 cursor-pointer"
                >
                    {isPending ? "Placing Your Order..." : "Confirm & Place Order"}
                    <FiArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}