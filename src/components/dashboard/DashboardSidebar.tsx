"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_SIDEBAR, USER_SIDEBAR } from "./dashboard";


type UserRole = "user" | "admin";

interface DashboardSidebarProps {
    role: UserRole;
}

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
    const pathname = usePathname();

    const menus = role === "admin"
        ? ADMIN_SIDEBAR
        : USER_SIDEBAR;

    return (
        <aside className="flex h-screen w-72 flex-col border-r bg-white">
            <div className="border-b p-6">
                <h2 className="text-2xl font-bold">
                    FastPlay
                </h2>
            </div>

            <nav className="flex flex-1 flex-col gap-2 p-4">
                {menus.map((item) => {
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`rounded-lg px-4 py-3 transition ${active
                                ? "bg-black text-white"
                                : "hover:bg-gray-100"
                                }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};


export default DashboardSidebar;