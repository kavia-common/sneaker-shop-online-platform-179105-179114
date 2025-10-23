import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';

/**
 * PUBLIC_INTERFACE
 * CheckoutForm - Collects name, phone, address, and delivery option with validation.
 * Props:
 * - onSubmit: (payload: { name, phone, address, delivery }) => void
 */
export default function CheckoutForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState('standard');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!phone.trim() || !/^\+?[0-9\-() ]{7,}$/.test(phone)) e.phone = 'Valid phone is required';
    if (!address.trim()) e.address = 'Address is required';
    if (!delivery) e.delivery = 'Delivery option is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit({ name, phone, address, delivery });
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            id="name"
            className={`form-input ${errors.name ? 'error' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            autoComplete="name"
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="phone">Phone</label>
          <input
            id="phone"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 123 4567"
            autoComplete="tel"
          />
          {errors.phone && <div className="form-error">{errors.phone}</div>}
        </div>

        <div className="form-field form-col-span">
          <label className="form-label" htmlFor="address">Address</label>
          <textarea
            id="address"
            className={`form-input ${errors.address ? 'error' : ''}`}
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, City, ZIP"
            autoComplete="street-address"
          />
          {errors.address && <div className="form-error">{errors.address}</div>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="delivery">Delivery</label>
          <select
            id="delivery"
            className={`form-input ${errors.delivery ? 'error' : ''}`}
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
          >
            <option value="standard">Standard (3-5 days)</option>
            <option value="express">Express (1-2 days)</option>
            <option value="pickup">Store Pickup (Free)</option>
          </select>
          {errors.delivery && <div className="form-error">{errors.delivery}</div>}
        </div>
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary" size="lg">Place Order</Button>
        <Button as="a" href="/" variant="ghost">Back to Catalog</Button>
      </div>
    </form>
  );
}

CheckoutForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
