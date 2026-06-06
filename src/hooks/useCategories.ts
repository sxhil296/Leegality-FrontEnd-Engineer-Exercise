import { useState, useEffect } from 'react';
import type { Category } from '../types/product';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(r => r.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { categories, loading };
}
