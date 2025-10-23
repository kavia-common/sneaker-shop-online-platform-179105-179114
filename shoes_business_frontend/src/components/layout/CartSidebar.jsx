import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../state/CartContext.jsx';

/**
 * PUBLIC_INTERFACE
 * CartSidebar with slide-in/out behavior.
 * Props:
 * - open: boolean to control visibility
 * - onClose: function to close sidebar
 */
export default function CartSidebar({ open, onClose }) {
  const { items, subtotal, removeItem, updateQty } = useCart();

  return (
    <>
      <div className={`backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`cart-sidebar ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Shopping cart panel">
        <div className="cart-header">
          <h3 style={{ margin: 0 }}>Your Cart</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">✕</button>
        </div>
        <div className="cart-body">
          {items.length === 0 ? (
            <p className="description">Your selected items will appear here.</p>
          ) : (
            <div className="cs-list">
              {items.map((i, idx) => (
                <div className="cart-item" key={`${i.id}-${i.size ?? ''}-${i.color ?? ''}-${idx}`}>
                  <div className="thumb" />
                  <div className="meta">
                    <div className="name">{i.name}</div>
                    <div className="muted">
                      {typeof i.size !== 'undefined' ? <>Size {i.size}</> : null}
                      {i.color ? <>{typeof i.size !== 'undefined' ? ' · ' : ''}{i.color}</> : null}
                    </div>
                    <div className="price">${(i.price * i.qty).toFixed(2)}</div>
                  </div>
                  <div className="qty-controls" style={{ display: 'grid', gap: 4, justifyItems: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                      <button className="btn btn-ghost" onClick={() => updateQty(i, Math.max(1, i.qty - 1))} aria-label="Decrease quantity">−</button>
                      <input
                        className="qty-input"
                        type="number"
                        min="1"
                        value={i.qty}
                        onChange={(e) => {
                          const v = parseInt(e.target.value || '1', 10);
                          updateQty(i, isNaN(v) ? 1 : Math.max(1, v));
                        }}
                        aria-label="Quantity"
                      />
                      <button className="btn btn-ghost" onClick={() => updateQty(i, i.qty + 1)} aria-label="Increase quantity">+</button>
                    </div>
                    <button className="btn btn-secondary" onClick={() => removeItem(i)} aria-label="Remove item">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="cart-footer">
          <div className="total">
            <span>Total</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <Link to="/checkout" className="btn btn-primary" onClick={onClose} aria-disabled={items.length === 0}>
            Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
