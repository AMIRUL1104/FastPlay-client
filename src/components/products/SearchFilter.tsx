"use client";

import { ProductCategory } from "@/src/types/product.type";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FiSearch, FiSliders, FiX } from "react-icons/fi";

const CATEGORIES: { label: string; value: ProductCategory | "" }[] = [
    { label: "All Categories", value: "" },
    { label: "Football", value: "football" },
    { label: "Cricket", value: "cricket" },
    { label: "Badminton", value: "badminton" },
    { label: "Gym Equipment", value: "gym-equipment" },
];

const SORT_OPTIONS = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
];

export default function SearchFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") ?? "");
    const [category, setCategory] = useState(searchParams.get("category") ?? "");
    const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

    const buildAndPush = useCallback(
        (overrides: Record<string, string>) => {
            const merged = { search, category, sort, minPrice, maxPrice, page: "1", ...overrides };
            const params = new URLSearchParams();
            Object.entries(merged).forEach(([k, v]) => {
                if (v && v !== "") params.set(k, v);
            });
            router.push(`/products?${params.toString()}`);
        },
        [search, category, sort, minPrice, maxPrice, router]
    );

    // Debounced search — fires 400 ms after user stops typing
    useEffect(() => {
        const timer = setTimeout(() => {
            buildAndPush({ search });
        }, 400);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const handleCategory = (val: string) => {
        setCategory(val);
        buildAndPush({ category: val });
    };

    const handleSort = (val: string) => {
        setSort(val);
        buildAndPush({ sort: val });
    };

    const handlePriceApply = () => {
        buildAndPush({ minPrice, maxPrice });
    };

    const handleClear = () => {
        setSearch("");
        setCategory("");
        setSort("newest");
        setMinPrice("");
        setMaxPrice("");
        router.push("/products");
    };

    const hasActiveFilters =
        search || category || minPrice || maxPrice || sort !== "newest";

    return (
        <div className="bg-white rounded-2xl border border-(--slate)/10 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-(--slate)/8 bg-(--cream)">
                <div className="flex items-center gap-2 text-sm font-bold text-(--navy)" style={{ fontFamily: "var(--font-display)" }}>
                    <FiSliders size={15} className="text-(--copper)" />
                    Filters
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-1 text-xs text-(--slate-muted) hover:text-(--navy) transition-colors"
                    >
                        <FiX size={12} />
                        Clear all
                    </button>
                )}
            </div>

            <div className="p-5 space-y-6">
                {/* Search */}
                <div>
                    <label className="block text-xs font-semibold text-(--slate-muted) uppercase tracking-wider mb-2">
                        Search
                    </label>
                    <div className="relative">
                        <FiSearch
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-(--slate-muted) pointer-events-none"
                        />
                        <input
                            id="product-search"
                            type="text"
                            placeholder="Search products…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-(--slate)/20 text-sm text-(--navy) placeholder:text-(--slate-muted) bg-white focus:outline-none focus:ring-2 focus:ring-(--copper)/30 focus:border-(--copper) transition"
                        />
                        {search && (
                            <button
                                onClick={() => {
                                    setSearch("");
                                    buildAndPush({ search: "" });
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-(--slate-muted) hover:text-(--navy) transition-colors"
                            >
                                <FiX size={13} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-xs font-semibold text-(--slate-muted) uppercase tracking-wider mb-2">
                        Category
                    </label>
                    <div className="flex flex-col gap-1">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                id={`category-${cat.value || "all"}`}
                                onClick={() => handleCategory(cat.value)}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                    category === cat.value
                                        ? "bg-(--navy) text-white shadow-sm"
                                        : "text-(--slate) hover:bg-(--mist) hover:text-(--navy)"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-xs font-semibold text-(--slate-muted) uppercase tracking-wider mb-2">
                        Price Range (৳)
                    </label>
                    <div className="flex gap-2 mb-2.5">
                        <input
                            id="min-price"
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            min={0}
                            className="w-full px-3 py-2.5 rounded-lg border border-(--slate)/20 text-sm text-(--navy) placeholder:text-(--slate-muted) bg-white focus:outline-none focus:ring-2 focus:ring-(--copper)/30 focus:border-(--copper) transition"
                        />
                        <input
                            id="max-price"
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            min={0}
                            className="w-full px-3 py-2.5 rounded-lg border border-(--slate)/20 text-sm text-(--navy) placeholder:text-(--slate-muted) bg-white focus:outline-none focus:ring-2 focus:ring-(--copper)/30 focus:border-(--copper) transition"
                        />
                    </div>
                    <button
                        id="apply-price"
                        onClick={handlePriceApply}
                        className="w-full py-2 rounded-lg text-sm font-semibold border border-(--copper) text-(--copper) hover:bg-(--copper) hover:text-white transition-colors duration-200"
                    >
                        Apply
                    </button>
                </div>

                {/* Sort */}
                <div>
                    <label
                        htmlFor="sort-select"
                        className="block text-xs font-semibold text-(--slate-muted) uppercase tracking-wider mb-2"
                    >
                        Sort By
                    </label>
                    <select
                        id="sort-select"
                        value={sort}
                        onChange={(e) => handleSort(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-(--slate)/20 text-sm text-(--navy) bg-white focus:outline-none focus:ring-2 focus:ring-(--copper)/30 focus:border-(--copper) transition appearance-none cursor-pointer"
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
