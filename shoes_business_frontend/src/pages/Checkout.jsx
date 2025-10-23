import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import Button from '../components/common/Button';
import { useCart } from '../state/CartContext.jsx';

/**
 * PUBLIC_INTERFACE
 * Checkout - Collects customer details and delivery option, shows order summary,
 * validates, and places a mock order with generated ID, then clears cart data and navigates to confirmation.
 */
export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();

  const onPlaceOrder = (payload) => {
    const orderId = 'OK-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    clearCart();
    navigate('/order-confirmation', {
      state: {
        orderId,
        name: payload.name,
      },
      replace: true,
    });
  };

  if (!items || items.length === 0) {
    return (
      <div className="container">
        <h1 className="title">Checkout</h1>
        <p className="description">Your cart is empty.</p>
        <Button as={Link} to="/" variant="primary">Back to Catalog</Button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Checkout</h1>
      <p className="description">Enter your details and confirm your order.</p>

      <section className="checkout-wrap split">
        <div className="checkout-left card">
          <div className="card-body">
            <CheckoutForm onSubmit={onPlaceOrder} />
          </div>
        </div>

        <aside className="checkout-right card">
          <div className="card-body">
            <OrderSummary items={items} subtotal={subtotal} />
          </div>
        </aside>
      </section>
    </div>
  );
}
