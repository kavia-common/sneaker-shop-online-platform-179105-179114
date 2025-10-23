import React, { useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import Button from '../components/common/Button';

/**
 * PUBLIC_INTERFACE
 * Checkout - Collects customer details and delivery option, shows order summary,
 * validates, and places a mock order with generated ID, then clears cart data and navigates to confirmation.
 */
export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cartItems = useMemo(() => state?.cartItems ?? [], [state]);
  const subtotal = useMemo(
    () => (state?.subtotal != null ? state.subtotal : cartItems.reduce((s, i) => s + i.price * i.qty, 0)),
    [state, cartItems]
  );

  const onPlaceOrder = (payload) => {
    // Basic mock "place order"
    const orderId = 'OK-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    // In a real app, clear cart in global state or storage. Here, we just navigate and pass state.
    navigate('/order-confirmation', {
      state: {
        orderId,
        name: payload.name,
        phone: payload.phone,
        address: payload.address,
        delivery: payload.delivery,
        cartItems,
        subtotal,
      },
      replace: true,
    });
  };

  if (!cartItems || cartItems.length === 0) {
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

      <section className="checkout-wrap">
        <div className="checkout-left card">
          <div className="card-body">
            <CheckoutForm onSubmit={onPlaceOrder} />
          </div>
        </div>

        <aside className="checkout-right card">
          <div className="card-body">
            <OrderSummary items={cartItems} subtotal={subtotal} />
          </div>
        </aside>
      </section>
    </div>
  );
}
