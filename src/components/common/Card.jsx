/**
 * Card Component
 * Reusable card container with multiple variants
 */

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  className = '',
  onClick,
  ...props
}) => {
  // Padding options
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  // Variant styles
  const variants = {
    default: 'bg-[var(--color-bg-card)] border border-[var(--border-color)]',
    elevated: 'bg-[var(--color-bg-card)] shadow-[var(--shadow-md)]',
    outlined: 'bg-transparent border-2 border-[var(--border-color)]',
    filled: 'bg-[var(--color-bg-secondary)]'
  };

  const interactiveStyles = interactive
    ? 'cursor-pointer hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 active:translate-y-0'
    : '';

  return (
    <div
      className={`
        rounded-[var(--border-radius-md)]
        transition-all duration-[var(--transition-base)]
        ${variants[variant]}
        ${paddings[padding]}
        ${interactiveStyles}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header component
Card.Header = ({ children, className = '', ...props }) => (
  <div 
    className={`border-b border-[var(--border-color)] pb-4 mb-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Card Title component
Card.Title = ({ children, className = '', as: Component = 'h3', ...props }) => (
  <Component
    className={`font-display text-xl font-semibold text-[var(--color-text-primary)] ${className}`}
    {...props}
  >
    {children}
  </Component>
);

// Card Description component
Card.Description = ({ children, className = '', ...props }) => (
  <p
    className={`text-[var(--color-text-secondary)] mt-1 ${className}`}
    {...props}
  >
    {children}
  </p>
);

// Card Body component
Card.Body = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Card Footer component
Card.Footer = ({ children, className = '', ...props }) => (
  <div
    className={`border-t border-[var(--border-color)] pt-4 mt-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;
