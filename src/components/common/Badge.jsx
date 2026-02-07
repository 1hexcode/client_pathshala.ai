/**
 * Badge Component
 * Status indicators and labels
 */

const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  // Variant styles
  const variants = {
    neutral: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]',
    success: 'bg-[rgba(45,122,79,0.1)] text-[var(--color-success)]',
    warning: 'bg-[rgba(181,133,10,0.1)] text-[var(--color-warning)]',
    error: 'bg-[rgba(184,50,50,0.1)] text-[var(--color-error)]',
    info: 'bg-[rgba(37,99,168,0.1)] text-[var(--color-info)]',
    primary: 'bg-[rgba(30,58,95,0.1)] text-[var(--color-primary)]',
    accent: 'bg-[var(--color-accent-muted)] text-[var(--color-accent)]'
  };

  // Size styles
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  // Dot colors
  const dotColors = {
    neutral: 'bg-[var(--color-text-muted)]',
    success: 'bg-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]',
    error: 'bg-[var(--color-error)]',
    info: 'bg-[var(--color-info)]',
    primary: 'bg-[var(--color-primary)]',
    accent: 'bg-[var(--color-accent)]'
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-semibold uppercase tracking-wide
        rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
