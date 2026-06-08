import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { Product } from "../types/product";
import StarRow from "../components/StarRow";
import ImageGallery from "../components/ImageGallery";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";
import ReviewCard from "../components/ReviewCard";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Product not found.");
        setLoading(false);
      });
  }, [id]);

  console.log(product);

  if (loading) return <ProductDetailSkeleton />;

  if (error || !product) {
    return (
      <ErrorMessage
        message={error ?? "Product not found."}
        backLink={{ to: "/", label: "← Back to products" }}
        className="py-32"
      />
    );
  }

  return (
    <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
      <Button
        variant="outline"
        size="sm"
        label="Back"
        icon={<ArrowLeft size={14} />}
        iconPosition="left"
        onClick={() => navigate(-1)}
        className="mb-6"
      />

      <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <ImageGallery images={product.images} title={product.title} />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4 w-full md:border-l border-gray-400 md:px-6 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <StarRow rating={product.rating} />
            <span className="text-sm text-gray-500">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="font-semibold text-lg text-gray-800">
                Brand:{" "}
              </span>
              <span className="text-base text-gray-700">{product.brand}</span>
            </p>
            <p>
              <span className="font-semibold text-lg text-gray-800">
                Category:{" "}
              </span>
              <span className="text-base text-gray-700 capitalize">
                {product.category}
              </span>
            </p>
          </div>
          <div className="h-px bg-gray-400 my-2" />

          <div>
            <p className="font-semibold text-lg text-gray-800 mb-1">
              Description
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="h-px bg-gray-400 my-2" />

          {product.reviews.length > 0 && (
            <div>
              <p className="font-semibold text-lg text-gray-800 mb-3">
                Reviews
              </p>
              <div className="flex flex-col gap-4">
                {product.reviews.map((review, i) => (
                  <ReviewCard key={i} review={review} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
