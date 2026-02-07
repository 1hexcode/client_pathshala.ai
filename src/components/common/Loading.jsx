/**
 * Loading Components
 * Spinner and skeleton loaders
 */

// Spinner Component
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <svg
      className={`animate-spin ${sizes[size]} ${className}`}
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
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// Full page loading
export const LoadingPage = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 bg-[var(--color-bg-primary)] flex flex-col items-center justify-center z-50">
    <Spinner size="xl" className="text-[var(--color-primary)]" />
    <p className="mt-4 text-[var(--color-text-secondary)]">{message}</p>
  </div>
);

// Loading overlay
export const LoadingOverlay = ({ message }) => (
  <div className="absolute inset-0 bg-[var(--color-bg-card)]/80 flex flex-col items-center justify-center z-10 rounded-[var(--border-radius-md)]">
    <Spinner size="lg" className="text-[var(--color-primary)]" />
    {message && <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{message}</p>}
  </div>
);

// Skeleton Component
export const Skeleton = ({
  variant = 'text',
  width,
  height,
  className = ''
}) => {
  const variants = {
    text: 'h-4 rounded',
    title: 'h-6 rounded',
    avatar: 'rounded-full',
    thumbnail: 'rounded-[var(--border-radius-sm)]',
    card: 'rounded-[var(--border-radius-md)]'
  };

  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`
        skeleton
        bg-[var(--color-bg-secondary)]
        ${variants[variant]}
        ${variant === 'avatar' && !width ? 'w-10 h-10' : ''}
        ${variant === 'thumbnail' && !width ? 'w-full h-32' : ''}
        ${variant === 'card' && !height ? 'h-40' : ''}
        ${className}
      `}
      style={style}
    />
  );
};

// Skeleton Group for common patterns
Skeleton.Card = ({ className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    <Skeleton variant="thumbnail" />
    <Skeleton variant="title" width="70%" />
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="80%" />
  </div>
);

Skeleton.List = ({ count = 3, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-4">
        <Skeleton variant="avatar" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
    ))}
  </div>
);

Skeleton.Table = ({ rows = 5, cols = 4, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        {Array.from({ length: cols }).map((_, j) => (
          <Skeleton key={j} variant="text" className="flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export default Spinner;
