import { useState, useEffect } from 'react';
import type { Product } from '../types/product';

const BASE = 'https://dummyjson.com';
export const PAGE_SIZE = 8;

interface UseProductsResult {
  products: Product[];
  totalPages: number;
  brands: string[];
  loading: boolean;
  error: string | null;
}

export function useProducts(
  category: string,
  search: string,
  minPrice: number | '',
  maxPrice: number | '',
  selectedBrands: string[],
  page: number,
): UseProductsResult {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const url = category
      ? `${BASE}/products/category/${encodeURIComponent(category)}?limit=0`
      : `${BASE}/products?limit=0`;

    fetch(url, { signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error('fetch failed');
        return r.json();
      })
      .then(data => {
        setAllProducts(data.products ?? []);
        setLoading(false);
      })
      .catch(e => {
        if (e.name !== 'AbortError') {
          setError('Failed to load products. Please try again.');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [category]);

  const filtered = allProducts.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (minPrice !== '' && p.price < minPrice) return false;
    if (maxPrice !== '' && p.price > maxPrice) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    return true;
  });

  const brands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))].sort();
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const products = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return { products, totalPages, brands, loading, error };
}
