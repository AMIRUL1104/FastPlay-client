"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { FiLock } from "react-icons/fi";
import { createOrder } from "@/src/services/server/action"; // আপনার প্রজেক্ট পাথ অনুযায়ী মেলান
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { CreateOrderPayload, ShippingAddress } from "@/src/types/order.type";


// Zod Validation Schema
const shippingSchema = z.object({
    phone: z.string().min(11, "Phone number must be at least 11 characters long"),
    address: z.string().min(5, "Address must be at least 5 characters long"),
    city: z.string().min(2, "City name is required"),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
    defaultValues: {
        phone: string;
        address: string;
    };
}

export default function ShippingForm({ defaultValues }: ShippingFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingFormValues>({
        resolver: zodResolver(shippingSchema),
        defaultValues: {
            phone: defaultValues.phone || "",
            address: defaultValues.address || "",
            city: "",
        },
    });

    const onSubmit = (data: ShippingFormValues) => {
        startTransition(async () => {
            try {
                // API Contract এর রিকোয়ারমেন্ট অনুযায়ী শুধুমাত্র shippingAddress অবজেক্ট পাঠানো হচ্ছে
                const payload = {
                    shippingAddress: {
                        phone: data.phone,
                        address: data.address,
                        city: data.city,
                    },
                };

                // createOrder আপনার প্রদত্ত Action টাইপকে সাপোর্ট করে
                const res = await createOrder(payload as CreateOrderPayload);
                console.log(res);

                if (res?.success) {
                    toast.success(res.message);
                    router.push("/dashboard/orders");
                    router.refresh();
                } else {
                    toast.error(res?.message);
                }
            } catch (error) {
                toast.error("Something went wrong. Please check your network connection.");
            }
        });
    };

    return (
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-2xl border border-slate/15 bg-white p-6 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-navy font-display border-b border-slate/10 pb-3">
                    Shipping Information
                </h2>

                {/* Phone Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">Phone Number *</label>
                    <input
                        {...register("phone")}
                        type="text"
                        placeholder="e.g. 017XXXXXXXX"
                        disabled={isPending}
                        className={`w-full rounded-xl border p-3.5 text-sm transition-all focus:outline-hidden ${errors.phone
                            ? "border-terracotta bg-peach/10 focus:border-terracotta"
                            : "border-slate/20 bg-cream/30 focus:border-navy focus:bg-white"
                            }`}
                    />
                    {errors.phone && (
                        <span className="text-xs font-semibold text-terracotta">{errors.phone.message}</span>
                    )}
                </div>

                {/* City Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">City *</label>
                    <input
                        {...register("city")}
                        type="text"
                        placeholder="e.g. Dhaka, Sylhet"
                        disabled={isPending}
                        className={`w-full rounded-xl border p-3.5 text-sm transition-all focus:outline-hidden ${errors.city
                            ? "border-terracotta bg-peach/10 focus:border-terracotta"
                            : "border-slate/20 bg-cream/30 focus:border-navy focus:bg-white"
                            }`}
                    />
                    {errors.city && (
                        <span className="text-xs font-semibold text-terracotta">{errors.city.message}</span>
                    )}
                </div>

                {/* Address Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">Full Address *</label>
                    <textarea
                        {...register("address")}
                        rows={3}
                        placeholder="House no, Road no, Area details..."
                        disabled={isPending}
                        className={`w-full rounded-xl border p-3.5 text-sm transition-all focus:outline-hidden resize-none ${errors.address
                            ? "border-terracotta bg-peach/10 focus:border-terracotta"
                            : "border-slate/20 bg-cream/30 focus:border-navy focus:bg-white"
                            }`}
                    />
                    {errors.address && (
                        <span className="text-xs font-semibold text-terracotta">{errors.address.message}</span>
                    )}
                </div>
            </div>

            {/* Payment Method Option - Disabled/Read-only representation */}
            <div className="rounded-2xl border border-slate/15 bg-white p-6 shadow-xs">
                <h2 className="text-lg font-bold text-navy font-display border-b border-slate/10 pb-3 mb-4">
                    Payment Method
                </h2>
                <div className="flex items-center justify-between rounded-xl border border-navy/20 bg-cream p-4 opacity-80">
                    <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full border-4 border-navy bg-white" />
                        <div>
                            <p className="text-sm font-bold text-navy">Cash On Delivery</p>
                            <p className="text-xs text-slate-muted mt-0.5">Pay with cash upon delivery to your home.</p>
                        </div>
                    </div>
                    <span className="rounded-md bg-navy/10 px-2 py-0.5 text-[10px] font-bold text-navy uppercase tracking-wider">
                        Only Option
                    </span>
                </div>
            </div>
        </form>
    );
}