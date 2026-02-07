/**
 * Button Component
 * Reusable button with multiple variants
 */

import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  ...props
}, ref) => {
  // Variant styles
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]',
    secondary: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--border-color)] hover:bg-[var(--color-bg-secondary)]',
    accent: 'bg-[var(--color-accent)] text-[var(--color-primary-dark)] hover:bg-[var(--color-accent-light)]',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]',
    danger: 'bg-[var(--color-error)] text-white hover:opacity-90',
    outline: 'bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
  };

  // Size styles
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-[0.9375rem]',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-[var(--border-radius-sm)]
    transition-all duration-[var(--transition-fast)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
