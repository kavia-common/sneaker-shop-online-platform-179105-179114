import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * OrderSummary - Shows a list of items and subtotal for checkout.
 * Props:
 * - items: Array<{ id, name, qty, price }>
 * - subtotal: number
 */
export default function OrderSummary({ items = [], subtotal = 0 }) {
  const totalItems = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <p className="description">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>

      <div className="os-list">
        {items.map(i => (
          <div className="os-line" key={i.id}>
            <div className="os-meta">
              <div className="os-name">{i.name}</div>
              <div className="muted">Qty {i.qty}</div>
            </div>
            <div className="os-price">${(i.price * i.qty).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="summary-row">
        <span>Subtotal</span>
        <strong className="price">${subtotal.toFixed(2)}</strong>
      </div>
      <div className="summary-row muted">
        <span>Delivery</span>
        <span>Calculated at next step</span>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string,
    qty: PropTypes.number,
    price: PropTypes.number,
  })),
  subtotal: PropTypes.number,
};
