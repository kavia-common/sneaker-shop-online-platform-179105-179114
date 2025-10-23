import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/catalog/ProductCard';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { fetchProducts } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Catalog page - Renders a filterable/sortable product grid.
 * Now integrates with api.js and handles loading and error states.
 */
export default function Catalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [size, setSize] = useState('All');
  const [sort, setSort] = useState('price-asc');

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async (signal) => {
    setLoading(true);
    setError('');
    try {
      const list = await fetchProducts({
        q: query,
        category,
        size,
        sort,
      });
      if (signal?.aborted) return;
      setItems(list);
    } catch (e) {
      if (signal?.aborted) return;
      setError(e?.message || 'Failed to load products.');
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
    // Trigger fetch when filters change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, size, sort]);

  const categories = useMemo(() => {
    const set = new Set(items.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [items]);

  const sizes = useMemo(() => {
    const set = new Set(items.map(p => String(p.size ?? '')).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [items]);

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setSize('All');
    setSort('price-asc');
  };

  return (
    <div className="container">
      <h1 className="title">Catalog</h1>
      <p className="description">Discover premium sneakers with ocean-inspired style.</p>

      <section className="filter-bar" aria-label="Filter products">
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label" htmlFor="q">Search</label>
            <input
              id="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="filter-input"
              placeholder="Search by name..."
              aria-label="Search products by name"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="filter-select"
              aria-label="Filter by category"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="size">Size</label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="filter-select"
              aria-label="Filter by size"
            >
              {sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="sort">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="filter-select"
              aria-label="Sort by price"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="filter-actions">
            <Button variant="ghost" onClick={resetFilters}>Reset</Button>
          </div>
        </div>
      </section>

      {loading && (
        <Loader message="Loading products..." />
      )}

      {!loading && error && (
        <ErrorState
          title="Unable to load products"
          message={error}
          onRetry={() => load()}
        />
      )}

      {!loading && !error && (
        <div className="grid grid-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {items.length === 0 && (
            <div className="empty-state card" role="status">
              <div className="card-body">
                <h3>No results</h3>
                <p className="description">Try adjusting the filters or search query.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
