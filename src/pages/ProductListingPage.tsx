import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import Button from "../components/Button";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import NoProductsFound from "../components/NoProductsFound";

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const category = searchParams.get("category") ?? "";
  const search = searchParams.get("search") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const selectedBrands = searchParams.get("brands")?.split(",").filter(Boolean) ?? [];

  const [minPriceInput, setMinPriceInput] = useState(searchParams.get("minPrice") ?? "");
  const [maxPriceInput, setMaxPriceInput] = useState(searchParams.get("maxPrice") ?? "");
  const [appliedMin, setAppliedMin] = useState<number | "">(
    searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : ""
  );
  const [appliedMax, setAppliedMax] = useState<number | "">(
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : ""
  );

  const { products, totalPages, brands, loading, error } = useProducts(
    category, search, appliedMin, appliedMax, selectedBrands, page
  );
  const { categories } = useCategories();

  const setParam = (key: string, value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value); else next.delete(key);
      next.set("page", "1");
      return next;
    }, { replace: true });
  };

  const handleCategory = (slug: string) => setParam("category", slug);
  const handleSearch = (v: string) => setParam("search", v);

  const handleBrand = (brand: string) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setParam("brands", next.join(","));
  };

  const handleApplyPrice = () => {
    setAppliedMin(minPriceInput !== "" ? Number(minPriceInput) : "");
    setAppliedMax(maxPriceInput !== "" ? Number(maxPriceInput) : "");
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (minPriceInput) next.set("minPrice", minPriceInput); else next.delete("minPrice");
      if (maxPriceInput) next.set("maxPrice", maxPriceInput); else next.delete("maxPrice");
      next.set("page", "1");
      return next;
    }, { replace: true });
  };

  const handlePage = (p: number) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

  const activeFilterCount = [
    category,
    appliedMin !== "" ? "min" : "",
    appliedMax !== "" ? "max" : "",
    ...selectedBrands,
  ].filter(Boolean).length;

  return (
    <div className=" flex">
      {/* Filter sidebar — animated slide in/out */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showFilters ? "w-68 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <FilterSidebar
          search={search}
          onSearch={handleSearch}
          categories={categories}
          selectedCategory={category}
          onCategory={handleCategory}
          minPrice={minPriceInput}
          maxPrice={maxPriceInput}
          onMinPrice={setMinPriceInput}
          onMaxPrice={setMaxPriceInput}
          onApplyPrice={handleApplyPrice}
          brands={brands}
          selectedBrands={selectedBrands}
          onBrand={handleBrand}
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-4 px-6 py-6 min-h-[calc(100vh-64px)]">
        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <Button
            variant={showFilters ? "primary" : "outline"}
            size="sm"
            icon={showFilters ? <X size={14} /> : <SlidersHorizontal size={14} />}
            iconPosition="left"
            onClick={() => setShowFilters(v => !v)}
         
          >
            <div className="flex items-center gap-2 justify-center">
                  Filters
            {!showFilters && activeFilterCount > 0 && (
              <span className=" w-4 h-4 text-[10px] font-bold bg-blue-600 text-white rounded flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            </div>
        
          </Button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : products.length === 0 ? (
          <NoProductsFound />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-auto">
          <Pagination page={page} totalPages={totalPages} onChange={handlePage} />
        </div>
      </div>
    </div>
  );
}
