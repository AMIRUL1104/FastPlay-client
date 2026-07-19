// src/app/(auth)/register/page.tsx
import { Dumbbell } from "lucide-react";
import Link from "next/link";

import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] px-4 py-12">
            <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center">

                {/* লোগো ও ব্র্যান্ড এরিয়া */}
                <div className="mb-6 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center">
                        <Dumbbell className="w-6 h-6" />
                    </div>
                    <Link
                        href="/"
                        className="text-xl font-black text-gray-900 tracking-tight"
                    >
                        Fast<span className="text-[#0284C7]">Play</span>
                    </Link>
                </div>

                {/* হেডিং টেক্সট */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                        Join FastPlay
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Create an account to discover and purchase premium sports equipment.
                    </p>
                </div>

                {/* ✅ পিউর Tailwind CSS লোডার স্পিনার সহ সাসপেন্স */}
                <Suspense
                    fallback={
                        <div className="flex justify-center py-6">
                            <svg
                                className="animate-spin h-6 w-6 text-[#0284C7]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        </div>
                    }
                >
                    <RegisterForm />
                </Suspense>

                {/* লগইন পেজে ব্যাক করার লিঙ্ক */}
                <p className="text-sm text-gray-500 text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/auth/signin"
                        className="font-bold text-[#0284C7] hover:text-[#0284C7]/80 transition-colors focus-visible:outline-2 focus-visible:outline-[#0284C7] rounded"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
}