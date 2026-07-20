// src/components/navbar/MobileMenuDrawer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiLogOut, FiInfo, FiMail } from "react-icons/fi";
import { UserProfile } from "@/src/types/user.type";

interface MobileMenuDrawerProps {
    user: UserProfile | null; // এটিও নিশ্চিত করুন
}

export default function MobileMenuDrawer({ user }: MobileMenuDrawerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            {/* Hamburger Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex p-2 text-white hover:text-[var(--copper)] transition-colors cursor-pointer"
                aria-label="Toggle menu"
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Backdrop overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 top-[64px] z-40 bg-black/40 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Slide-out Menu */}
            <div
                className={`fixed top-[64px] right-0 bottom-0 z-50 w-64 transform bg-[var(--navy)] p-5 border-l border-white/10 transition-transform duration-300 ease-in-out shadow-xl ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <nav className="flex flex-col h-full justify-between pb-12">
                    <div className="flex flex-col gap-2">
                        {/* ইউজার সেশন থাকলে প্রোফাইল কার্ড */}
                        {user && (
                            <div className="mb-4 rounded-xl bg-white/5 p-3 border border-white/10">
                                <p className="text-xs font-bold uppercase tracking-wider text-[var(--copper)]">Logged In As</p>
                                <p className="mt-1 truncate text-sm font-bold text-white">{user.name || "User"}</p>
                                <p className="truncate text-xs text-gray-400">{user.email}</p>
                            </div>
                        )}

                        {/* সাধারণ রুটসমূহ */}
                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 transition-colors"
                        >
                            <FiInfo size={18} className="text-[var(--copper)]" />
                            About FastPlay
                        </Link>

                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 transition-colors"
                        >
                            <FiMail size={18} className="text-[var(--copper)]" />
                            Contact Us
                        </Link>
                    </div>

                    {/* ইউজার থাকলে লগআউট অপশন নিচে প্লেস হবে */}
                    {user && (
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                // এখানে আপনার Better Auth বা সেশন সাইনআউট লজিক কল করুন
                                // authClient.signOut();
                            }}
                            className="flex w-full items-center gap-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 px-3 py-2.5 text-sm font-semibold text-red-400 transition-colors cursor-pointer"
                        >
                            <FiLogOut size={18} />
                            Log Out
                        </button>
                    )}
                </nav>
            </div>
        </div>
    );
}