/**
 * SearchInput Component
 * Search input with icon and clear button
 */

import { useState, forwardRef } from 'react';

const SearchInput = forwardRef(({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  onClear,
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const [localValue, setLocalValue] = useState(value || '');
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : localValue;

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setLocalValue(newValue);
    }
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) {
      setLocalValue('');
    }
    onClear?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(currentValue);
    }
  };

  const sizes = {
    sm: 'py-2 pl-9 pr-8 text-sm',
    md: 'py-2.5 pl-10 pr-10 text-[0.9375rem]',
    lg: 'py-3 pl-12 pr-12 text-base'
  };

  const iconSizes = {
    sm: 'w-4 h-4 left-2.5',
    md: 'w-5 h-5 left-3',
    lg: 'w-5 h-5 left-4'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Icon */}
      <svg
        className={`absolute top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] ${iconSizes[size]}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* Input */}
      <input
        ref={ref}
        type="text"
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`
          w-full
          bg-[var(--color-bg-card)]
          border border-[var(--border-color)]
          rounded-[var(--border-radius-sm)]
          text-[var(--color-text-primary)]
          placeholder:text-[var(--color-text-muted)]
          transition-all duration-[var(--transition-fast)]
          focus:outline-none focus:border-[var(--color-primary)]
          focus:ring-2 focus:ring-[var(--color-primary)]/10
          ${sizes[size]}
        `}
        {...props}
      />

      {/* Clear Button */}
      {currentValue && (
        <button
          onClick={handleClear}
          className={`
            absolute top-1/2 -translate-y-1/2 right-3
            p-1 rounded-full
            text-[var(--color-text-muted)]
            hover:text-[var(--color-text-secondary)]
            hover:bg-[var(--color-bg-secondary)]
            transition-colors
          `}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
