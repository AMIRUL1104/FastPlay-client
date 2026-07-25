"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FiArrowLeft, FiSave, FiPlus, FiImage, FiAlertCircle, FiRefreshCw } from "react-icons/fi";


import type { CreateProductPayload } from "@/src/types/product.type";
import {
    createProduct,
    updateProduct,
} from "@/src/services/server/action";
import { productFormSchema, ProductFormValues } from "./productZodSchema";
import { getProductById } from "@/src/services/server/api";
import { toast } from "react-toastify";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: { value: CreateProductPayload["category"]; label: string }[] = [
    { value: "football", label: "Football" },
    { value: "cricket", label: "Cricket" },
    { value: "badminton", label: "Badminton" },
    { value: "gym-equipment", label: "Gym Equipment" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

// ─── Primitive UI ─────────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p
            role="alert"
            className="mt-1.5 text-xs flex items-center gap-1"
            style={{ color: "var(--terracotta)" }}
        >
            <FiAlertCircle size={12} aria-hidden />
            {message}
        </p>
    );
}

function Label({
    htmlFor,
    children,
    required,
}: {
    htmlFor: string;
    children: React.ReactNode;
    required?: boolean;
}) {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-semibold mb-1.5"
            style={{ color: "var(--slate)", fontFamily: "var(--font-display)" }}
        >
            {children}
            {required && (
                <span aria-hidden style={{ color: "var(--terracotta)" }}> *</span>
            )}
        </label>
    );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    hasError?: boolean;
};

function Input({ hasError, onFocus, onBlur, ...rest }: InputProps) {
    const base: React.CSSProperties = {
        background: "var(--peach)",
        border: `1.5px solid ${hasError ? "var(--terracotta)" : "var(--slate-muted)"}`,
        color: "var(--slate)",
        fontFamily: "var(--font-body)",
    };
    return (
        <input
            className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
            style={base}
            onFocus={e => {
                e.currentTarget.style.borderColor = "var(--copper)";
                onFocus?.(e);
            }}
            onBlur={e => {
                e.currentTarget.style.borderColor = hasError
                    ? "var(--terracotta)"
                    : "var(--slate-muted)";
                onBlur?.(e);
            }}
            {...rest}
        />
    );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    hasError?: boolean;
};

function Textarea({ hasError, onFocus, onBlur, ...rest }: TextareaProps) {
    return (
        <textarea
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all resize-none"
            style={{
                background: "var(--peach)",
                border: `1.5px solid ${hasError ? "var(--terracotta)" : "var(--slate-muted)"}`,
                color: "var(--slate)",
                fontFamily: "var(--font-body)",
            }}
            onFocus={e => {
                e.currentTarget.style.borderColor = "var(--copper)";
                onFocus?.(e);
            }}
            onBlur={e => {
                e.currentTarget.style.borderColor = hasError
                    ? "var(--terracotta)"
                    : "var(--slate-muted)";
                onBlur?.(e);
            }}
            {...rest}
        />
    );
}

function SelectField({
    hasError,
    children,
    onFocus,
    onBlur,
    ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }) {
    return (
        <select
            className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all appearance-none"
            style={{
                background: "var(--peach)",
                border: `1.5px solid ${hasError ? "var(--terracotta)" : "var(--slate-muted)"}`,
                color: "var(--slate)",
                fontFamily: "var(--font-body)",
            }}
            onFocus={e => {
                e.currentTarget.style.borderColor = "var(--copper)";
                onFocus?.(e);
            }}
            onBlur={e => {
                e.currentTarget.style.borderColor = hasError
                    ? "var(--terracotta)"
                    : "var(--slate-muted)";
                onBlur?.(e);
            }}
            {...rest}
        >
            {children}
        </select>
    );
}

function Switch({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (val: boolean) => void;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className="relative inline-flex items-center w-11 h-6 rounded-full transition-colors focus-visible:outline focus-visible:outline-2"
            style={{
                background: checked ? "var(--copper)" : "var(--slate-muted)",
                outlineColor: "var(--copper)",
            }}
        >
            <span
                className="inline-block w-4 h-4 bg-white rounded-full shadow transition-transform"
                style={{ transform: checked ? "translateX(22px)" : "translateX(2px)" }}
            />
        </button>
    );
}

// ─── Image Preview ────────────────────────────────────────────────────────────

