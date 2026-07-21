// app/dashboard/admin/page.tsx
import Link from "next/link";
import {
    Package,
    ShoppingBag,
    Clock,
    CheckCircle2,
    XCircle,
    AlertOctagon,
    Users,
    PlusCircle,
    FolderKanban,
    UserCog,
    ArrowUpRight,
} from "lucide-react";
import { getAdminDashboard } from "@/src/services/server/api";

interface AdminDashboardData {
    totalProducts: number;
    totalOrders: number;
    pendingOrders: number;
    acceptedOrders: number;
    rejectedOrders: number;
    cancelledOrders: number;
    totalUsers: number;
}

export default async function AdminDashboardOverviewPage() {
    const data: AdminDashboardData = (await getAdminDashboard()) || {
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        acceptedOrders: 0,
        rejectedOrders: 0,
        cancelledOrders: 0,
        totalUsers: 0,
    };

    const statCards = [
        {
            title: "Total Products",
            value: data.totalProducts,
            icon: <Package className="h-5 w-5 text-navy" />,
            badgeBg: "bg-mist",
        },
        {
            title: "Total Orders",
            value: data.totalOrders,
            icon: <ShoppingBag className="h-5 w-5 text-navy" />,
            badgeBg: "bg-mist",
        },
        {
            title: "Pending Orders",
            value: data.pendingOrders,
            icon: <Clock className="h-5 w-5 text-terracotta" />,
            badgeBg: "bg-peach",
        },
        {
            title: "Accepted Orders",
            value: data.acceptedOrders,
            icon: <CheckCircle2 className="h-5 w-5 text-emerald-700" />,
            badgeBg: "bg-emerald-50",
        },
        {
            title: "Rejected Orders",
            value: data.rejectedOrders,
            icon: <XCircle className="h-5 w-5 text-rose-700" />,
            badgeBg: "bg-rose-50",
        },
        {
            title: "Cancelled Orders",
            value: data.cancelledOrders,
            icon: <AlertOctagon className="h-5 w-5 text-slate-muted" />,
            badgeBg: "bg-slate-100",
        },
        {
            title: "Total Users",
            value: data.totalUsers,
            icon: <Users className="h-5 w-5 text-navy" />,
            badgeBg: "bg-mist",
        },
    ];

    return (
        <div className="w-full max-w-full overflow-hidden space-y-6 sm:space-y-8 p-3 sm:p-6 lg:p-8">
            {/* 1. Page Title & Welcome Subtitle */}
            <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-text-head font-display">
                    Admin Dashboard
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-text-muted">
                    Welcome back! Here is an overview of your FastPlay platform performance.
                </p>
            </div>

            {/* 2. Statistics Cards Grid */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                {statCards.map((card, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-peach bg-bg-card p-4 sm:p-5 shadow-xs transition-all hover:border-copper/60 hover:shadow-md"
                    >
                        <div className="space-y-1 min-w-0 pr-2">
                            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-text-muted truncate">
                                {card.title}
                            </p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-text-head truncate font-display">
                                {card.value.toLocaleString()}
                            </p>
                        </div>
                        <div
                            className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl ${card.badgeBg}`}
                        >
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Quick Actions Section */}
            <div className="space-y-3 sm:space-y-4">
                <h2 className="text-base sm:text-lg font-bold tracking-wide text-text-head font-display">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    <Link
                        href="/dashboard/admin/products/add"
                        className="group flex items-center justify-between rounded-xl border border-peach bg-bg-card p-3.5 sm:p-4 font-semibold text-text-head transition-all hover:border-copper hover:bg-peach/40 hover:text-accent-hover shadow-xs"
                    >
                        <span className="flex items-center gap-2.5 text-xs sm:text-sm truncate">
                            <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0 group-hover:text-accent-hover" />
                            Add Product
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-text-muted shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-hover" />
                    </Link>

                    <Link
                        href="/dashboard/admin/products"
                        className="group flex items-center justify-between rounded-xl border border-peach bg-bg-card p-3.5 sm:p-4 font-semibold text-text-head transition-all hover:border-copper hover:bg-peach/40 hover:text-accent-hover shadow-xs"
                    >
                        <span className="flex items-center gap-2.5 text-xs sm:text-sm truncate">
                            <FolderKanban className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0 group-hover:text-accent-hover" />
                            Manage Products
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-text-muted shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-hover" />
                    </Link>

                    <Link
                        href="/dashboard/admin/orders"
                        className="group flex items-center justify-between rounded-xl border border-peach bg-bg-card p-3.5 sm:p-4 font-semibold text-text-head transition-all hover:border-copper hover:bg-peach/40 hover:text-accent-hover shadow-xs"
                    >
                        <span className="flex items-center gap-2.5 text-xs sm:text-sm truncate">
                            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0 group-hover:text-accent-hover" />
                            Manage Orders
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-text-muted shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-hover" />
                    </Link>

                    <Link
                        href="/dashboard/admin/users"
                        className="group flex items-center justify-between rounded-xl border border-peach bg-bg-card p-3.5 sm:p-4 font-semibold text-text-head transition-all hover:border-copper hover:bg-peach/40 hover:text-accent-hover shadow-xs"
                    >
                        <span className="flex items-center gap-2.5 text-xs sm:text-sm truncate">
                            <UserCog className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0 group-hover:text-accent-hover" />
                            Manage Users
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-text-muted shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-hover" />
                    </Link>
                </div>
            </div>
        </div>
    );
}