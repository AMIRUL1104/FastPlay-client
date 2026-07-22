"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    ShoppingBag,
    Loader2,
    CheckCircle2,
    XCircle,
    Eye,
    X,
    User,
    MapPin,
    Calendar,
    CreditCard,
    Hash,
} from "lucide-react";
import {
    getAllOrders,
} from "@/src/services/server/api";
import { Order } from "@/src/types/order.type";
import { cancelOrder, acceptOrder, rejectOrder, completeOrder, } from "@/src/services/server/action";

export const dynamic = "force-dynamic";

export default function ManageOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getAllOrders();
            setOrders(data || []);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    // Action Handlers with API Integration
    const handleAccept = async (orderId: string) => {
        try {
            setUpdatingId(orderId);
            await acceptOrder(orderId);
            await fetchOrders();
        } catch (error) {
            console.error("Failed to accept order:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleReject = async (orderId: string) => {
        try {
            setUpdatingId(orderId);
            await rejectOrder(orderId);
            await fetchOrders();
        } catch (error) {
            console.error("Failed to reject order:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleCancel = async (orderId: string) => {
        try {
            setUpdatingId(orderId);
            await cancelOrder(orderId);
            await fetchOrders();
        } catch (error) {
            console.error("Failed to cancel order:", error);
        } finally {
            setUpdatingId(null);
        }
    };
    const handleComplete = async (orderId: string) => {
        try {
            setUpdatingId(orderId);
            await completeOrder(orderId);
            await fetchOrders();
        } catch (error) {
            console.error("Failed to complete order:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    // Helper for Status Badge Rendering
    const renderStatusBadge = (status: Order["status"]) => {
        const formattedStatus = status.toLowerCase();

        switch (formattedStatus) {
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-peach px-2.5 py-0.5 text-[11px] font-bold text-terracotta border border-copper/20">
                        Pending
                    </span>
                );
            case "accepted":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                        Accepted
                    </span>
                );
            case "rejected":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-rose-700 border border-rose-200">
                        Rejected
                    </span>
                );
            case "cancelled":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-text-muted border border-slate-200">
                        Cancelled
                    </span>
                );
            case "completed":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200">
                        Completed
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-medium text-text-head">
                        {status}
                    </span>
                );
        }
    };

    // Helper for Action Buttons
    const renderActionButtons = (order: Order) => {
        const status = order.status.toLowerCase();
        const isUpdating = updatingId === order._id;

        if (isUpdating) {
            return (
                <div className="flex items-center justify-end gap-1">
                    <Loader2 className="h-4 w-4 animate-spin text-copper" />
                </div>
            );
        }

        if (status === "pending") {
            return (
                <div className="flex items-center justify-end gap-1.5">
                    <button
                        onClick={() => handleAccept(order._id)}
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700 shadow-xs cursor-pointer"
                        title="Accept Order"
                    >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Accept</span>
                    </button>
                    <button
                        onClick={() => handleReject(order._id)}
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-rose-700 shadow-xs cursor-pointer"
                        title="Reject Order"
                    >
                        <XCircle className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Reject</span>
                    </button>
                </div>
            );
        }

        if (status === "accepted") {
            return (
                <div className="flex items-center justify-end gap-1.5">
                    <button
                        onClick={() => handleComplete(order._id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
                    >
                        Complete
                    </button>

                    <button
                        onClick={() => handleCancel(order._id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold hover:bg-rose-50"
                    >
                        Cancel
                    </button>
                </div>
            );
        }

        return (
            <span className="text-xs text-text-muted italic">No actions</span>
        );
    };

    return (
        <div className="w-full max-w-full overflow-hidden space-y-6 p-3 sm:p-6 lg:p-8">
            {/* Top Header Section */}
            <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-text-head font-display">
                    Manage Orders
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-text-muted">
                    Track customer orders, manage statuses, and view purchase details.
                </p>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-75 rounded-xl border border-peach bg-bg-card p-8 shadow-xs">
                    <Loader2 className="h-8 w-8 animate-spin text-copper" />
                    <p className="mt-3 text-xs sm:text-sm font-medium text-text-muted">
                        Loading orders...
                    </p>
                </div>
            ) : orders.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center min-h-75 rounded-xl border border-peach bg-bg-card p-8 text-center shadow-xs">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-navy">
                        <ShoppingBag className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 text-base font-bold text-text-head font-display">
                        No orders found.
                    </h3>
                    <p className="mt-1 text-xs text-text-muted">
                        There are currently no customer orders placed in the system.
                    </p>
                </div>
            ) : (
                /* Clean Responsive Orders Table */
                <div className="w-full overflow-hidden rounded-xl border border-peach bg-bg-card shadow-xs">
                    <div className="overflow-x-auto max-w-full">
                        <table className="w-full text-left text-xs sm:text-sm text-text-body border-collapse min-w-150">
                            <thead className="sticky top-0 z-10 border-b border-peach bg-mist text-[11px] sm:text-xs font-bold uppercase tracking-wider text-text-head font-display">
                                <tr>
                                    <th scope="col" className="px-4 py-3.5">Customer</th>
                                    <th scope="col" className="px-4 py-3.5">Total Price</th>
                                    <th scope="col" className="px-4 py-3.5">Status</th>
                                    <th scope="col" className="px-4 py-3.5">Order Date</th>
                                    <th scope="col" className="px-4 py-3.5 text-center">Details</th>
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

                                    return (
                                        <tr
                                            key={order._id}
                                            className="transition-colors hover:bg-peach/10"
                                        >
                                            {/* Customer Info */}
                                            <td className="px-4 py-3.5">
                                                <div className="space-y-0.5">
                                                    <p className="font-bold text-text-head flex items-center gap-1.5">
                                                        <User className="h-3.5 w-3.5 text-text-muted shrink-0" />
                                                        {order.user?.name || "N/A"}
                                                    </p>
                                                    <p className="text-[11px] text-text-muted truncate max-w-35">
                                                        {order.user?.email || "N/A"}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Total Price */}
                                            <td className="px-4 py-3.5 font-black text-text-head text-sm font-display">
                                                ৳{order.totalPrice.toLocaleString()}
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3.5">
                                                {renderStatusBadge(order.status)}
                                            </td>

                                            {/* Order Date */}
                                            <td className="px-4 py-3.5 text-xs text-text-muted whitespace-nowrap">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5 text-text-muted" />
                                                    <span>{formattedDate}</span>
                                                </div>
                                            </td>

                                            {/* View Details Button */}
                                            <td className="px-4 py-3.5 text-center">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    type="button"
                                                    className="inline-flex items-center gap-1 rounded-lg bg-mist px-2.5 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-peach hover:text-terracotta border border-peach/80 cursor-pointer"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                    <span>View Details</span>
                                                </button>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3.5 text-right">
                                                {renderActionButtons(order)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

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
                                className="rounded-lg p-1.5 text-text-muted hover:bg-mist hover:text-text-head transition-colors"
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
                                    <p className="font-medium text-text-head">{selectedOrder.user?.name}</p>
                                    <p className="text-text-muted">{selectedOrder.user?.email}</p>
                                    <p className="text-text-muted">{selectedOrder.user?.phone}</p>
                                </div>

                                <div className="rounded-xl border border-peach bg-mist/50 p-3.5 space-y-1.5">
                                    <p className="font-bold text-text-head flex items-center gap-1.5 text-xs uppercase tracking-wider">
                                        <MapPin className="h-4 w-4 text-copper" />
                                        Shipping Address
                                    </p>
                                    <p className="text-text-head">{selectedOrder.shippingAddress?.address}</p>
                                    <p className="font-semibold text-text-head">{selectedOrder.shippingAddress?.city}</p>
                                    <p className="text-text-muted">Phone: {selectedOrder.shippingAddress?.phone}</p>
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
                                                        {item.brand} • Qty: <span className="font-bold text-text-head">{item.quantity}</span>
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
        </div>
    );
}