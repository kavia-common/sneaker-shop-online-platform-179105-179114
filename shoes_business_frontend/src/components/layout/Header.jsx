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
    <header className="header" role="banner">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={closeNav} aria-label="OceanKicks home">
          <span className="brand-logo" aria-hidden="true">👟</span>
          <span className="brand-name">OceanKicks</span>
        </Link>

        <button
          className="mobile-toggle show-sm"
          onClick={toggleNav}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="primary-navigation"
        >
          ☰
        </button>

        <nav
          id="primary-navigation"
          className={`nav ${open ? 'is-open' : ''}`}
          role="navigation"
          aria-label="Primary"
        >
          <NavLink to="/" className="nav-link" onClick={closeNav}>Home</NavLink>
          <NavLink to="/cart" className="nav-link" onClick={closeNav}>Cart</NavLink>
          <NavLink to="/checkout" className="nav-link" onClick={closeNav}>Checkout</NavLink>
        </nav>

        <div className="header-actions">
          <div className="search hide-sm" role="search">
            <input type="text" placeholder="Search sneakers..." aria-label="Search sneakers" />
          </div>
          <button
            className="btn btn-ghost cart-btn"
            onClick={() => { onToggleCart(); closeNav(); }}
            aria-label={`Open cart. ${cartCount} item${cartCount === 1 ? '' : 's'} in cart.`}
          >
            <span>Cart</span>
            <span className="badge" aria-live="polite" aria-atomic="true">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
