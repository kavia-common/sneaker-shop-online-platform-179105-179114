import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * NotFound - 404 page for unknown routes.
 */
export default function NotFound() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h1 className="title">Page Not Found</h1>
          <p className="description">We couldn't find what you're looking for.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
