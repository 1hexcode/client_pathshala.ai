/**
 * Dropdown Component
 * Reusable dropdown menu
 */

import { useState, useRef, useEffect } from 'react';

const Dropdown = ({
  trigger,
  children,
  align = 'right',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const alignmentStyles = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2'
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {/* Menu */}
      <div
        className={`
          absolute top-full mt-2 z-50
          min-w-[200px]
          bg-[var(--color-bg-card)]
          border border-[var(--border-color)]
          rounded-[var(--border-radius-md)]
          shadow-[var(--shadow-lg)]
          transition-all duration-[var(--transition-fast)]
          ${alignmentStyles[align]}
          ${isOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-2'
          }
        `}
      >
        {children}
      </div>
    </div>
  );
};

// Dropdown Item
Dropdown.Item = ({
  children,
  icon: Icon,
  onClick,
  danger = false,
  disabled = false,
  className = ''
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      w-full flex items-center gap-3 px-4 py-2.5
      text-left text-[0.9375rem]
      transition-colors duration-[var(--transition-fast)]
      disabled:opacity-50 disabled:cursor-not-allowed
      first:rounded-t-[var(--border-radius-md)]
      last:rounded-b-[var(--border-radius-md)]
      ${danger
        ? 'text-[var(--color-error)] hover:bg-[rgba(184,50,50,0.05)]'
        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
      }
      ${className}
    `}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </button>
);

// Dropdown Divider
Dropdown.Divider = () => (
  <div className="h-px bg-[var(--border-color)] my-1" />
);

// Dropdown Header
Dropdown.Header = ({ children, className = '' }) => (
  <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] ${className}`}>
    {children}
  </div>
);

export default Dropdown;
