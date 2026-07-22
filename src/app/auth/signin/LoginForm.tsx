// src/components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import SocialAuth from "./SocialAuth";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/src/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
// import { createUserProfile } from "@/src/services/server/action";


// Zod Validation Schema Definition
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (userData: LoginFormValues) => {
    setIsLoading(true);

    try {
      // Better Auth ক্লায়েন্ট কল
      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
        rememberMe: userData.rememberMe,
      });

      if (error) {
        console.error("[LoginForm] Better Auth error:", error.message);
        toast.error(error.message || "Something went wrong during sign in.");
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        // await createUserProfile();
        toast.success("Welcome to FastPlay Sports Store!");
        setIsLoading(false);
        router.push(searchParams.get("redirect") || "/");
        router.refresh();
      }
    } catch (err) {
      toast.error("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* Email Input Field */}
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

        {/* Password Input Field */}
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

        {/* Remember Me & Forgot Password Links */}
        <div className="flex items-center justify-between text-xs sm:text-sm mt-1">
          <label className="flex items-center gap-2 cursor-pointer text-gray-600 select-none">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 rounded border-[#E2E8F0] text-[#0284C7] focus:ring-[#0284C7]"
            />
            <span>Remember Me</span>
          </label>
          <Link
            href="/forgot-password"
            className="font-semibold text-[#0284C7] hover:text-[#0284C7]/80 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center bg-[#0284C7] hover:bg-[#0284C7]/90 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2 focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-1">
        <div className="flex-1 border-t border-[#E2E8F0]"></div>
        <span className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">OR</span>
        <div className="flex-1 border-t border-[#E2E8F0]"></div>
      </div>

      {/* Social Google Provider Button */}
      <SocialAuth />
    </div>
  );
}