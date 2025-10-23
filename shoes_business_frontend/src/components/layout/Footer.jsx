import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Footer with minimal links and contact placeholder.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-logo">👟</span>
          <span className="brand-name">OceanKicks</span>
        </div>
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/cart" className="footer-link">Cart</Link>
          <Link to="/checkout" className="footer-link">Checkout</Link>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} OceanKicks · All rights reserved
        </div>
      </div>
    </footer>
  );
}
