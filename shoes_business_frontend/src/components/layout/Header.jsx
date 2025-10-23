import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Header component with brand, navigation, search input, and cart toggle.
 * Props:
 * - cartCount: number to display in cart badge
 * - onToggleCart: function to toggle the cart sidebar
 */
export default function Header({ cartCount = 0, onToggleCart }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <span className="brand-logo">👟</span>
          <span className="brand-name">OceanKicks</span>
        </Link>

        <nav className="nav">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/cart" className="nav-link">Cart</NavLink>
          <NavLink to="/checkout" className="nav-link">Checkout</NavLink>
        </nav>

        <div className="header-actions">
          <div className="search">
            <input type="text" placeholder="Search sneakers..." aria-label="Search sneakers" />
          </div>
          <button className="btn btn-ghost cart-btn" onClick={onToggleCart} aria-label="Toggle cart">
            <span>Cart</span>
            <span className="badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
