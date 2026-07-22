"use client";

import { useState } from "react";
import Image from "next/image";
import {
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCalendar,
    FiShield,
    FiEdit2,
    FiCheck,
    FiX,
    FiLoader,
    FiImage
} from "react-icons/fi";
import { UserProfiledetails, UpdateProfilePayload } from "@/src/types/user.type";
import { updateUserProfile } from "@/src/services/server/action";
// import { router } from "better-auth/api";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
    user: UserProfiledetails;
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const router = useRouter();
    // Database structure অনুযায়ী formData স্টেট
    const [formData, setFormData] = useState<UpdateProfilePayload>({
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        area: user.area || "",
        district: user.district || "",
        avatarUrl: user.avatarUrl || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCancel = () => {
        setFormData({
            fullName: user.fullName || "",
            phoneNumber: user.phoneNumber || "",
            area: user.area || "",
            district: user.district || "",
            avatarUrl: user.avatarUrl || "",
        });
        setIsEditing(false);
        setMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await updateUserProfile(formData);
            if (res?.success) {
                setMessage({ type: "success", text: "Profile updated successfully!" });
                setIsEditing(false);
                router.refresh();
            } else {
                setMessage({ type: "error", text: res?.message || "Failed to update profile." });
            }
        } catch {
            setMessage({ type: "error", text: "Something went wrong. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const formattedDate = user.memberSince
        ? new Date(user.memberSince).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "N/A";

    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            {/* Alert / Notification */}
            {message && (
                <div
                    className={`flex items-center justify-between rounded-xl p-4 text-sm font-medium transition-all ${message.type === "success"
                        ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border border-rose-500/20 bg-rose-500/10 text-rose-400"
                        }`}
                >
                    <span>{message.text}</span>
                    <button type="button" onClick={() => setMessage(null)} className="cursor-pointer">
                        <FiX size={16} />
                    </button>
                </div>
            )}

            {/* Profile Header Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy p-6 shadow-xl">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                    {/* Avatar Preview */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-copper bg-white/5">
                        {formData.avatarUrl || user.avatarUrl ? (
                            <Image
                                src={isEditing ? formData.avatarUrl || "" : user.avatarUrl || ""}
                                alt={user.fullName || "User Avatar"}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-copper">
                                {user.fullName ? user.fullName.charAt(0).toUpperCase() : <FiUser />}
                            </div>
                        )}
                    </div>

                    {/* Header Info */}
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    {user.fullName || "User Profile"}
                                </h1>
                                <p className="mt-0.5 flex items-center justify-center gap-1.5 text-sm text-gray-400 sm:justify-start">
                                    <FiMail size={14} className="text-copper" />
                                    {user.email}
                                </p>
                            </div>

                            {!isEditing && (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="mt-3 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-copper px-4 py-2 text-sm font-bold text-white transition-all hover:bg-terracotta sm:mt-0"
                                >
                                    <FiEdit2 size={16} />
                                    <span>Edit Profile</span>
                                </button>
                            )}
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 sm:justify-start">
                            {user.role && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300">
                                    <FiShield size={12} className="text-copper" />
                                    Role: <span className="capitalize text-white">{user.role}</span>
                                </span>
                            )}

                            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300">
                                <FiCalendar size={12} className="text-copper" />
                                Joined: <span className="text-white">{formattedDate}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Form */}
            <div className="rounded-2xl border border-white/10 bg-navy p-6 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                            <FiUser className="text-copper" />
                            Personal Details
                        </h2>
                        {isEditing && (
                            <span className="rounded-full bg-copper/10 px-2.5 py-1 text-xs font-semibold text-copper">
                                Editing Mode
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Full Name
                            </label>
                            {isEditing ? (
                                <div className="relative">
                                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName || ""}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white focus:border-copper focus:outline-none"
                                        placeholder="Enter full name"
                                    />
                                </div>
                            ) : (
                                <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white">
                                    {user.fullName || "Not provided"}
                                </div>
                            )}
                        </div>

                        {/* Email (Read Only) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Email Address <span className="text-gray-500">(Read-only)</span>
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full cursor-not-allowed rounded-xl border border-white/5 bg-white/[0.02] py-2.5 pl-10 pr-4 text-sm text-gray-400 opacity-80"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Phone Number
                            </label>
                            {isEditing ? (
                                <div className="relative">
                                    <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber || ""}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white focus:border-copper focus:outline-none"
                                        placeholder="e.g. +8801700000000"
                                    />
                                </div>
                            ) : (
                                <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white">
                                    {user.phoneNumber || "Not provided"}
                                </div>
                            )}
                        </div>

                        {/* Area */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Area / Thana
                            </label>
                            {isEditing ? (
                                <div className="relative">
                                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="area"
                                        value={formData.area || ""}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white focus:border-copper focus:outline-none"
                                        placeholder="e.g. Uttara"
                                    />
                                </div>
                            ) : (
                                <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white">
                                    {user.area || "Not provided"}
                                </div>
                            )}
                        </div>

                        {/* District */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                District
                            </label>
                            {isEditing ? (
                                <div className="relative">
                                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district || ""}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white focus:border-copper focus:outline-none"
                                        placeholder="e.g. Dhaka"
                                    />
                                </div>
                            ) : (
                                <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white">
                                    {user.district || "Not provided"}
                                </div>
                            )}
                        </div>

                        {/* Avatar Image URL Field */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Profile Image URL
                            </label>
                            {isEditing ? (
                                <div className="relative">
                                    <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="url"
                                        name="avatarUrl"
                                        value={formData.avatarUrl || ""}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white focus:border-copper focus:outline-none"
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>
                            ) : (
                                <div className="truncate rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white">
                                    {user.avatarUrl || "Not provided"}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={loading}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10 disabled:opacity-50"
                            >
                                <FiX size={16} />
                                <span>Cancel</span>
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-copper px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-terracotta disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <FiLoader className="animate-spin" size={16} />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiCheck size={16} />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}