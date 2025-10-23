import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Catalog from '../pages/Catalog';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Routes for the app: catalog (home), product details, cart, checkout, order confirmation, and 404. */
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
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
