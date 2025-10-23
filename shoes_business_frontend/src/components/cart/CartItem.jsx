import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * CartItem - Renders an item in the cart with quantity controls and remove.
 * Props:
 * - item: { id, name, price, qty, size? }
 * - onQtyChange: (qty: number) => void
 * - onRemove: () => void
 */
export default function CartItem({ item, onQtyChange, onRemove }) {
  const { name, price, qty, size } = item;

  const dec = () => onQtyChange(Math.max(1, qty - 1));
  const inc = () => onQtyChange(qty + 1);

  return (
    <div className="cart-line card">
      <div className="card-body">
        <div className="cart-line-inner">
          <div className="cart-thumb" />
          <div className="cart-meta">
            <div className="cart-name">{name}</div>
            <div className="cart-submeta">
              {typeof size !== 'undefined' ? <span className="muted">Size {size}</span> : null}
            </div>
            <div className="cart-price price">${price.toFixed(2)}</div>
          </div>

          <div className="cart-qty">
            <button className="btn btn-ghost" onClick={dec} aria-label="Decrease quantity">−</button>
            <input
              className="qty-input"
              type="number"
              min="1"
              value={qty}
              onChange={(e) => {
                const v = parseInt(e.target.value || '1', 10);
                onQtyChange(isNaN(v) ? 1 : Math.max(1, v));
              }}
              aria-label="Quantity"
            />
            <button className="btn btn-ghost" onClick={inc} aria-label="Increase quantity">+</button>
          </div>

          <button className="btn btn-secondary" onClick={onRemove} aria-label="Remove item">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onQtyChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
