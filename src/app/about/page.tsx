"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FiTruck,
    FiShield,
    FiStar,
    FiDollarSign,
    FiSmile,
    FiShoppingBag,
    FiUsers,
    FiPackage,
    FiAward,
    FiChevronDown,
    FiArrowRight,
} from "react-icons/fi";
import { FaFutbol } from "react-icons/fa";
import { GiCricketBat, GiBiceps, GiTennisRacket } from "react-icons/gi";

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
    {
        icon: FaFutbol,
        title: "Football",
        description: "Boots, balls, jerseys, shin guards and everything you need on the pitch.",
    },
    {
        icon: GiCricketBat,
        title: "Cricket",
        description: "Bats, pads, gloves, helmets and premium cricket accessories.",
    },
    {
        icon: GiTennisRacket,
        title: "Badminton",
        description: "Rackets, shuttlecocks, bags and court gear for every level.",
    },
    {
        icon: GiBiceps,
        title: "Gym Equipment",
        description: "Dumbbells, resistance bands, benches and full home-gym setups.",
    },
];

const features = [
    { icon: FiStar, title: "Premium Quality", description: "Only verified, authentic products from trusted brands." },
    { icon: FiDollarSign, title: "Affordable Prices", description: "Competitive pricing so you get the best value for your money." },
    { icon: FiTruck, title: "Fast Delivery", description: "Quick dispatch and reliable delivery across Bangladesh." },
    { icon: FiShoppingBag, title: "Cash On Delivery", description: "Pay when your order arrives — no card required." },
    { icon: FiShield, title: "Trusted Service", description: "Thousands of happy customers and growing every day." },
    { icon: FiSmile, title: "Easy Shopping", description: "Simple browsing, smart search, and a smooth checkout experience." },
];

const stats = [
    { icon: FiPackage, value: "500+", label: "Products" },
    { icon: FiUsers, value: "10,000+", label: "Happy Customers" },
    { icon: FiTruck, value: "25,000+", label: "Orders Delivered" },
    { icon: FiAward, value: "4", label: "Sport Categories" },
];

