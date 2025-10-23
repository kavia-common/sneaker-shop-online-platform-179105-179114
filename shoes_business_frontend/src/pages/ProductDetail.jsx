import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/common/Button';

/**
 * PUBLIC_INTERFACE
 * ProductDetail - Product details page with image gallery, size/color selectors, validation, and related products.
 * Uses Ocean Professional theme variables for styling. Route: /product/:id
 */
export default function ProductDetail() {
  const { id } = useParams();

  // Mocked product dataset; in a later step this can be replaced by API layer
  const allProducts = useMemo(
    () => ([
      { id: 1, name: 'Wave Runner X', price: 129, category: 'Running', sizes: [40, 41, 42, 43, 44], colors: ['Navy', 'White', 'Black'], images: [1, 2, 3] },
      { id: 2, name: 'Harbor Court', price: 89, category: 'Casual', sizes: [39, 41, 42], colors: ['White', 'Tan'], images: [1, 2] },
      { id: 3, name: 'Aqua Sprint', price: 149, category: 'Running', sizes: [42, 44, 45], colors: ['Teal', 'Gray'], images: [1, 2, 3, 4] },
      { id: 4, name: 'Coastline Pro', price: 199, category: 'Basketball', sizes: [44, 45, 46], colors: ['Black', 'Gold'], images: [1] },
      { id: 5, name: 'Breeze Lite', price: 79, category: 'Casual', sizes: [40, 41], colors: ['White', 'Blue'], images: [1, 2] },
      { id: 6, name: 'Marina Glide', price: 159, category: 'Training', sizes: [41, 42, 43], colors: ['Blue', 'Gray'], images: [1, 2, 3] },
      { id: 7, name: 'Tide High', price: 119, category: 'Basketball', sizes: [43, 44], colors: ['Black', 'White'], images: [1, 2] },
      { id: 8, name: 'Pier Street', price: 99, category: 'Casual', sizes: [42, 43], colors: ['White', 'Green'], images: [1, 2, 3] },
    ]),
    []
  );

  const product = useMemo(
    () => allProducts.find(p => String(p.id) === String(id)) || allProducts[0],
    [allProducts, id]
  );

  // Related: same category or price proximity
  const related = useMemo(() => {
    const sameCategory = allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    if (sameCategory.length >= 3) return sameCategory;
    // fallback to fill with other items
    const filler = allProducts.filter(p => p.id !== product.id).slice(0, Math.max(0, 4 - sameCategory.length));
    return [...sameCategory, ...filler];
  }, [allProducts, product]);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState('');

  const onAddToCart = () => {
    if (!size || !color) {
      setError('Please select a size and color.');
      return;
    }
    setError('');
    // Future integration: dispatch add to cart action here
    alert(`Added "${product.name}" (Size ${size}, Color ${color}) to cart!`);
  };

  return (
    <div className="container">
      <nav aria-label="Breadcrumb" className="pd-breadcrumb">
        <Link to="/" className="pd-crumb">Home</Link>
        <span className="pd-sep">/</span>
        <Link to="/" className="pd-crumb">{product.category}</Link>
        <span className="pd-sep">/</span>
        <span className="pd-crumb active">{product.name}</span>
      </nav>

      <div className="pd-header">
        <h1 className="title">{product.name}</h1>
        <span className="price price-lg">${product.price.toFixed(2)}</span>
      </div>

      <section className="pd-wrap">
        <ImageGallery
          images={product.images}
          selectedIndex={selectedImageIdx}
          onSelect={setSelectedImageIdx}
        />
        <div className="pd-info">
          <p className="description">
            Premium performance sneaker inspired by the ocean: breathable mesh, cushioned midsole,
            and durable outsole for all-day comfort with modern style.
          </p>

          <div className="pd-options">
            <SizeSelector
              sizes={product.sizes}
              value={size}
              onChange={setSize}
            />
            <ColorSelector
              colors={product.colors}
              value={color}
              onChange={setColor}
            />
          </div>

          {error && <div className="pd-error" role="alert">{error}</div>}

          <div className="pd-actions">
            <Button variant="primary" size="lg" onClick={onAddToCart}>Add to Cart</Button>
            <Button variant="ghost" size="lg" as={Link} to="/">Back to Catalog</Button>
          </div>

          <div className="pd-meta">
            <div><strong>Category:</strong> {product.category}</div>
            <div><strong>SKU:</strong> OK-{product.id.toString().padStart(4, '0')}</div>
          </div>
        </div>
      </section>

      <section className="pd-related">
        <div className="pd-related-header">
          <h2 className="subtitle">Related products</h2>
          <p className="description">You might also like these similar styles.</p>
        </div>
        <div className="grid">
          {related.map((rp) => (
            <Link to={`/product/${rp.id}`} key={rp.id} className="card product-card" aria-label={`${rp.name}, ${rp.category}`}>
              <div className="card-media product-card-media" />
              <div className="card-body product-card-body">
                <div className="product-card-top">
                  <h3 className="product-name">{rp.name}</h3>
                </div>
                <div className="product-meta">
                  <span className="product-attr">{rp.category}</span>
                </div>
                <div className="product-price-row">
                  <span className="price">${rp.price.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * ImageGallery - Displays a large image with thumbnails.
 */
function ImageGallery({ images = [], selectedIndex = 0, onSelect = () => {} }) {
  return (
    <div className="pd-gallery">
      <div className="pd-hero" aria-label="Product image">
        {/* Placeholder hero image surface; could be an <img src=...> in real integration */}
        <div className="pd-hero-media" />
      </div>
      <div className="pd-thumbs" role="list">
        {images.map((_, idx) => {
          const active = idx === selectedIndex;
          return (
            <button
              key={idx}
              className={`pd-thumb ${active ? 'active' : ''}`}
              aria-label={`Show image ${idx + 1}`}
              aria-pressed={active}
              onClick={() => onSelect(idx)}
            >
              <div className="pd-thumb-media" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * SizeSelector - Button group for selecting size.
 */
function SizeSelector({ sizes = [], value, onChange }) {
  return (
    <div className="pd-field">
      <label className="pd-label">Size</label>
      <div className="pd-choice-row" role="group" aria-label="Select size">
        {sizes.map((s) => {
          const active = String(value) === String(s);
          return (
            <button
              key={s}
              className={`pd-chip ${active ? 'active' : ''}`}
              onClick={() => onChange(s)}
              aria-pressed={active}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * ColorSelector - Button group for selecting color.
 */
function ColorSelector({ colors = [], value, onChange }) {
  return (
    <div className="pd-field">
      <label className="pd-label">Color</label>
      <div className="pd-choice-row" role="group" aria-label="Select color">
        {colors.map((c) => {
          const active = String(value) === String(c);
          return (
            <button
              key={c}
              className={`pd-chip ${active ? 'active' : ''}`}
              onClick={() => onChange(c)}
              aria-pressed={active}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
