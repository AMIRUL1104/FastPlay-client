import { getProductById } from "@/src/services/server/api";
import { notFound } from "next/navigation";
import ProductImage from "@/src/components/products/ProductImage";
import ProductInfo from "@/src/components/products/ProductInfo";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import type { Metadata } from "next";

interface ProductDetailsPageProps {
    params: Promise<{ id: string }>;
}
export const dynamic = "force-dynamic";
export async function generateMetadata({
    params,
}: ProductDetailsPageProps): Promise<Metadata> {
    const { id } = await params;
    const response = await getProductById(id);
    const product = response?.data;

    if (!product) {
        return { title: "Product Not Found | FastPlay" };
    }

    return {
        title: `${product.name} | FastPlay`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [{ url: product.image }],
        },
    };
}

export default async function ProductDetailsPage({
    params,
}: ProductDetailsPageProps) {
    const { id } = await params;
    const response = await getProductById(id);
    const product = response?.data;

    if (!product) notFound();

    return (
        <div className="min-h-screen bg-(--cream)">
            {/* ── Breadcrumb ───────────────────────────────────────────── */}
            <div className="bg-white border-b border-(--slate)/8 px-4 sm:px-6 lg:px-8 py-3.5">
                <nav
                    aria-label="Breadcrumb"
                    className="max-w-7xl mx-auto flex items-center gap-1.5 text-sm text-(--slate-muted)"
                >
                    <Link
                        href="/"
                        className="hover:text-(--navy) transition-colors duration-150"
                    >
                        Home
                    </Link>
                    <FiChevronRight size={13} className="shrink-0" />
                    <Link
                        href="/products"
                        className="hover:text-(--navy) transition-colors duration-150"
                    >
                        Products
                    </Link>
                    <FiChevronRight size={13} className="shrink-0" />
                    <span className="text-(--navy) font-medium truncate max-w-[200px] sm:max-w-xs">
                        {product.name}
                    </span>
                </nav>
            </div>

            {/* ── Main Content ─────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
                    {/* Left column — image */}
                    <div className="lg:sticky lg:top-6 self-start">
                        <ProductImage product={product} />
                    </div>

                    {/* Right column — info + actions */}
                    <ProductInfo product={product} />
                </div>
            </div>

            {/* ── Back link ────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm font-medium text-(--slate-muted) hover:text-(--navy) transition-colors duration-150"
                >
                    ← Back to Products
                </Link>
            </div>
        </div>
    );
}