import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * CartSidebar with slide-in/out behavior.
 * Props:
 * - open: boolean to control visibility
 * - onClose: function to close sidebar
 */
export default function CartSidebar({ open, onClose }) {
  return (
    <>
      <div className={`backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`cart-sidebar ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">✕</button>
        </div>
        <div className="cart-body">
          <p className="description">Your selected items will appear here.</p>
          <div className="cart-item">
            <div className="thumb" />
            <div className="meta">
              <div className="name">Sneaker Model #1</div>
              <div className="price">$99.00</div>
            </div>
            <button className="icon-btn" aria-label="Remove item">−</button>
          </div>
        </div>
        <div className="cart-footer">
          <div className="total">
            <span>Total</span>
            <strong>$99.00</strong>
          </div>
          <Link to="/checkout" className="btn btn-primary" onClick={onClose}>Checkout</Link>
        </div>
      </aside>
    </>
  );
}
