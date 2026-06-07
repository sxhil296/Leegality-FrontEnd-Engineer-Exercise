import { Search } from "lucide-react";
import type { Category } from "../types/product";
import Button from "./Button";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  categories: Category[];
  selectedCategory: string;
  onCategory: (slug: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPrice: (v: string) => void;
  onMaxPrice: (v: string) => void;
  onApplyPrice: () => void;
  brands: string[];
  selectedBrands: string[];
  onBrand: (brand: string) => void;
}

export default function FilterSidebar({
  search,
  onSearch,
  categories,
  selectedCategory,
  onCategory,
  minPrice,
  maxPrice,
  onMinPrice,
  onMaxPrice,
  onApplyPrice,
  brands,
  selectedBrands,
  onBrand,
}: Props) {
  return (
    <aside className="w-68 shrink-0 flex flex-col gap-5 bg-gray-100 px-8 py-6 border-right border-gray-200 min-h-[calc(100vh-64px)]">
      {/* Search */}
      <div className="relative">
        <span className="absolute inset-y-0 left-2.5 flex items-center text-gray-400 pointer-events-none">
          <Search size={14} />
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search..."
          className="w-full pl-8 pr-3 py-1.5 border border-gray-300 bg-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Categories */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Categories</p>
        <ul className="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
          <li>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === ""}
                onChange={() => onCategory("")}
                className="accent-blue-600"
              />
              <span className="text-sm text-gray-800">All</span>
            </label>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat.slug}
                  onChange={() => onCategory(cat.slug)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-800 capitalize">
                  {cat.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-gray-300 my-2" />

      {/* Price Range */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Price Range</p>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => onMinPrice(e.target.value)}
            placeholder="Min"
            min={0}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white "
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPrice(e.target.value)}
            placeholder="Max"
            min={0}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white "
          />
        </div>
        <Button
          variant="primary"
          size="sm"
          label="Apply"
          onClick={onApplyPrice}
          className="w-full"
          disabled={minPrice === "" && maxPrice === ""}
        />
      </div>

      <div className="h-px bg-gray-300 my-2" />
      {/* Brands */}
      {brands.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Brands</p>
          <ul className="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
            {brands.map((brand) => (
              <li key={brand}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => onBrand(brand)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-gray-800">{brand}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
