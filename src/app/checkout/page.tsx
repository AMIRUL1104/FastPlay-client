import EmptyCheckout from "@/src/components/checkout/EmptyCheckout";
import OrderSummary from "@/src/components/checkout/OrderSummary";
import ShippingForm from "@/src/components/checkout/ShippingForm";
import { getUserSession } from "@/src/services/core/session";
import { getCart, getUserProfile } from "@/src/services/server/api";
import { redirect } from "next/navigation";

export const revalidate = 0; // রিয়েল-টাইম লেটেস্ট কার্ট ডেটা লোড করার জন্য

export default async function CheckoutPage() {
    const session = await getUserSession();
    if (!session) {
        redirect("/auth/signin?redirect=/checkout");
    }
    // ১. সমান্তরালভাবে লেটেস্ট কার্ট ও ইউজার প্রোফাইল ফেচিং
    const [cartRes, userRes] = await Promise.all([
        getCart(),
        getUserProfile()
    ]);

    const cart = cartRes;
    const user = userRes;

    // console.log(user)
    // console.log(cart)

    // ২. কার্ট যদি এম্পটি বা নাল থাকে তবে প্রফেশনাল এম্পটি স্টেট দেখানো হবে
    if (!cart || !cart.items || cart.items.length === 0) {
        return <EmptyCheckout />;
    }

    // ডিফল্ট ভ্যালু প্রিপেয়ার করা
    const defaultShippingValues = {
        phone: user?.phone || "",
        address: user?.address || "",
    };

    return (
        <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Page Header Area */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tight text-navy font-display">
                        Secure Checkout
                    </h1>
                    <p className="text-sm text-slate-muted mt-1">
                        Please fill in your shipping details to absolute finalize your sports order.
                    </p>
                </div>

                {/* 2-Column Responsive Layout */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">

                    {/* Left Column: Form & Info */}
                    <div className="lg:col-span-2">
                        <ShippingForm defaultValues={defaultShippingValues} />
                    </div>

                    {/* Right Column: Sticky Summary Area */}
                    <div className="lg:col-span-1">
                        <OrderSummary cart={cart} />
                    </div>

                </div>
            </div>
        </div>
    );
}