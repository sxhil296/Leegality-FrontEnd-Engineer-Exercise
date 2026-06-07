export default function NoProductsFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-28 text-center">
      <span className="text-5xl">🔍</span>
      <p className="text-gray-600 font-medium">No products found</p>
      <p className="text-gray-400 text-sm">Try adjusting your filters</p>
    </div>
  );
}
