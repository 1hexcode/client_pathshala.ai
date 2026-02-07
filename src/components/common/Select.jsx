/**
 * Select Component
 * Custom styled select dropdown
 */

import { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  options = [],
  placeholder = 'Select an option',
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
          {label}
          {required && <span className="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}

      {/* Select Container */}
      <div className="relative">
        <select
          ref={ref}
          disabled={disabled}
          className={`
            w-full px-4 py-3 pr-10
            text-[0.9375rem] text-[var(--color-text-primary)]
            bg-[var(--color-bg-card)]
            border rounded-[var(--border-radius-sm)]
            appearance-none cursor-pointer
            transition-all duration-[var(--transition-fast)]
            focus:outline-none focus:border-[var(--color-primary)]
            focus:ring-2 focus:ring-[var(--color-primary)]/10
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-bg-secondary)]
            ${error 
              ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/10' 
              : 'border-[var(--border-color)]'
            }
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg 
            className="w-5 h-5 text-[var(--color-text-muted)]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Helper Text or Error */}
      {(helperText || error) && (
        <p className={`mt-1.5 text-sm ${error ? 'text-[var(--color-error)]' : 'text-[var(--color-text-muted)]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
