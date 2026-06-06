import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import StarRow from "./StarRow";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg p-4 flex flex-col gap-3 hover:shadow-md transition-shadow border border-gray-200"
    >
      <div className="flex items-center justify-center h-52">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-gray-900">
            ${product.price}
          </span>
          <StarRow rating={product.rating} />
          <span className="text-xs text-gray-500">
            ({product.rating.toFixed(1)})
          </span>
        </div>
      </div>
    </Link>
  );
}
