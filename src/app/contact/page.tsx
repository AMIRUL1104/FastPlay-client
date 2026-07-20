"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiClock,
    FiSend,
    FiFacebook,
    FiInstagram,
    FiTwitter,
    FiYoutube,
    FiArrowRight,
    FiMessageCircle,
} from "react-icons/fi";

// ─── Data ─────────────────────────────────────────────────────────────────────

const contactInfo = [
    {
        icon: FiMail,
        title: "Email Us",
        value: "support@fastplay.com.bd",
        sub: "We reply within 24 hours",
    },
    {
        icon: FiPhone,
        title: "Call Us",
        value: "+880 1700-000000",
        sub: "Sat–Thu, 9 AM – 8 PM",
    },
    {
        icon: FiMapPin,
        title: "Our Location",
        value: "Dhaka, Bangladesh",
        sub: "Online store — nationwide delivery",
    },
    {
        icon: FiClock,
        title: "Business Hours",
        value: "Sat – Thu",
        sub: "9:00 AM – 8:00 PM",
    },
];

const socialLinks = [
    { icon: FiFacebook, label: "Facebook", href: "#" },
    { icon: FiInstagram, label: "Instagram", href: "#" },
    { icon: FiTwitter, label: "Twitter", href: "#" },
    { icon: FiYoutube, label: "YouTube", href: "#" },
];

