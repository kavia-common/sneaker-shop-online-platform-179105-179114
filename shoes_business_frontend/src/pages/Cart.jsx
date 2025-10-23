import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import Button from '../components/common/Button';
import { useCart } from '../state/CartContext.jsx';

/**
 * PUBLIC_INTERFACE
 * Cart - Displays cart items with quantity controls and subtotal using global cart state.
 */
export default function Cart() {
  const navigate = useNavigate();
  const { items, subtotal, updateQty, removeItem } = useCart();

  const goCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container">
      <h1 className="title">Your Cart</h1>
      <p className="description">Review your items before checkout.</p>

      <section className="cart-page split">
        <div className="cart-list">
          {items.length === 0 ? (
            <div className="card">
              <div className="card-body">
                <h3>Cart is empty</h3>
                <p className="description">Browse the catalog to add items to your cart.</p>
                <Button as={Link} to="/" variant="primary">Back to Catalog</Button>
              </div>
            </div>
          ) : (
            items.map((i, idx) => (
              <CartItem
                key={`${i.id}-${i.size ?? ''}-${i.color ?? ''}-${idx}`}
                item={i}
                onQtyChange={(qty) => updateQty(i, qty)}
                onRemove={() => removeItem(i)}
              />
            ))
          )}
        </div>

        <aside className="cart-summary card" aria-label="Order summary">
          <div className="card-body">
            <h3>Order Summary</h3>
            <div className="summary-row" aria-live="polite" aria-atomic="true">
              <span>Subtotal</span>
              <strong className="price">${subtotal.toFixed(2)}</strong>
            </div>
            <p className="description">Taxes and delivery are calculated at checkout.</p>
            <Button variant="primary" size="lg" onClick={goCheckout} disabled={items.length === 0}>
              Proceed to Checkout
            </Button>
            <div style={{ height: 8 }} />
            <Button as={Link} to="/" variant="ghost">Continue Shopping</Button>
          </div>
        </aside>
      </section>
    </div>
  );
}
