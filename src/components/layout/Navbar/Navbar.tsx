// src/components/navbar/Navbar.tsx
import Link from "next/link";
import { FiLogOut, FiShoppingBag, FiShoppingCart, FiSliders, FiUser, FiUsers } from "react-icons/fi";
import { getUserSession } from "@/src/services/core/session";
import MobileBottomNav from "./MobileBottomNav";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { UserProfile } from "@/src/types/user.type";
import { FileSliders } from "lucide-react";


const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default async function Navbar() {


    const session = (await getUserSession()) as UserProfile | null;
    // console.log("user session : ", session);
    const currentUser = session ? session : null; // টাইপ: UserProfile | null
    // console.log("current user : ", currentUser);

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-navy shadow-md h-16 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-black tracking-wide text-white select-none focus-visible:outline-2 focus-visible:outline-copper rounded font-display"
                    >
                        Fast<span className="text-copper">Play</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-semibold text-white/85 transition-colors duration-200 hover:text-copper"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>


                    {/* Desktop Right Actions */}
                    {/* Desktop Right Actions */}
                    <div className="hidden items-center gap-5 md:flex">
                        <Link
                            href="/cart"
                            className="relative rounded p-1 text-white transition-colors duration-200 hover:text-copper focus-visible:outline-2 focus-visible:outline-copper"
                            aria-label="View Cart"
                        >
                            <FiShoppingCart size={22} />
                        </Link>

                        {currentUser ? (
                            <>
                                {/* Role Based Link */}
                                {currentUser.role === "admin" ? (
                                    <Link
                                        href="/dashboard"
                                        className="flex flex-col items-center gap-1 p-2 text-xs font-medium text-white/80 transition-colors hover:text-copper"
                                    >
                                        <FiSliders size={20} />
                                        <span>Dashboard</span>
                                    </Link>
                                ) : (
                                    <Link
                                        href="/dashboard/user/orders"
                                        className="flex flex-col items-center gap-1 p-2 text-xs font-medium text-white/80 transition-colors hover:text-copper"
                                    >
                                        <FiShoppingBag size={20} />
                                        <span>Orders</span>
                                    </Link>
                                )}

                                {/* Profile Dropdown */}
                                <div className="group relative">
                                    <button
                                        type="button"
                                        className="flex cursor-pointer items-center gap-2 rounded-xl bg-copper px-4 py-2 text-sm font-bold text-white shadow-xs transition-all hover:bg-terracotta focus-visible:outline-2 focus-visible:outline-copper"
                                    >
                                        <FiUser size={18} />
                                        <span>{currentUser.name || "User"}</span>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="invisible absolute right-0 z-50 mt-2 w-48 origin-top-right translate-y-2 rounded-xl border border-peach bg-bg-card p-2 shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-text-head transition-colors hover:bg-mist hover:text-copper"
                                        >
                                            <FiUser size={16} />
                                            <span>My Profile</span>
                                        </Link>

                                        <button
                                            type="button"
                                            // onClick={() => console.log("Logout Clicked")}
                                            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold text-rose-600 transition-colors hover:bg-rose-500/10"
                                        >
                                            <FiLogOut size={16} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/auth/signin"
                                className="rounded-xl bg-copper px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-terracotta focus-visible:outline-2 focus-visible:outline-copper"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Right Action Layout (Cart & Hamburger Toggle) */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Link
                            href="/cart"
                            className="p-2 text-white hover:text-copper transition-colors"
                            aria-label="View Cart"
                        >
                            <FiShoppingCart size={22} />
                        </Link>

                        {/* মোবাইল হামবার্গার ড্রয়ার - সার্ভার সেশন পাস করা হয়েছে */}
                        <MobileMenuDrawer user={currentUser} />
                    </div>
                </div>
            </header>

            {/* মোবাইল বটম ফিক্সড ন্যাভিগেশন বার */}
            <MobileBottomNav user={currentUser} />
        </>
    );
}