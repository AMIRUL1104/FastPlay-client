"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FiMenu,
    FiX,
    FiLogOut,
    FiInfo,
    FiMail,
    FiUser,
    FiSliders,
    FiShoppingBag,
    FiLogIn,
} from "react-icons/fi";
import { UserProfile } from "@/src/types/user.type";
import { authClient } from "@/src/lib/auth-client";

interface MobileMenuDrawerProps {
    user: UserProfile | null;
}

export default function MobileMenuDrawer({ user }: MobileMenuDrawerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            {/* Hamburger Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex cursor-pointer p-2 text-white transition-colors hover:text-[var(--copper)]"
                aria-label="Toggle menu"
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Backdrop overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 top-[64px] z-40 bg-black/40 backdrop-blur-xs"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Slide-out Menu */}
            <div
                className={`fixed bottom-0 right-0 top-[64px] z-50 w-64 transform border-l border-white/10 bg-[var(--navy)] p-5 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <nav className="flex h-full flex-col justify-between pb-12">
                    <div className="flex flex-col gap-2">
                        {/* ১. ইউজার সেশন থাকলে প্রোফাইল কারেসপন্ডিং কার্ড ও কুইক লিঙ্কস */}
                        {user ? (
                            <>
                                <div className="mb-2 rounded-xl border border-white/10 bg-white/5 p-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--copper)]">
                                        Logged In As
                                    </p>
                                    <p className="mt-0.5 truncate text-sm font-bold text-white">
                                        {user.name || "User"}
                                    </p>
                                    <p className="truncate text-xs text-gray-400">{user.email}</p>
                                </div>

                                {/* Profile Link */}
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
                                >
                                    <FiUser size={18} className="text-[var(--copper)]" />
                                    My Profile
                                </Link>

                                {/* Role Based Link: Admin -> Dashboard, User -> Orders */}
                                {user.role === "admin" ? (
                                    <Link
                                        href="/dashboard/admin"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
                                    >
                                        <FiSliders size={18} className="text-[var(--copper)]" />
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href="/dashboard/user/orders"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
                                    >
                                        <FiShoppingBag size={18} className="text-[var(--copper)]" />
                                        My Orders
                                    </Link>
                                )}
                            </>
                        ) : (
                            /* ২. ইউজার লগইন না থাকলে Login Button দেখাবে */
                            <Link
                                href="/auth/signin"
                                onClick={() => setIsOpen(false)}
                                className="mb-2 flex items-center justify-center gap-2 rounded-xl bg-copper px-4 py-2.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-terracotta"
                            >
                                <FiLogIn size={18} />
                                <span>Login</span>
                            </Link>
                        )}

                        <div className="my-1 border-t border-white/10" />

                        {/* সাধারণ রুটসমূহ */}
                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
                        >
                            <FiInfo size={18} className="text-[var(--copper)]" />
                            About FastPlay
                        </Link>

                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
                        >
                            <FiMail size={18} className="text-[var(--copper)]" />
                            Contact Us
                        </Link>
                    </div>

                    {/* ইউজার থাকলে একদম নিচে লগআউট বাটন */}
                    {user && (
                        <button
                            type="button"
                            onClick={async () => {
                                setIsOpen(false);
                                await authClient.signOut();
                            }}
                            className="flex w-full cursor-pointer items-center gap-3 rounded-lg bg-red-500/10 px-3 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                        >
                            <FiLogOut size={18} />
                            <span>Log Out</span>
                        </button>
                    )}
                </nav>
            </div>
        </div>
    );
}