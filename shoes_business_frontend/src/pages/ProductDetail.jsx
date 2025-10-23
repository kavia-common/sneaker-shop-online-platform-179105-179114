import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { useCart } from '../state/CartContext.jsx';
import { fetchProductById, fetchRelatedProducts } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * ProductDetail - Product details page with image gallery, size/color selectors, validation, and related products.
 * Uses Ocean Professional theme variables for styling. Route: /product/:id
 */
export default function ProductDetail() {
  const { id } = useParams();
  const { addItem, setSidebarOpen } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [validationError, setValidationError] = useState('');

  const load = async (signal) => {
    setLoading(true);
    setErr('');
    try {
      const [p, r] = await Promise.all([
        fetchProductById(id),
        fetchRelatedProducts(id, 4),
      ]);
      if (signal?.aborted) return;
      setProduct(p);
      setRelated(r);
    } catch (e) {
      if (signal?.aborted) return;
      setErr(e?.message || 'Failed to load product.');
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [id]);

  const onAddToCart = () => {
    if (!size || !color) {
      setValidationError('Please select a size and color.');
      return;
    }
    setValidationError('');
    if (!product) return;
    addItem({ id: product.id, name: product.name, price: product.price, size, color, qty: 1 });
    setSidebarOpen(true);
  };

  const images = useMemo(() => product?.images || [], [product]);
  const sizes = useMemo(() => product?.sizes || [], [product]);
  const colors = useMemo(() => product?.colors || [], [product]);

  if (loading) {
    return (
      <div className="container">
        <Loader message="Loading product..." />
      </div>
    );
  }

  if (err) {
    return (
      <div className="container">
        <ErrorState title="Unable to load product" message={err} onRetry={() => load()} />
        <div style={{ height: 8 }} />
        <Button as={Link} to="/" variant="primary">Back to Catalog</Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <ErrorState title="Product not found" message="The requested product does not exist." />
        <div style={{ height: 8 }} />
        <Button as={Link} to="/" variant="primary">Back to Catalog</Button>
      </div>
    );
  }

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
        <span className="price price-lg">${Number(product.price || 0).toFixed(2)}</span>
      </div>

      <section className="pd-wrap">
        <ImageGallery
          images={images}
          selectedIndex={selectedImageIdx}
          onSelect={setSelectedImageIdx}
        />
        <div className="pd-info">
          <p className="description">
            {product.description || 'Premium performance sneaker inspired by the ocean: breathable mesh, cushioned midsole, and durable outsole for all-day comfort with modern style.'}
          </p>

          <div className="pd-options">
            <SizeSelector
              sizes={sizes}
              value={size}
              onChange={setSize}
            />
            <ColorSelector
              colors={colors}
              value={color}
              onChange={setColor}
            />
          </div>

          {validationError && <div className="pd-error" role="alert">{validationError}</div>}

          <div className="pd-actions">
            <Button variant="primary" size="lg" onClick={onAddToCart}>Add to Cart</Button>
            <Button variant="ghost" size="lg" as={Link} to="/">Back to Catalog</Button>
          </div>

          <div className="pd-meta">
            <div><strong>Category:</strong> {product.category}</div>
            <div><strong>SKU:</strong> OK-{String(product.id).padStart(4, '0')}</div>
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
              <div className="card-media product-card-media" role="img" aria-label={`${rp.name} - ${rp.category}`} />
              <div className="card-body product-card-body">
                <div className="product-card-top">
                  <h3 className="product-name">{rp.name}</h3>
                </div>
                <div className="product-meta">
                  <span className="product-attr">{rp.category}</span>
                </div>
                <div className="product-price-row">
                  <span className="price">${Number(rp.price || 0).toFixed(2)}</span>
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
        <div
          className="pd-hero-media"
          role="img"
          aria-label={`Main image ${selectedIndex + 1} of ${images.length || 1}`}
          aria-live="polite"
        />
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
              <div className="pd-thumb-media" role="img" aria-label={`Thumbnail ${idx + 1}`} />
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