const topics = [
    "Order Issue",
    "Product Inquiry",
    "Delivery Question",
    "Return / Replacement",
    "Payment Issue",
    "Other",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        topic: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <div className="w-full flex flex-col">

            {/* ── Hero ────────────────────────────────────────────────────────────── */}
            <section className="bg-navy px-4 py-24 sm:px-6 sm:py-28 lg:px-8 relative overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle at 15% 60%, rgba(217,155,127,0.08), transparent 55%), radial-gradient(circle at 85% 20%, rgba(165,111,99,0.07), transparent 50%)",
                    }}
                />
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-copper text-copper">
                        Contact Us
                    </span>
                    <h1
                        className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        We&apos;re Here to{" "}
                        <span className="text-copper">Help You</span>
                    </h1>
                    <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                        Have a question about an order, a product, or anything else? Reach
                        out — our team is happy to assist.
                    </p>
                </div>
            </section>

            {/* ── Contact Info Cards ───────────────────────────────────────────────── */}
            <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map(({ icon: Icon, title, value, sub }) => (
                        <div
                            key={title}
                            className="flex flex-col items-center text-center p-6 rounded-xl border border-slate/15 bg-white hover:border-copper hover:shadow-md transition-all duration-200"
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-peach mb-4">
                                <Icon size={22} className="text-copper" />
                            </div>
                            <h3
                                className="font-semibold text-navy text-sm mb-1"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {title}
                            </h3>
                            <p className="text-slate text-sm font-medium mb-0.5">{value}</p>
                            <p className="text-slate-muted text-xs">{sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Contact Form + Social ─────────────────────────────────────────────── */}
            <section className="bg-mist px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Form */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate/15 p-8 sm:p-10">
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-peach">
                                        <FiMessageCircle size={30} className="text-copper" />
                                    </div>
                                    <h3
                                        className="text-2xl font-bold text-navy"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        Message Sent!
                                    </h3>
                                    <p className="text-slate text-sm max-w-sm leading-relaxed">
                                        Thanks for reaching out. We&apos;ll get back to you within
                                        24 hours.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSubmitted(false);
                                            setForm({ name: "", email: "", topic: "", message: "" });
                                        }}
                                        className="mt-2 px-6 py-2.5 rounded-md text-sm font-semibold text-white bg-copper hover:bg-terracotta transition-colors duration-200"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <h2
                                            className="text-2xl sm:text-3xl font-bold text-navy mb-2"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            Send Us a Message
                                        </h2>
                                        <p className="text-slate text-sm">
                                            Fill in the form below and we&apos;ll respond as soon as possible.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                        {/* Name + Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs font-semibold text-navy uppercase tracking-wide">
                                                    Full Name <span className="text-copper">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your name"
                                                    className="w-full px-4 py-3 rounded-lg border border-slate/20 bg-cream text-slate text-sm placeholder:text-slate-muted focus:outline-none focus:border-copper transition-colors duration-200"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs font-semibold text-navy uppercase tracking-wide">
                                                    Email Address <span className="text-copper">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="your@email.com"
                                                    className="w-full px-4 py-3 rounded-lg border border-slate/20 bg-cream text-slate text-sm placeholder:text-slate-muted focus:outline-none focus:border-copper transition-colors duration-200"
                                                />
                                            </div>
                                        </div>

                                        {/* Topic */}
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-navy uppercase tracking-wide">
                                                Topic <span className="text-copper">*</span>
                                            </label>
                                            <select
                                                name="topic"
                                                value={form.topic}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-slate/20 bg-cream text-slate text-sm focus:outline-none focus:border-copper transition-colors duration-200"
                                            >
                                                <option value="" disabled>
                                                    Select a topic
                                                </option>
                                                {topics.map((t) => (
                                                    <option key={t} value={t}>
                                                        {t}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-navy uppercase tracking-wide">
                                                Message <span className="text-copper">*</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                placeholder="Describe your issue or question..."
                                                className="w-full px-4 py-3 rounded-lg border border-slate/20 bg-cream text-slate text-sm placeholder:text-slate-muted focus:outline-none focus:border-copper transition-colors duration-200 resize-none"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            className="self-start inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-sm font-semibold text-white bg-copper hover:bg-terracotta transition-colors duration-200"
                                        >
                                            <FiSend size={15} />
                                            Send Message
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>

                        {/* Social + Quick Links */}
                        <div className="flex flex-col gap-6">
                            {/* Social */}
                            <div className="bg-white rounded-2xl border border-slate/15 p-6 sm:p-8">
                                <h3
                                    className="text-lg font-bold text-navy mb-5"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Follow Us
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {socialLinks.map(({ icon: Icon, label, href }) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-slate/15 hover:border-copper hover:bg-peach transition-all duration-200"
                                        >
                                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-mist group-hover:bg-copper/15 transition-colors duration-200">
                                                <Icon size={16} className="text-navy group-hover:text-copper transition-colors duration-200" />
                                            </div>
                                            <span className="text-sm font-medium text-slate group-hover:text-copper transition-colors duration-200">
                                                {label}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Help */}
                            <div className="bg-navy rounded-2xl p-6 sm:p-8">
                                <h3
                                    className="text-lg font-bold text-white mb-2"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Need Quick Help?
                                </h3>
                                <p className="text-white/60 text-sm mb-5 leading-relaxed">
                                    Browse our products or check your orders directly from your
                                    dashboard.
                                </p>
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/products"
                                        className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/10 hover:bg-copper/20 border border-white/10 hover:border-copper transition-all duration-200 group"
                                    >
                                        <span className="text-sm font-medium text-white">Browse Products</span>
                                        <FiArrowRight size={15} className="text-copper group-hover:translate-x-0.5 transition-transform duration-200" />
                                    </Link>
                                    <Link
                                        href="/dashboard/orders"
                                        className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/10 hover:bg-copper/20 border border-white/10 hover:border-copper transition-all duration-200 group"
                                    >
                                        <span className="text-sm font-medium text-white">My Orders</span>
                                        <FiArrowRight size={15} className="text-copper group-hover:translate-x-0.5 transition-transform duration-200" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
            <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="rounded-2xl bg-peach border border-copper/20 px-8 py-12 sm:px-14 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div>
                        <h2
                            className="text-2xl sm:text-3xl font-bold text-navy mb-3"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Still have questions?
                        </h2>
                        <p className="text-slate text-sm sm:text-base leading-relaxed max-w-lg">
                            Check out our About page to learn more about FastPlay, or head
                            straight to the store and start shopping.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <Link
                            href="/about"
                            className="px-6 py-3 rounded-md text-sm font-semibold border border-copper text-copper hover:bg-copper hover:text-white transition-colors duration-200 text-center"
                        >
                            About FastPlay
                        </Link>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-white bg-copper hover:bg-terracotta transition-colors duration-200"
                        >
                            Shop Now <FiArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}