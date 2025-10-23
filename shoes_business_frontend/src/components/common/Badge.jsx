import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Badge - Themed badge component for small highlights.
 * Props:
 * - tone: 'primary' | 'secondary' | 'neutral'
 * - children: content
 * - className: extra classes
 */
export default function Badge({ tone = 'secondary', className = '', children }) {
  const base =
    'badge-ui';
  const map = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    neutral: 'badge-neutral',
  };
  const classes = [base, map[tone] ?? map.neutral, className].filter(Boolean).join(' ');
  return <span className={classes}>{children}</span>;
}

Badge.propTypes = {
  tone: PropTypes.oneOf(['primary', 'secondary', 'neutral']),
  className: PropTypes.string,
  children: PropTypes.node,
};
