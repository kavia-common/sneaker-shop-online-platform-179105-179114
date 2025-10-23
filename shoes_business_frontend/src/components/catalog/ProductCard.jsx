import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';

/**
 * PUBLIC_INTERFACE
 * ProductCard - Displays a single product in the catalog grid.
 * Props:
 * - product: { id, name, price, category, size, tag? }
 */
export default function ProductCard({ product }) {
  const { id, name, price, category, size, tag } = product;

  return (
    <Link to={`/product/${id}`} className="card product-card" aria-label={`${name}, ${category}, size ${size}`}>
      <div className="card-media product-card-media" />
      <div className="card-body product-card-body">
        <div className="product-card-top">
          <h3 className="product-name">{name}</h3>
          {tag ? <Badge tone="secondary">{tag}</Badge> : null}
        </div>
        <div className="product-meta">
          <span className="product-attr">{category}</span>
          <span className="dot">•</span>
          <span className="product-attr">Size {size}</span>
        </div>
        <div className="product-price-row">
          <span className="price">${price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    tag: PropTypes.string,
  }).isRequired,
};
