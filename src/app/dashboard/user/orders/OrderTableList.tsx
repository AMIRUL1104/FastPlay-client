"use client";

import { useState } from "react";
import Image from "next/image";
import {
    ShoppingBag,
    Eye,
    XCircle,
    X,
    User,
    MapPin,
    CreditCard,
    Hash,
    Calendar,
    Package,
} from "lucide-react";

export interface OrderProduct {
    productId: string;
    name: string;
    brand?: string;
    category?: string;
    image?: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export interface OrderUser {
    userId: string;
    name: string;
    email: string;
    phone?: string;
}

export interface ShippingAddress {
    address: string;
    city: string;
    phone: string;
}

export interface Order {
    _id: string;
    user?: OrderUser;
    products: OrderProduct[];
    shippingAddress: ShippingAddress;
    paymentMethod?: string;
    status: "pending" | "accepted" | "rejected" | "cancelled" | string;
    totalPrice: number;
    createdAt: string;
    updatedAt?: string;
}

interface OrderTableListProps {
    orders: Order[];
}

export default function OrderTableList({ orders }: OrderTableListProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Status Badge Rendering Helper
    const renderStatusBadge = (status: string) => {
        const s = status?.toLowerCase();
        switch (s) {
            case "pending":
                return (
                    <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-600 border border-amber-500/20">
                        Pending
                    </span>
                );
            case "accepted":
            case "completed":
            case "delivered":
                return (
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 border border-emerald-500/20">
                        Accepted
                    </span>
                );
            case "rejected":
                return (
                    <span className="inline-flex items-center rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-bold text-rose-600 border border-rose-500/20">
                        Rejected
                    </span>
                );
            case "cancelled":
                return (
                    <span className="inline-flex items-center rounded-full bg-gray-500/10 px-2.5 py-0.5 text-[11px] font-bold text-gray-600 border border-gray-500/20">
                        Cancelled
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-semibold text-text-muted border border-peach">
                        {status}
                    </span>
                );
        }
    };

    const handleCancelOrder = (orderId: string) => {
        console.log(orderId);
    };

    if (!orders || orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] rounded-2xl border border-peach bg-bg-card p-8 text-center shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-copper">
                    <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-base font-bold text-text-head font-display">
                    No orders found
                </h3>
                <p className="mt-1 text-xs text-text-muted">
                    {` You haven't placed any orders yet on FastPlay.`}
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Responsive Orders Table */}
            <div className="w-full overflow-hidden rounded-2xl border border-peach bg-bg-card shadow-xs">
                <div className="overflow-x-auto max-w-full">
                    <table className="w-full text-left text-xs sm:text-sm text-text-body border-collapse min-w-[700px]">
                        <thead className="sticky top-0 z-10 border-b border-peach bg-mist text-[11px] sm:text-xs font-bold uppercase tracking-wider text-text-head font-display">
                            <tr>
                                <th scope="col" className="px-4 py-3.5">Order Date</th>
                                <th scope="col" className="px-4 py-3.5">Product</th>
                                <th scope="col" className="px-4 py-3.5">Total Price</th>
                                <th scope="col" className="px-4 py-3.5">Status</th>
                                <th scope="col" className="px-4 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-peach/60 align-middle">
                            {orders.map((order) => {
                                const formattedDate = order.createdAt
                                    ? new Date(order.createdAt).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : "N/A";

                                const firstProduct = order.products?.[0];
                                const totalItemsCount = order.products?.length || 0;
                                const statusLower = order.status?.toLowerCase();
                                const canCancel =
                                    statusLower === "pending" || statusLower === "accepted";

                                return (
                                    <tr
                                        key={order._id}
                                        className="transition-colors hover:bg-peach/10"
                                    >
                                        {/* Order Date */}
                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5 text-text-head font-medium">
                                                <Calendar className="h-3.5 w-3.5 text-copper shrink-0" />
                                                <span>{formattedDate}</span>
                                            </div>
                                            <p className="text-[10px] text-text-muted font-mono mt-0.5">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </p>
                                        </td>

                                        {/* Products Summary */}
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-3">
                                                {firstProduct?.image && (
                                                    <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-peach bg-mist shrink-0">
                                                        <Image
                                                            src={firstProduct.image}
                                                            alt={firstProduct.name || "Product"}
                                                            fill
                                                            sizes="40px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="font-bold text-text-head text-xs truncate max-w-[220px]">
                                                        {firstProduct?.name || "Order Item"}
                                                    </p>
                                                    {totalItemsCount > 1 && (
                                                        <p className="text-[10px] text-text-muted font-medium flex items-center gap-1">
                                                            <Package className="h-3 w-3 text-copper inline" />
                                                            +{totalItemsCount - 1} more item
                                                            {totalItemsCount - 1 > 1 ? "s" : ""}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Total Price */}
                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <span className="font-black text-copper text-xs sm:text-sm font-display">
                                                ৳{order.totalPrice?.toLocaleString()}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            {renderStatusBadge(order.status)}
                                        </td>

                                        {/* Action Buttons */}
                                        <td className="px-4 py-3.5 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Cancel Order Button */}
                                                {canCancel && (
                                                    <button
                                                        onClick={() => handleCancelOrder(order._id)}
                                                        type="button"
                                                        className="inline-flex items-center gap-1 rounded-xl bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-500 hover:text-white transition-all cursor-pointer border border-rose-500/20"
                                                    >
                                                        <XCircle className="h-3.5 w-3.5" />
                                                        <span>Cancel Order</span>
                                                    </button>
                                                )}

                                                {/* Details Modal Trigger Button */}
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    type="button"
                                                    className="inline-flex items-center gap-1 rounded-xl bg-copper px-3 py-1.5 text-xs font-bold text-white hover:bg-terracotta transition-all shadow-xs cursor-pointer"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                    <span>Details</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-peach bg-bg-card p-5 sm:p-6 shadow-xl space-y-5">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-peach pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-text-head font-display flex items-center gap-2">
                                    <ShoppingBag className="h-5 w-5 text-copper" />
                                    Order Details
                                </h3>
                                <p className="text-xs text-text-muted font-mono flex items-center gap-1 mt-0.5">
                                    <Hash className="h-3 w-3 text-copper" />
                                    ID: {selectedOrder._id}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="rounded-lg p-1.5 text-text-muted hover:bg-mist hover:text-text-head transition-colors cursor-pointer"
                                type="button"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="space-y-4 text-xs sm:text-sm">
                            {/* Customer & Shipping Summary Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border border-peach bg-mist/50 p-3.5 space-y-1.5">
                                    <p className="font-bold text-text-head flex items-center gap-1.5 text-xs uppercase tracking-wider">
                                        <User className="h-4 w-4 text-copper" />
                                        Customer Details
                                    </p>
                                    <p className="font-medium text-text-head">
                                        {selectedOrder.user?.name || "N/A"}
                                    </p>
                                    <p className="text-text-muted">
                                        {selectedOrder.user?.email || "N/A"}
                                    </p>
                                    <p className="text-text-muted">
                                        {selectedOrder.user?.phone || selectedOrder.shippingAddress?.phone}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-peach bg-mist/50 p-3.5 space-y-1.5">
                                    <p className="font-bold text-text-head flex items-center gap-1.5 text-xs uppercase tracking-wider">
                                        <MapPin className="h-4 w-4 text-copper" />
                                        Shipping Address
                                    </p>
                                    <p className="text-text-head">
                                        {selectedOrder.shippingAddress?.address}
                                    </p>
                                    <p className="font-semibold text-text-head">
                                        {selectedOrder.shippingAddress?.city}
                                    </p>
                                    <p className="text-text-muted">
                                        Phone: {selectedOrder.shippingAddress?.phone}
                                    </p>
                                </div>
                            </div>

                            {/* Payment & Status Info */}
                            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-peach p-3.5 bg-bg-card">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-copper" />
                                    <span className="font-medium text-text-muted">Payment:</span>
                                    <span className="font-bold text-text-head">
                                        {selectedOrder.paymentMethod || "Cash On Delivery"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-text-muted">Status:</span>
                                    {renderStatusBadge(selectedOrder.status)}
                                </div>
                            </div>

                            {/* Products List */}
                            <div className="space-y-3">
                                <h4 className="font-bold text-text-head text-xs uppercase tracking-wider">
                                    Ordered Products ({selectedOrder.products?.length || 0})
                                </h4>
                                <div className="divide-y divide-peach/60 rounded-xl border border-peach overflow-hidden">
                                    {selectedOrder.products?.map((item, idx) => (
                                        <div
                                            key={item.productId || idx}
                                            className="flex items-center justify-between gap-3 p-3 bg-bg-card"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-peach bg-mist shrink-0">
                                                    <Image
                                                        src={item.image || "/placeholder.png"}
                                                        alt={item.name}
                                                        fill
                                                        sizes="48px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-text-head text-xs sm:text-sm truncate">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-[11px] text-text-muted">
                                                        {item.brand} • Qty:{" "}
                                                        <span className="font-bold text-text-head">
                                                            {item.quantity}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="font-black text-copper text-xs sm:text-sm">
                                                    ৳{item.subtotal?.toLocaleString()}
                                                </p>
                                                <p className="text-[10px] text-text-muted">
                                                    ৳{item.price?.toLocaleString()} each
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total Summary */}
                            <div className="flex items-center justify-between rounded-xl bg-peach/40 p-4 border border-peach">
                                <span className="text-sm font-bold text-text-head">Total Amount:</span>
                                <span className="text-lg font-black text-terracotta font-display">
                                    ৳{selectedOrder.totalPrice?.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                type="button"
                                className="rounded-xl bg-copper px-5 py-2 text-xs font-bold text-white hover:bg-terracotta transition-colors shadow-xs cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}