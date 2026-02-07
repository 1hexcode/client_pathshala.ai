/**
 * Input Component
 * Reusable input field with label and error handling
 */

import { forwardRef, useState } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  disabled = false,
  required = false,
  className = '',
  inputClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
          {label}
          {required && <span className="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3
            text-[0.9375rem] text-[var(--color-text-primary)]
            bg-[var(--color-bg-card)]
            border rounded-[var(--border-radius-sm)]
            transition-all duration-[var(--transition-fast)]
            placeholder:text-[var(--color-text-muted)]
            focus:outline-none focus:border-[var(--color-primary)]
            focus:ring-2 focus:ring-[var(--color-primary)]/10
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-bg-secondary)]
            ${error 
              ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/10' 
              : 'border-[var(--border-color)]'
            }
            ${icon && iconPosition === 'left' ? 'pl-11' : ''}
            ${icon && iconPosition === 'right' || isPassword ? 'pr-11' : ''}
            ${inputClassName}
          `}
          {...props}
        />

        {/* Right Icon or Password Toggle */}
        {(icon && iconPosition === 'right') && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            {icon}
          </div>
        )}

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
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

Input.displayName = 'Input';

export default Input;
