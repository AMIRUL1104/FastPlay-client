import Image from "next/image";
import { Users, Mail, Phone, Calendar, Shield, UserCheck } from "lucide-react";
import { getAllUsers } from "@/src/services/server/api";

export const dynamic = "force-dynamic";
export default async function ManageUsers() {
    const users = await getAllUsers();
    if (!users) {
        return <div className="flex flex-col items-center justify-center min-h-[300px] rounded-xl border border-peach bg-bg-card p-8 text-center shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-navy">
                <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-3 text-base font-bold text-text-head font-display">
                No users found.
            </h3>
            <p className="mt-1 text-xs text-text-muted">
                There are currently no registered users in the database.
            </p>
        </div>

    }

    return (
        <div className="w-full max-w-full overflow-hidden space-y-6 p-3 sm:p-6 lg:p-8">
            {/* Top Header Section */}
            <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-text-head font-display">
                    Manage Users
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-text-muted">
                    Overview of all registered users and administrators on the FastPlay platform.
                </p>
            </div>

            {/* Empty State */}
            {users.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] rounded-xl border border-peach bg-bg-card p-8 text-center shadow-xs">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-navy">
                        <Users className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 text-base font-bold text-text-head font-display">
                        No users found.
                    </h3>
                    <p className="mt-1 text-xs text-text-muted">
                        There are currently no registered users in the database.
                    </p>
                </div>
            ) : (
                /* Responsive Table Container */
                <div className="w-full overflow-hidden rounded-xl border border-peach bg-bg-card shadow-xs">
                    <div className="overflow-x-auto max-w-full">
                        <table className="w-full text-left text-xs sm:text-sm text-text-body border-collapse min-w-[650px]">
                            {/* Table Header */}
                            <thead className="sticky top-0 z-10 border-b border-peach bg-mist text-[11px] sm:text-xs font-bold uppercase tracking-wider text-text-head font-display">
                                <tr>
                                    <th scope="col" className="px-4 py-3.5">User</th>
                                    <th scope="col" className="px-4 py-3.5">Contact</th>
                                    <th scope="col" className="px-4 py-3.5">Role</th>
                                    <th scope="col" className="px-4 py-3.5">Member Since</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-peach/60 align-middle">
                                {users.map((user) => {
                                    const formattedDate = user.memberSince
                                        ? new Date(user.memberSince).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "N/A";

                                    const isAdmin = user.role?.toLowerCase() === "admin";

                                    return (
                                        <tr
                                            key={user._id || user.userId}
                                            className="transition-colors hover:bg-peach/10"
                                        >
                                            {/* User Info (Avatar + Name) */}
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-peach bg-mist shrink-0 flex items-center justify-center font-bold text-navy font-display text-sm">
                                                        {user.avatarUrl ? (
                                                            <Image
                                                                src={user.avatarUrl}
                                                                alt={user.fullName || "User Avatar"}
                                                                fill
                                                                sizes="40px"
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <span>
                                                                {user.fullName
                                                                    ? user.fullName.charAt(0).toUpperCase()
                                                                    : "U"}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-text-head text-xs sm:text-sm truncate">
                                                            {user.fullName || "Unnamed User"}
                                                        </p>
                                                        <p className="text-[10px] text-text-muted font-mono truncate">
                                                            ID: #{user.userId?.slice(-6).toUpperCase() || user._id?.slice(-6).toUpperCase()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Contact Info (Email + Phone) */}
                                            <td className="px-4 py-3.5">
                                                <div className="space-y-0.5">
                                                    <p className="text-xs font-semibold text-text-head flex items-center gap-1.5">
                                                        <Mail className="h-3.5 w-3.5 text-copper shrink-0" />
                                                        <span className="truncate max-w-[200px]">{user.email}</span>
                                                    </p>
                                                    {user.phoneNumber ? (
                                                        <p className="text-[11px] text-text-muted flex items-center gap-1.5 pl-5">
                                                            <Phone className="h-3 w-3 text-text-muted shrink-0" />
                                                            <span>{user.phoneNumber}</span>
                                                        </p>
                                                    ) : (
                                                        <p className="text-[11px] text-text-muted italic pl-5">
                                                            No phone number
                                                        </p>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Role Badge */}
                                            <td className="px-4 py-3.5">
                                                {isAdmin ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-peach px-2.5 py-0.5 text-[11px] font-bold text-terracotta border border-copper/20">
                                                        <Shield className="h-3 w-3 text-terracotta" />
                                                        Admin
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-semibold text-navy border border-peach/80">
                                                        <UserCheck className="h-3 w-3 text-navy" />
                                                        User
                                                    </span>
                                                )}
                                            </td>

                                            {/* Member Since Date */}
                                            <td className="px-4 py-3.5 text-xs text-text-muted whitespace-nowrap">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5 text-text-muted" />
                                                    <span>{formattedDate}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}