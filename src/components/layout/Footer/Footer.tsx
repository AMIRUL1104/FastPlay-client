import Link from "next/link";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

const footerLinks = {
    Shop: [
        { label: "All Products", href: "/products" },
        { label: "Football", href: "/products?category=football" },
        { label: "Cricket", href: "/products?category=cricket" },
        { label: "Badminton", href: "/products?category=badminton" },
        { label: "Gym Equipment", href: "/products?category=gym-equipment" },
    ],
    Company: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],
    Account: [
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
        { label: "My Orders", href: "/dashboard/orders" },
        { label: "My Profile", href: "/dashboard/profile" },
    ],
};

const socialLinks = [
    { icon: FiFacebook, href: "#", label: "Facebook" },
    { icon: FiInstagram, href: "#", label: "Instagram" },
    { icon: FiTwitter, href: "#", label: "Twitter" },
    { icon: FiYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
    return (
        <footer className="bg-navy-deep">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

                {/* Top Grid */}
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="col-span-2 sm:col-span-2 lg:col-span-1">
                        <Link
                            href="/"
                            className="text-2xl font-bold tracking-wide text-white font-display"
                        >
                            Fast<span className="text-copper">Play</span>
                        </Link>
                        <p className="mt-3 text-sm leading-relaxed text-mist opacity-75">
                            Your go-to sports equipment store. Quality gear for every sport, delivered fast.
                        </p>

                        {/* Social Links */}
                        <div className="mt-5 flex items-center gap-4">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="text-white/60 transition-colors duration-200 hover:text-white"
                                >
                                    <Icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Nav Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-copper">
                                {title}
                            </h4>
                            <ul className="flex flex-col gap-2.5">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/65 outline-none transition-colors duration-200 hover:text-copper"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
                    <p className="text-xs text-white/45">
                        © {new Date().getFullYear()} FastPlay. All rights reserved.
                    </p>
                    <p className="text-xs text-white/45">
                        Built with Next.js & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}