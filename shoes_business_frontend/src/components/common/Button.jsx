import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Button - Reusable button component using Ocean Professional theme variables.
 * Props:
 * - variant: 'primary' | 'secondary' | 'ghost'
 * - size: 'md' | 'sm' | 'lg'
 * - as: element type to render (button by default)
 * - to: href for Link-like usage (only if 'as' is a Link)
 * - disabled: boolean to disable interaction
 * - className: additional classes
 * - children: node
 * - onClick: click handler
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  as: As = 'button',
  to,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const base = 'btn';
  const vmap = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };
  const sm = size === 'sm' ? 'btn-sm' : '';
  const lg = size === 'lg' ? 'btn-large' : '';
  const classes = [base, vmap[variant] ?? '', sm, lg, className].filter(Boolean).join(' ');

  const commonProps = { className: classes, 'aria-disabled': disabled, ...(to ? { to } : {}), ...rest };
  if (As === 'button') {
    return (
      <button className={classes} disabled={disabled} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <As {...commonProps}>
      {children}
    </As>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  as: PropTypes.any,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
