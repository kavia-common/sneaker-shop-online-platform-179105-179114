import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Header component with brand, navigation, search input, and cart toggle.
 * Props:
 * - cartCount: number to display in cart badge
 * - onToggleCart: function to toggle the cart sidebar
 */
export default function Header({ cartCount = 0, onToggleCart }) {
  const [open, setOpen] = useState(false);

  const toggleNav = () => setOpen(v => !v);
  const closeNav = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={closeNav}>
          <span className="brand-logo">👟</span>
          <span className="brand-name">OceanKicks</span>
        </Link>

        <button className="mobile-toggle show-sm" onClick={toggleNav} aria-label="Toggle navigation" aria-expanded={open}>
          ☰
        </button>

        <nav className={`nav ${open ? 'is-open' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={closeNav}>Home</NavLink>
          <NavLink to="/cart" className="nav-link" onClick={closeNav}>Cart</NavLink>
          <NavLink to="/checkout" className="nav-link" onClick={closeNav}>Checkout</NavLink>
        </nav>

        <div className="header-actions">
          <div className="search hide-sm">
            <input type="text" placeholder="Search sneakers..." aria-label="Search sneakers" />
          </div>
          <button className="btn btn-ghost cart-btn" onClick={() => { onToggleCart(); closeNav(); }} aria-label="Toggle cart">
            <span>Cart</span>
            <span className="badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