function ImagePreview({ url }: { url: string }) {
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (!url) { setValid(false); return; }
        try { new URL(url); } catch { setValid(false); return; }

        // Probe validity with native browser Image before handing off to next/image
        const probe = new window.Image();
        probe.onload = () => setValid(true);
        probe.onerror = () => setValid(false);
        probe.src = url;
    }, [url]);

    return (
        <div
            className="relative mt-3 rounded-lg overflow-hidden"
            style={{
                height: 160,
                background: "var(--mist)",
                border: "1.5px dashed var(--slate-muted)",
            }}
        >
            {valid ? (
                <Image
                    src={url}
                    alt="Product preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover"
                    unoptimized // external URLs from user input — skip Next.js optimisation
                />
            ) : (
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                    style={{ color: "var(--slate-muted)" }}
                >
                    <FiImage size={28} aria-hidden />
                    <span className="text-xs">Image preview</span>
                </div>
            )}
        </div>
    );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function FormSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-busy aria-label="Loading product">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={i === 6 ? "md:col-span-2" : ""}>
                    <div
                        className="h-4 w-28 rounded mb-2 animate-pulse"
                        style={{ background: "var(--mist)" }}
                    />
                    <div
                        className={`w-full rounded-lg animate-pulse ${i === 6 ? "h-24" : "h-10"}`}
                        style={{ background: "var(--mist)" }}
                    />
                </div>
            ))}
        </div>
    );
}

// ─── Fetch Error ──────────────────────────────────────────────────────────────

