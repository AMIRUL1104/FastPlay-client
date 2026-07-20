// src/components/navbar/Navbar.tsx
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { getUserSession } from "@/src/services/core/session";
import MobileBottomNav from "./MobileBottomNav";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { AuthUser, UserProfile } from "@/src/types/user.type";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default async function Navbar() {

    const session = (await getUserSession()) as AuthUser | null;
    const currentUser = session ? session.user : null; // টাইপ: UserProfile | null

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
                    <div className="hidden items-center gap-5 md:flex">
                        <Link
                            href="/cart"
                            className="relative p-1 text-white transition-colors duration-200 hover:text-copper focus-visible:outline-2 focus-visible:outline-copper rounded"
                            aria-label="View Cart"
                        >
                            <FiShoppingCart size={22} />
                        </Link>

                        {currentUser ? (
                            <>
                                <Link
                                    href={`/dashboard/${currentUser.role}`}
                                    className="rounded-xl bg-copper px-4 py-2 text-sm font-bold text-white transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-copper hover:bg-terracotta"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/profile"
                                    className="rounded-xl bg-copper px-4 py-2 text-sm font-bold text-white transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-copper hover:bg-terracotta"
                                >
                                    profile


                                </Link>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="rounded-xl bg-copper px-4 py-2 text-sm font-bold text-white transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-copper hover:bg-terracotta"
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