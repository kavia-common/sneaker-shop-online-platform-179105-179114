import React, { useMemo, useState } from 'react';
import ProductCard from '../components/catalog/ProductCard';
import Button from '../components/common/Button';

/**
 * PUBLIC_INTERFACE
 * Catalog page - Renders a filterable/sortable product grid.
 * Local state handles:
 * - query: text search (optional)
 * - category: filter by category
 * - size: filter by size
 * - sort: 'price-asc' | 'price-desc'
 */
export default function Catalog() {
  // Mock catalog dataset for UI; replace later with API integration.
  const products = useMemo(
    () => ([
      { id: 1, name: 'Wave Runner X', price: 129, category: 'Running', size: 42, tag: 'New' },
      { id: 2, name: 'Harbor Court', price: 89, category: 'Casual', size: 41, tag: 'Hot' },
      { id: 3, name: 'Aqua Sprint', price: 149, category: 'Running', size: 44 },
      { id: 4, name: 'Coastline Pro', price: 199, category: 'Basketball', size: 45, tag: 'Pro' },
      { id: 5, name: 'Breeze Lite', price: 79, category: 'Casual', size: 40 },
      { id: 6, name: 'Marina Glide', price: 159, category: 'Training', size: 43 },
      { id: 7, name: 'Tide High', price: 119, category: 'Basketball', size: 44 },
      { id: 8, name: 'Pier Street', price: 99, category: 'Casual', size: 42 },
    ]),
    []
  );

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map(p => p.category)))],
    [products]
  );
  const sizes = useMemo(
    () => ['All', ...Array.from(new Set(products.map(p => String(p.size))))],
    [products]
  );

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [size, setSize] = useState('All');
  const [sort, setSort] = useState('price-asc');

  const filteredSorted = useMemo(() => {
    let list = [...products];

    // filter by category
    if (category !== 'All') {
      list = list.filter(p => p.category === category);
    }
    // filter by size
    if (size !== 'All') {
      list = list.filter(p => String(p.size) === size);
    }
    // simple text search in name
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    // sort
    list.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return 0;
    });
    return list;
  }, [products, category, size, query, sort]);

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

      <div className="grid">
        {filteredSorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filteredSorted.length === 0 && (
          <div className="empty-state card" role="status">
            <div className="card-body">
              <h3>No results</h3>
              <p className="description">Try adjusting the filters or search query.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
