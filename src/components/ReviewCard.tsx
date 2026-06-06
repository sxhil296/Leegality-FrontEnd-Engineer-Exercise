import type { ProductReview } from "../types/product";
import StarRow from "./StarRow";

interface Props {
  review: ProductReview;
}

export default function ReviewCard({ review }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className="text-base font-medium text-gray-800">
          {review.reviewerName}
        </span>
        <StarRow rating={review.rating} />
        <span className="text-xs text-gray-400">
          ({review.rating.toFixed(1)})
        </span>
      </div>
      <p className="text-sm text-gray-600">{review.comment}</p>
    </div>
  );
}
