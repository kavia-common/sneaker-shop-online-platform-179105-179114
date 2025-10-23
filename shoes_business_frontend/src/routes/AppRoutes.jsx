import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Catalog from '../pages/Catalog';
import ProductDetail from '../pages/ProductDetail';

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Routes for the app: catalog (home), product details, cart, checkout, and 404. */
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function CartPage() {
  return (
    <div className="container">
      <h1 className="title">Your Cart</h1>
      <p className="description">Cart page placeholder. Use the cart button to toggle the sidebar.</p>
      <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
    </div>
  );
}

function CheckoutPage() {
  return (
    <div className="container">
      <h1 className="title">Checkout</h1>
      <p className="description">
        Secure checkout placeholder. Complete your purchase with confidence.
      </p>
      <button className="btn btn-primary">Place Order</button>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="container">
      <h1 className="title">Page Not Found</h1>
      <p className="description">We couldn't find what you're looking for.</p>
      <Link to="/" className="btn btn-secondary">Back to Home</Link>
    </div>
  );
}
