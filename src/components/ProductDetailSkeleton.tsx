export default function ProductDetailSkeleton() {
  return (
    <div className="px-6 py-6 animate-pulse">
      {/* Back button */}
      <div className="h-8 w-20 bg-gray-200 rounded mb-6" />

      <div className="bg-white rounded-xl p-8 flex flex-col md:flex-row gap-6">
        {/* Left — image gallery */}
        <div className="w-full max-w-1/2 flex flex-col gap-3">
          <div className="h-150 bg-gray-200 rounded-lg" />
          {/* Pagination */}
          <div className="flex items-center justify-center gap-1.5 pt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-8 h-8 bg-gray-200 rounded" />
            ))}
          </div>
        </div>

        {/* Right — info */}
        <div className="flex-1 flex flex-col gap-4 w-full max-w-1/2 px-6 py-4 border-l border-gray-200">
          {/* Title */}
          <div className="h-7 bg-gray-200 rounded w-2/3" />

          {/* Price + rating */}
          <div className="flex items-center gap-3">
            <div className="h-7 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>

          {/* Brand + category */}
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-2/5" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>

          <div className="h-px bg-gray-200 my-2" />

          {/* Description */}
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-1" />
          <div className="h-20 bg-gray-200 rounded" />

          <div className="h-px bg-gray-200 my-2" />

          {/* Reviews */}
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-1" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-gray-200 rounded w-28" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
