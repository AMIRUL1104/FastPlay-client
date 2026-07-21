"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, PackageSearch, Loader2 } from "lucide-react";
import { getAllProductsForAdmin } from "@/src/services/server/api";
import { Product } from "@/src/types/product.type";

export default function ManageProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const data = await getAllProductsForAdmin();
                setProducts(data || []);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const handleDeleteClick = (productId: string) => {
        console.log("Delete product ID:", productId);
    };

    return (
        <div className="w-full max-w-full overflow-hidden space-y-6 p-3 sm:p-6 lg:p-8">
            {/* Top Header Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-text-head font-display">
                        Manage Products
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-text-muted">
                        View, track, and manage all sports products in your FastPlay store.
                    </p>
                </div>

                <Link
                    href="/dashboard/admin/products/add"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-copper px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all hover:bg-terracotta shadow-xs shrink-0 focus-visible:outline-2 focus-visible:outline-copper"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Product</span>
                </Link>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] rounded-xl border border-peach bg-bg-card p-8 shadow-xs">
                    <Loader2 className="h-8 w-8 animate-spin text-copper" />
                    <p className="mt-3 text-xs sm:text-sm font-medium text-text-muted">
                        Loading products...
                    </p>
                </div>
            ) : products.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center min-h-[300px] rounded-xl border border-peach bg-bg-card p-8 text-center shadow-xs">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-navy">
                        <PackageSearch className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 text-base font-bold text-text-head font-display">
                        No products found.
                    </h3>
                    <p className="mt-1 text-xs text-text-muted">
                        Click the button above to add your first product.
                    </p>
                </div>
            ) : (
                /* Products Table Container */
                <div className="w-full overflow-hidden rounded-xl border border-peach bg-bg-card shadow-xs">
                    <div className="overflow-x-auto max-w-full">
                        <table className="w-full text-left text-xs sm:text-sm text-text-body border-collapse min-w-[700px]">
                            {/* Sticky Table Header */}
                            <thead className="sticky top-0 z-10 border-b border-peach bg-mist text-[11px] sm:text-xs font-bold uppercase tracking-wider text-text-head font-display">
                                <tr>
                                    <th scope="col" className="px-4 py-3.5">Image</th>
                                    <th scope="col" className="px-4 py-3.5">Product Name</th>
                                    <th scope="col" className="px-4 py-3.5">Brand</th>
                                    <th scope="col" className="px-4 py-3.5">Category</th>
                                    <th scope="col" className="px-4 py-3.5">Price</th>
                                    <th scope="col" className="px-4 py-3.5">Stock</th>
                                    <th scope="col" className="px-4 py-3.5">Featured</th>
                                    <th scope="col" className="px-4 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-peach/60">
                                {products.map((product) => {
                                    const isLowStock = product.stock <= 5;

                                    return (
                                        <tr
                                            key={product._id}
                                            className="transition-colors hover:bg-peach/20"
                                        >
                                            {/* Thumbnail */}
                                            <td className="px-4 py-3 shrink-0">
                                                <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-peach bg-mist shrink-0">
                                                    <Image
                                                        src={product.image || "/placeholder.png"}
                                                        alt={product.name}
                                                        fill
                                                        sizes="44px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </td>

                                            {/* Product Name */}
                                            <td className="px-4 py-3 font-semibold text-text-head max-w-[200px] truncate">
                                                {product.name}
                                            </td>

                                            {/* Brand */}
                                            <td className="px-4 py-3 text-text-muted">
                                                {product.brand}
                                            </td>

                                            {/* Category */}
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center rounded-md bg-mist px-2 py-0.5 text-[11px] font-semibold text-navy">
                                                    {product.category}
                                                </span>
                                            </td>

                                            {/* Price */}
                                            <td className="px-4 py-3 font-bold text-text-head">
                                                ৳{product.price.toLocaleString()}
                                            </td>

                                            {/* Stock Badge */}
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${isLowStock
                                                        ? "bg-rose-100 text-rose-700"
                                                        : "bg-emerald-100 text-emerald-800"
                                                        }`}
                                                >
                                                    {product.stock} pcs
                                                </span>
                                            </td>

                                            {/* Featured Badge */}
                                            <td className="px-4 py-3">
                                                {product.featured ? (
                                                    <span className="inline-flex items-center rounded-full bg-peach px-2.5 py-0.5 text-[11px] font-bold text-terracotta">
                                                        Featured
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-text-muted">
                                                        Normal
                                                    </span>
                                                )}
                                            </td>

                                            {/* Action Buttons */}
                                            <td className="px-4 py-3 text-right">
                                                <div className="inline-flex items-center justify-end gap-1.5">
                                                    {/* Edit Button */}
                                                    <Link
                                                        href={`/dashboard/admin/products/edit/${product._id}`}
                                                        className="p-1.5 rounded-lg text-text-muted transition-colors hover:bg-mist hover:text-navy"
                                                        title="Edit Product"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => handleDeleteClick(product._id)}
                                                        className="p-1.5 rounded-lg text-text-muted transition-colors hover:bg-rose-50 hover:text-rose-600"
                                                        title="Delete Product"
                                                        type="button"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}