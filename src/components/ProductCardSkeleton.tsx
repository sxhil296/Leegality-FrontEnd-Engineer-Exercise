export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 animate-pulse">
      <div className="h-52 bg-gray-200 rounded mb-3" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
}
