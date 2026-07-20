"use client";

import { FiMinus, FiPlus } from "react-icons/fi";

interface QuantitySelectorProps {
    quantity: number;
    stock: number;
    onChange: (quantity: number) => void;
}

export default function QuantitySelector({
    quantity,
    stock,
    onChange,
}: QuantitySelectorProps) {
    const decrement = () => {
        if (quantity > 1) onChange(quantity - 1);
    };

    const increment = () => {
        if (quantity < stock) onChange(quantity + 1);
    };

    return (
        <div className="inline-flex items-center" role="group" aria-label="Quantity selector">
            <button
                id="quantity-decrement"
                onClick={decrement}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="w-11 h-11 flex items-center justify-center rounded-l-xl border border-(--slate)/20 text-(--navy) bg-white hover:bg-(--mist) disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
            >
                <FiMinus size={15} />
            </button>

            <div
                id="quantity-display"
                className="w-16 h-11 flex items-center justify-center border-t border-b border-(--slate)/20 bg-white text-base font-bold text-(--navy) select-none"
            >
                {quantity}
            </div>

            <button
                id="quantity-increment"
                onClick={increment}
                disabled={quantity >= stock}
                aria-label="Increase quantity"
                className="w-11 h-11 flex items-center justify-center rounded-r-xl border border-(--slate)/20 text-(--navy) bg-white hover:bg-(--mist) disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
            >
                <FiPlus size={15} />
            </button>
        </div>
    );
}
