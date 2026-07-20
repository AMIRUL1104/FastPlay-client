import { getProducts, GetProductsParams } from "@/src/services/server/api";
import SearchFilter from "@/src/components/products/SearchFilter";
import ProductGrid from "@/src/components/products/ProductGrid";
import ProductsPagination from "@/src/components/products/ProductsPagination";
import { Suspense } from "react";
import type { Metadata } from "next";
import { FiGrid, FiLoader } from "react-icons/fi";

export const metadata: Metadata = {
    title: "Products | FastPlay — Sports Equipment Store",
    description:
        "Browse our complete collection of premium sports equipment — football, cricket, badminton, and gym gear. Fast delivery across Bangladesh.",
};

interface ProductsPageProps {
    searchParams: Promise<{
        search?: string;
        category?: string;
        sort?: string;
        minPrice?: string;
        maxPrice?: string;
        page?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams;

    const queryParams: GetProductsParams = {
        search: params.search ?? "",
        category: params.category ?? "",
        sort: params.sort ?? "newest",
        minPrice: params.minPrice ? Number(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
        page: params.page ? Number(params.page) : 1,
        limit: 12,
    };

    const { data: products, total, totalPages, currentPage } = await getProducts(queryParams);

    const hasFilters =
        params.search || params.category || params.minPrice || params.maxPrice;

    return (
        <div className="min-h-screen bg-(--cream)">
            {/* ── Page Header ─────────────────────────────────────────── */}
            <div
                className="bg-(--navy) py-12 px-4 sm:px-6 lg:px-8"
                style={{ backgroundImage: "radial-gradient(ellipse at 70% 50%, #1A4A5C 0%, #0F3040 100%)" }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <FiGrid className="text-(--copper)" size={18} />
                        <p className="text-xs font-semibold text-(--copper) uppercase tracking-widest">
                            Shop
                        </p>
                    </div>
                    <h1
                        className="text-3xl sm:text-4xl font-bold text-white mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        All Products
                    </h1>
                    <p className="text-sm text-white/50">
                        {total > 0
                            ? `${total} product${total !== 1 ? "s" : ""} available${hasFilters ? " · Filtered results" : ""}`
                            : "No products match your filters"}
                    </p>
                </div>
            </div>

            {/* ── Main Layout ─────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex gap-8 items-start">
                    {/* ── Sidebar (desktop) ── */}
                    <aside className="hidden lg:block w-64 shrink-0 sticky top-6">
                        <Suspense fallback={<div className="h-96 bg-white rounded-2xl animate-pulse" />}>
                            <SearchFilter />
                        </Suspense>
                    </aside>

                    {/* ── Products column ── */}
                    <div className="flex-1 min-w-0">
                        {/* Mobile filters */}
                        <div className="lg:hidden mb-6">
                            <Suspense fallback={<div className="h-16 bg-white rounded-2xl animate-pulse" />}>
                                <SearchFilter />
                            </Suspense>
                        </div>

                        {/* Result summary bar */}
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-sm text-(--slate-muted)">
                                {products.length > 0 && (
                                    <>
                                        Showing{" "}
                                        <span className="font-semibold text-(--navy)">
                                            {(currentPage - 1) * 12 + 1}–
                                            {Math.min(currentPage * 12, total)}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-semibold text-(--navy)">{total}</span>
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Product grid */}
                        <ProductGrid products={products} />

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12">
                                <Suspense
                                    fallback={
                                        <div className="flex items-center justify-center gap-2">
                                            <FiLoader className="animate-spin text-(--slate-muted)" />
                                        </div>
                                    }
                                >
                                    <ProductsPagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                    />
                                </Suspense>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}