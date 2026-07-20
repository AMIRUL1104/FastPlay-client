"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ProductsPaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function ProductsPagination({
    currentPage,
    totalPages,
}: ProductsPaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.push(`/products?${params.toString()}`);
    };

    /** Build a compact list: 1 … 4 5 6 … 12 */
    const getPageNumbers = (): (number | "...")[] => {
        const pages: (number | "...")[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <nav
            aria-label="Product pagination"
            className="flex items-center justify-center gap-1.5"
        >
            <button
                id="pagination-prev"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg border border-(--slate)/20 text-sm font-medium text-(--navy) hover:bg-(--mist) disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
            >
                <FiChevronLeft size={15} />
                Prev
            </button>

            {getPageNumbers().map((page, i) =>
                page === "..." ? (
                    <span
                        key={`ellipsis-${i}`}
                        className="w-9 text-center text-sm text-(--slate-muted) select-none"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={page}
                        id={`pagination-page-${page}`}
                        onClick={() => goToPage(page as number)}
                        className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                            currentPage === page
                                ? "bg-(--navy) text-white shadow-sm"
                                : "border border-(--slate)/20 text-(--navy) hover:bg-(--mist)"
                        }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                id="pagination-next"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg border border-(--slate)/20 text-sm font-medium text-(--navy) hover:bg-(--mist) disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
            >
                Next
                <FiChevronRight size={15} />
            </button>
        </nav>
    );
}