const faqs = [
    {
        question: "How long does delivery take?",
        answer:
            "Delivery typically takes 2–5 business days depending on your location within Bangladesh.",
    },
    {
        question: "Do you offer Cash on Delivery?",
        answer:
            "Yes. We currently support Cash on Delivery only. You pay when the order arrives at your door.",
    },
    {
        question: "Are all products authentic?",
        answer:
            "Absolutely. FastPlay sources only from verified suppliers and authorised brand distributors — no counterfeits.",
    },
    {
        question: "What is your return policy?",
        answer:
            "If you receive a damaged or incorrect item, contact us within 48 hours of delivery and we will arrange a replacement at no cost.",
    },
    {
        question: "How do I place an order?",
        answer:
            "Create an account, browse our products, add items to your cart, fill in your shipping details, and confirm your order. It only takes a few minutes.",
    },
    {
        question: "Can I track my order?",
        answer:
            "Yes. After placing an order you can view its status — Pending, Accepted, or Rejected — from your dashboard under My Orders.",
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
    title,
    subtitle,
    light = false,
}: {
    title: string;
    subtitle?: string;
    light?: boolean;
}) {
    return (
        <div className="text-center mb-12">
            <h2
                className={`text-3xl sm:text-4xl font-bold mb-3 ${light ? "text-white" : "text-navy"}`}
                style={{ fontFamily: "var(--font-display)" }}
            >
                {title}
            </h2>
            {subtitle && (
                <p className={`text-sm sm:text-base max-w-md mx-auto ${light ? "text-white/60" : "text-slate"}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-slate/15 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-mist transition-colors duration-200"
            >
                <span className="text-sm sm:text-base font-medium text-navy pr-4">
                    {question}
                </span>
                <FiChevronDown
                    size={18}
                    className="shrink-0 text-copper transition-transform duration-200"
                    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                />
            </button>
            {open && (
                <div className="px-5 py-4 bg-white border-t border-slate/10">
                    <p className="text-sm text-slate leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
    return (
        <div className="w-full flex flex-col">

            {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
            <section className="bg-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-8 relative overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle at 15% 50%, rgba(217,155,127,0.08), transparent 55%), radial-gradient(circle at 85% 20%, rgba(165,111,99,0.07), transparent 50%)",
                    }}
                />
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-copper text-copper">
                        About FastPlay
                    </span>
                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Your Game.{" "}
                        <span className="text-copper">Our Gear.</span>
                    </h1>
                    <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        FastPlay is Bangladesh&apos;s modern sports equipment store — built to help
                        athletes and enthusiasts find the right gear, fast.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-sm font-semibold text-white bg-copper hover:bg-terracotta transition-colors duration-200"
                    >
                        Shop Products <FiArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* ── 2. Our Story ────────────────────────────────────────────────────── */}
            <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text */}
                    <div>
                        <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-copper">
                            Our Story
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl font-bold text-navy mb-6"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Why FastPlay Exists
                        </h2>
                        <div className="flex flex-col gap-4 text-slate text-sm sm:text-base leading-relaxed">
                            <p>
                                FastPlay was created with one simple idea — buying quality sports
                                equipment in Bangladesh should be fast, reliable, and hassle-free.
                            </p>
                            <p>
                                We saw that athletes and sports enthusiasts were wasting time
                                hunting across multiple stores for the right gear. FastPlay brings
                                everything together in one clean, easy-to-use platform.
                            </p>
                            <p>
                                From football boots to gym dumbbells, every product in our store
                                is hand-picked for quality and value. Our goal is to help you spend
                                less time shopping and more time playing.
                            </p>
                        </div>
                    </div>

                    {/* Visual card */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: "2024", label: "Founded" },
                            { value: "4", label: "Sport Categories" },
                            { value: "500+", label: "Products" },
                            { value: "COD", label: "Payment" },
                        ].map(({ value, label }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center justify-center text-center p-6 rounded-xl border border-slate/15 bg-white hover:border-copper hover:shadow-md transition-all duration-200"
                            >
                                <span
                                    className="text-3xl font-bold text-copper mb-1"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {value}
                                </span>
                                <span className="text-xs text-slate-muted font-medium uppercase tracking-wide">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. What We Sell ─────────────────────────────────────────────────── */}
            <section className="bg-mist px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        title="What We Sell"
                        subtitle="Four sport categories, hundreds of products — all in one store"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map(({ icon: Icon, title, description }) => (
                            <Link
                                key={title}
                                href={`/products?category=${title.toLowerCase().replace(" ", "-")}`}
                                className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-xl border border-slate/15 bg-white hover:border-copper hover:shadow-md transition-all duration-200"
                            >
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-mist group-hover:bg-peach mb-4 transition-colors duration-200">
                                    <Icon size={30} className="text-navy group-hover:text-copper transition-colors duration-200" />
                                </div>
                                <h3
                                    className="font-semibold text-navy text-base mb-2"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {title}
                                </h3>
                                <p className="text-slate-muted text-xs leading-relaxed">{description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. Why Choose FastPlay ──────────────────────────────────────────── */}
            <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <SectionHeader
                    title="Why Choose FastPlay?"
                    subtitle="We make buying sports equipment simple, fast, and trustworthy"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="flex items-start gap-4 p-6 rounded-xl border border-slate/15 bg-white hover:border-copper hover:shadow-md transition-all duration-200"
                        >
                            <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-lg bg-peach">
                                <Icon size={20} className="text-copper" />
                            </div>
                            <div>
                                <h3
                                    className="font-semibold text-navy text-sm mb-1"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {title}
                                </h3>
                                <p className="text-slate text-xs leading-relaxed">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 5. Our Mission ──────────────────────────────────────────────────── */}
            <section className="bg-peach px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-copper">
                            Our Mission
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl font-bold text-navy mb-6"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Built for Athletes. <br className="hidden sm:block" />
                            Designed for Everyone.
                        </h2>
                        <p className="text-slate text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                            Our mission is to make premium sports equipment accessible to every
                            player — beginner or professional. We believe the right gear
                            changes the way you play, and everyone deserves access to it at a
                            fair price, delivered fast, with zero hassle.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 6. Statistics ───────────────────────────────────────────────────── */}
            <section className="bg-navy px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        title="FastPlay by the Numbers"
                        subtitle="Trusted by thousands of athletes across Bangladesh"
                        light
                    />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map(({ icon: Icon, value, label }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center text-center p-6 rounded-xl border border-white/10 bg-white/5"
                            >
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-copper/15 mb-4">
                                    <Icon size={22} className="text-copper" />
                                </div>
                                <span
                                    className="text-3xl sm:text-4xl font-bold text-white mb-1"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {value}
                                </span>
                                <span className="text-white/60 text-sm">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. FAQ ──────────────────────────────────────────────────────────── */}
            <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Quick answers to common questions about FastPlay"
                />
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    {faqs.map((faq) => (
                        <FAQItem key={faq.question} {...faq} />
                    ))}
                </div>
            </section>

            {/* ── 8. Final CTA ────────────────────────────────────────────────────── */}
            <section className="bg-mist px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-2xl bg-navy px-8 py-12 sm:px-14 sm:py-16 text-center relative overflow-hidden">
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "radial-gradient(circle at 80% 50%, rgba(217,155,127,0.09), transparent 55%)",
                            }}
                        />
                        <div className="relative z-10">
                            <h2
                                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Ready to Play Your Best?
                            </h2>
                            <p className="text-white/65 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
                                Browse our full range of sports equipment and find exactly what
                                you need to level up your game.
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-sm font-semibold text-white bg-copper hover:bg-terracotta transition-colors duration-200"
                            >
                                Explore Products <FiArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}