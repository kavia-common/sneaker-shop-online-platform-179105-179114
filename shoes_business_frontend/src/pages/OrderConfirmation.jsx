import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from '../components/common/Button';

/**
 * PUBLIC_INTERFACE
 * OrderConfirmation - Displays order ID and a brief summary after placing an order.
 */
export default function OrderConfirmation() {
  const { state } = useLocation();
  const orderId = state?.orderId;
  const name = state?.name;

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h1 className="title">Thank you{ name ? `, ${name}` : '' }!</h1>
          {orderId ? (
            <>
              <p className="description">Your order has been placed successfully.</p>
              <div className="summary-row">
                <span>Order ID</span>
                <strong>{orderId}</strong>
              </div>
            </>
          ) : (
            <p className="description">Your order information is not available.</p>
          )}
          <div style={{ height: 8 }} />
          <Button as={Link} to="/" variant="primary">Back to Home</Button>
          <div style={{ height: 8 }} />
          <Button as={Link} to="/cart" variant="ghost">View Cart</Button>
        </div>
      </div>
    </div>
  );
}
