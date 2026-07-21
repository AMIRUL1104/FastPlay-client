// src/components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";
import SocialAuth from "../signin/SocialAuth";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/src/lib/auth-client";
import { createUserProfile } from "@/src/services/server/action";


const registerSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    const onSubmit = async (userData: RegisterFormValues) => {
        setIsLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name: userData.fullName,
                email: userData.email,
                password: userData.password,
            });

            if (error) {
                console.error("[RegisterForm] Better Auth error:", error.message);
                toast.error(error.message || "Something went wrong during registration.");
                setIsLoading(false);
                return;
            }

            if (data?.user) {
                await createUserProfile();
                toast.success("Welcome to FastPlay! Your registration is complete.");
                setIsLoading(false);
                router.push(redirectUrl);
                router.refresh();
            }
        } catch (err) {
            console.error("[RegisterForm] Unexpected network error:", err);
            toast.error("Network error. Please check your connection and try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-5">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                {/* Full Name Field */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            id="fullName"
                            type="text"
                            placeholder="Amirul Islam"
                            {...register("fullName")}
                            className={`w-full bg-white border ${errors.fullName ? "border-red-500 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#0284C7]"
                                } rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all`}
                        />
                    </div>
                    {errors.fullName && (
                        <p className="text-xs font-medium text-red-500 mt-0.5">{errors.fullName.message}</p>
                    )}
                </div>

                {/* Email Address Field */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email")}
                            className={`w-full bg-white border ${errors.email ? "border-red-500 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#0284C7]"
                                } rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all`}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs font-medium text-red-500 mt-0.5">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("password")}
                            className={`w-full bg-white border ${errors.password ? "border-red-500 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#0284C7]"
                                } rounded-xl pl-10 pr-10 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-md cursor-pointer"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs font-medium text-red-500 mt-0.5">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="confirmPassword" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("confirmPassword")}
                            className={`w-full bg-white border ${errors.confirmPassword ? "border-red-500 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#0284C7]"
                                } rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all`}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-xs font-medium text-red-500 mt-0.5">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="flex flex-col gap-1 mt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer text-sm text-gray-600 select-none">
                        <input
                            type="checkbox"
                            {...register("terms")}
                            className="w-4 h-4 rounded border-[#E2E8F0] text-[#0284C7] focus:ring-[#0284C7] mt-0.5"
                        />
                        <span className="text-xs sm:text-sm leading-tight">
                            I agree to the{" "}
                            <span className="text-[#0284C7] font-semibold hover:underline">Terms of Service</span>{" "}
                            and{" "}
                            <span className="text-[#0284C7] font-semibold hover:underline">Privacy Policy</span>.
                        </span>
                    </label>
                    {errors.terms && (
                        <p className="text-xs font-medium text-red-500 mt-0.5">{errors.terms.message}</p>
                    )}
                </div>

                {/* Submit Register Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center bg-[#0284C7] hover:bg-[#0284C7]/90 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2 focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <span>Create Account</span>
                    )}
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-1">
                <div className="flex-1 border-t border-[#E2E8F0]"></div>
                <span className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">OR</span>
                <div className="flex-1 border-t border-[#E2E8F0]"></div>
            </div>

            {/* Google Provider Button */}
            <SocialAuth />
        </div>
    );
}