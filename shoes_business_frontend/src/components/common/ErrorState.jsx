import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * ErrorState - Displays a friendly error with optional retry action.
 * Props:
 * - title?: string
 * - message?: string
 * - onRetry?: () => void
 */
export default function ErrorState({ title = 'Something went wrong', message = 'Please try again.', onRetry }) {
  return (
    <div className="card" role="alert" aria-live="assertive">
      <div className="card-body">
        <h3 style={{ color: 'var(--color-error)', marginTop: 0 }}>{title}</h3>
        <p className="description">{message}</p>
        {onRetry ? (
          <button className="btn btn-secondary" onClick={onRetry} aria-label="Retry">
            Retry
          </button>
        ) : null}
      </div>
    </div>
  );
}

ErrorState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
};
