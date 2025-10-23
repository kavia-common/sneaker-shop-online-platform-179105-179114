import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Loader - Reusable loading indicator with optional message.
 * Props:
 * - message?: string - optional text to show under spinner
 * - size?: 'sm' | 'md' | 'lg' - visual size of spinner
 * - className?: string - additional classes
 */
export default function Loader({ message = 'Loading...', size = 'md', className = '' }) {
  const sizeMap = {
    sm: 18,
    md: 28,
    lg: 40,
  };
  const px = sizeMap[size] ?? sizeMap.md;

  return (
    <div className={`loader-wrap ${className}`} role="status" aria-live="polite" aria-busy="true">
      <div
        className="spinner"
        style={{
          width: px,
          height: px,
          border: '3px solid rgba(37,99,235,0.15)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '999px',
          animation: 'spin 0.9s linear infinite',
          margin: '0 auto',
        }}
      />
      {message ? <div className="description" style={{ textAlign: 'center', marginTop: 8 }}>{message}</div> : null}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
