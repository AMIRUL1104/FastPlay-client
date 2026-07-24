// src/components/navbar/MobileBottomNav.tsx
"use client";

import { UserProfile } from "@/src/types/user.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiPackage, FiCpu, FiUser, FiSliders } from "react-icons/fi";


interface MobileBottomNavProps {
    // এখানে টাইপ পরিবর্তন করে UserProfile | null করে দেওয়া হলো
    user: UserProfile | null;
}

export default function MobileBottomNav({ user }: MobileBottomNavProps) {
    const pathname = usePathname();

    const baseLinks = [
        { label: "Home", href: "/", icon: FiHome },
        { label: "Products", href: "/products", icon: FiPackage },
        { label: "Profile", href: "/profile", icon: FiUser },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[var(--navy)] px-4 py-2 md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
            <nav className="flex items-center justify-around">
                {baseLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex flex-col items-center gap-1 p-2 text-xs font-medium transition-colors"
                            style={{ color: isActive ? "var(--copper)" : "rgba(255,255,255,0.7)" }}
                        >
                            <Icon size={20} />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}

                {/* এখন user ডাইরেক্ট প্রোফাইল অবজেক্ট হিসেবে চেক হবে */}
                {user ? (
                    user.role === "admin" ? (
                        <Link
                            href="/dashboard/admin"
                            className="flex flex-col items-center gap-1 p-2 text-xs font-medium transition-colors"
                            style={{ color: pathname.startsWith("/dashboard") ? "var(--copper)" : "rgba(255,255,255,0.7)" }}
                        >
                            <FiSliders size={20} />
                            <span>Dashboard</span>
                        </Link>
                    ) : (
                        <Link
                            href="/orders"
                            className="flex flex-col items-center gap-1 p-2 text-xs font-medium transition-colors"
                            style={{ color: pathname.startsWith("/dashboard") ? "var(--copper)" : "rgba(255,255,255,0.7)" }}
                        >
                            <FiSliders size={20} />
                            <span>Orders</span>
                        </Link>
                    )
                ) : (
                    <Link
                        href="/auth/signin"
                        className="flex flex-col items-center gap-1 p-2 text-xs font-medium transition-colors"
                        style={{ color: pathname === "/login" ? "var(--copper)" : "rgba(255,255,255,0.7)" }}
                    >
                        <FiUser size={20} />
                        <span>Sign In</span>
                    </Link>
                )}
            </nav>
        </div>
    );
}