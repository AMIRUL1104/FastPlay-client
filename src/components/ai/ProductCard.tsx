import Link from "next/link";
import Image from "next/image";
import { Product } from "@/src/types/product.type";


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, brand, price, stock, image, slug } = product;

  return (
    <div className="flex-shrink-0 w-44 bg-white rounded-xl border border-[#E8E8EE] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="relative w-full h-28 bg-(--cream)">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-2"
          sizes="176px"
        />
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1">
        <p
          className="text-xs font-semibold text-(--navy) leading-tight line-clamp-2"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {name}
        </p>

        <p className="text-[11px] text-(--slate-muted)" style={{ fontFamily: "Inter, sans-serif" }}>
          {brand}
        </p>

        <div className="flex items-center justify-between mt-0.5">
          <span
            className="text-sm font-bold text-(--copper)"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            ৳{price.toLocaleString()}
          </span>
          <span
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${stock > 0
                ? "bg-(--mist) text-(--navy)"
                : "bg-red-50 text-red-500"
              }`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {stock > 0 ? `${stock} left` : "Out"}
          </span>
        </div>

        <Link
          href={`/products/${slug}`}
          className="mt-1.5 w-full text-center text-[11px] font-semibold text-white bg-(--navy) hover:bg-(--navy-deep) transition-colors duration-150 rounded-lg py-1.5"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