function FetchError({ onRetry }: { onRetry: () => void }) {
    return (
        <div
            className="flex flex-col items-center gap-4 py-16 rounded-xl"
            style={{ background: "var(--mist)" }}
            role="alert"
        >
            <FiAlertCircle size={36} style={{ color: "var(--terracotta)" }} aria-hidden />
            <p
                className="font-semibold"
                style={{ color: "var(--navy)", fontFamily: "var(--font-display)" }}
            >
                Failed to load product
            </p>
            <p className="text-sm" style={{ color: "var(--slate-muted)" }}>
                Check your connection and try again.
            </p>
            <button
                type="button"
                onClick={onRetry}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                style={{
                    background: "var(--navy)",
                    color: "var(--cream)",
                    fontFamily: "var(--font-display)",
                }}
            >
                <FiRefreshCw size={14} aria-hidden />
                Retry
            </button>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type FetchState = "idle" | "loading" | "error" | "done";

export default function ProductFormPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const productId = searchParams.get("edit");
    const isEditMode = Boolean(productId);

    const [fetchState, setFetchState] = useState<FetchState>(isEditMode ? "loading" : "done");
    const [submitting, setSubmitting] = useState(false);
    const [slugManual, setSlugManual] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            slug: "",
            category: undefined,
            brand: "",
            price: 0,
            stock: 0,
            description: "",
            image: "",
            featured: false,
        },
    });

    const nameValue = watch("name");
    const imageValue = watch("image");

    // Auto-slug: add mode only, stops when user manually edits slug
    useEffect(() => {
        if (!isEditMode && !slugManual && nameValue) {
            setValue("slug", slugify(nameValue), { shouldValidate: true });
        }
    }, [nameValue, isEditMode, slugManual, setValue]);

    // Fetch product in edit mode
    const fetchProduct = useCallback(async () => {
        if (!productId) return;
        setFetchState("loading");
        try {
            const res = await getProductById(productId);
            if (!res?.data) throw new Error("Product not found");

            const { _id: _omitId, createdAt: _omitCreated, updatedAt: _omitUpdated, ...fields } = res.data;
            reset(fields);

            setSlugManual(true); // prevent auto-slug overwriting fetched slug
            setFetchState("done");
        } catch {
            setFetchState("error");
        }
    }, [productId, reset]);

    useEffect(() => {
        if (isEditMode) fetchProduct();
    }, [isEditMode, fetchProduct]);

    // Submit
    const onSubmit = async (data: ProductFormValues) => {
        setSubmitting(true);
        try {
            const res = isEditMode
                ? await updateProduct(productId!, data)
                : await createProduct(data);

            const r = res as { success?: boolean; error?: string; message?: string };
            if (r?.success === false || r?.error) {
                // Replace with your toast library call
                toast.error(r.error ?? r.message ?? "Something went wrong.");
                return;
            }

            // Replace with your toast library call
            toast(isEditMode ? "Product updated." : "Product created.");
            router.push("/dashboard/admin/products");
        } catch {
            toast.error("Unexpected error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const pageTitle = isEditMode ? "Edit Product" : "Add New Product";
    const submitLabel = isEditMode ? "Save Changes" : "Create Product";

    return (
        <div className="min-h-screen py-8 px-4" style={{ background: "var(--cream)" }}>
            <div className="max-w-3xl mx-auto">

                {/* ── Header ── */}
                <div className="flex items-center gap-3 mb-8">
                    <button
                        type="button"
                        onClick={() => router.push("/dashboard/products")}
                        className="p-2 rounded-lg transition-opacity hover:opacity-70"
                        style={{ background: "var(--mist)", color: "var(--navy)" }}
                        aria-label="Back to products"
                    >
                        <FiArrowLeft size={18} aria-hidden />
                    </button>
                    <div>
                        <p
                            className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                            style={{ color: "var(--copper)" }}
                        >
                            {isEditMode ? "Editing" : "New listing"}
                        </p>
                        <h1
                            className="text-2xl font-bold"
                            style={{ color: "var(--navy)", fontFamily: "var(--font-display)" }}
                        >
                            {pageTitle}
                        </h1>
                    </div>
                </div>

                {/* ── Card ── */}
                <div
                    className="rounded-2xl p-6 md:p-8 shadow-sm"
                    style={{ background: "#fff", border: "1px solid var(--mist)" }}
                >
                    {fetchState === "loading" && <FormSkeleton />}

                    {fetchState === "error" && <FetchError onRetry={fetchProduct} />}

                    {fetchState === "done" && (
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Product Name */}
                                <div>
                                    <Label htmlFor="name" required>Product Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. Pro Cricket Bat"
                                        hasError={!!errors.name}
                                        {...register("name")}
                                    />
                                    <FieldError message={errors.name?.message} />
                                </div>

                                {/* Slug */}
                                <div>
                                    <Label htmlFor="slug" required>Slug</Label>
                                    <Input
                                        id="slug"
                                        placeholder="pro-cricket-bat"
                                        hasError={!!errors.slug}
                                        {...register("slug", {
                                            onChange: () => setSlugManual(true),
                                        })}
                                    />
                                    <FieldError message={errors.slug?.message} />
                                </div>

                                {/* Category */}
                                <div>
                                    <Label htmlFor="category" required>Category</Label>
                                    <SelectField
                                        id="category"
                                        hasError={!!errors.category}
                                        {...register("category")}
                                    >
                                        <option value="">Select category</option>
                                        {CATEGORIES.map(c => (
                                            <option key={c.value} value={c.value}>{c.label}</option>
                                        ))}
                                    </SelectField>
                                    <FieldError message={errors.category?.message} />
                                </div>

                                {/* Brand */}
                                <div>
                                    <Label htmlFor="brand" required>Brand</Label>
                                    <Input
                                        id="brand"
                                        placeholder="e.g. Adidas"
                                        hasError={!!errors.brand}
                                        {...register("brand")}
                                    />
                                    <FieldError message={errors.brand?.message} />
                                </div>

                                {/* Price */}
                                <div>
                                    <Label htmlFor="price" required>Price (BDT)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min={0}
                                        step="0.01"
                                        placeholder="0.00"
                                        hasError={!!errors.price}
                                        {...register("price", { valueAsNumber: true })}
                                    />
                                    <FieldError message={errors.price?.message} />
                                </div>

                                {/* Stock */}
                                <div>
                                    <Label htmlFor="stock" required>Stock</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        min={0}
                                        placeholder="0"
                                        hasError={!!errors.stock}
                                        {...register("stock", { valueAsNumber: true })}
                                    />
                                    <FieldError message={errors.stock?.message} />
                                </div>

                                {/* Description — full width */}
                                <div className="md:col-span-2">
                                    <Label htmlFor="description" required>Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe the product..."
                                        hasError={!!errors.description}
                                        {...register("description")}
                                    />
                                    <FieldError message={errors.description?.message} />
                                </div>

                                {/* Image URL — full width */}
                                <div className="md:col-span-2">
                                    <Label htmlFor="image" required>Image URL</Label>
                                    <Input
                                        id="image"
                                        type="url"
                                        placeholder="https://..."
                                        hasError={!!errors.image}
                                        {...register("image")}
                                    />
                                    <FieldError message={errors.image?.message} />
                                    <ImagePreview url={imageValue} />
                                </div>

                                {/* Featured — full width */}
                                <div
                                    className="md:col-span-2 flex items-center justify-between py-3 px-4 rounded-xl"
                                    style={{ background: "var(--mist)" }}
                                >
                                    <div>
                                        <p
                                            className="text-sm font-semibold"
                                            style={{ color: "var(--navy)", fontFamily: "var(--font-display)" }}
                                        >
                                            Featured Product
                                        </p>
                                        <p className="text-xs mt-0.5" style={{ color: "var(--slate-muted)" }}>
                                            Show this product in featured sections
                                        </p>
                                    </div>
                                    <Controller
                                        name="featured"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>

                            </div>

                            {/* ── Actions ── */}
                            <div
                                className="flex items-center justify-end gap-3 mt-8 pt-6"
                                style={{ borderTop: "1px solid var(--mist)" }}
                            >
                                <button
                                    type="button"
                                    onClick={() => router.push("/dashboard/products")}
                                    className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-70"
                                    style={{
                                        border: "1.5px solid var(--slate-muted)",
                                        color: "var(--slate)",
                                        fontFamily: "var(--font-display)",
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        background: "var(--navy)",
                                        color: "var(--cream)",
                                        fontFamily: "var(--font-display)",
                                    }}
                                >
                                    {isEditMode
                                        ? <FiSave size={15} aria-hidden />
                                        : <FiPlus size={15} aria-hidden />
                                    }
                                    {submitting ? "Saving…" : submitLabel}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
}