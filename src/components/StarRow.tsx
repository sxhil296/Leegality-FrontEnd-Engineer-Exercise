import { Star } from "lucide-react";

export default function StarRow({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < full || (i === full && half)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300 fill-gray-300"
          }
        />
      ))}
    </span>
  );
}
