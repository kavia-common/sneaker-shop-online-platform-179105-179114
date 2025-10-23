import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import Button from '../components/common/Button';

/**
 * PUBLIC_INTERFACE
 * Cart - Displays cart items with quantity controls and subtotal.
 * Uses mock local state to represent cart items for minimal flow.
 */
export default function Cart() {
  const navigate = useNavigate();
  // Minimal mock cart state for demonstration
  const [items, setItems] = useState([
    { id: 1, name: 'Wave Runner X', price: 129, qty: 1, size: 42 },
    { id: 2, name: 'Harbor Court', price: 89, qty: 2, size: 41 },
  ]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const updateQty = (id, qty) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const goCheckout = () => {
    navigate('/checkout', { state: { cartItems: items, subtotal } });
  };

  return (
    <div className="container">
      <h1 className="title">Your Cart</h1>
      <p className="description">Review your items before checkout.</p>

      <section className="cart-page">
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
            items.map((i) => (
              <CartItem
                key={i.id}
                item={i}
                onQtyChange={(qty) => updateQty(i.id, qty)}
                onRemove={() => removeItem(i.id)}
              />
            ))
          )}
        </div>

        <aside className="cart-summary card">
          <div className="card-body">
            <h3>Order Summary</h3>
            <div className="summary-row">
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
