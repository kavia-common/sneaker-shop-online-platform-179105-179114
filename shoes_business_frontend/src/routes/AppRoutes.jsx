import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Catalog from '../pages/Catalog';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';
import NotFound from '../pages/NotFound';

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
