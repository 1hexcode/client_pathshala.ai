/**
 * Avatar Component
 * User avatar with fallback
 */

const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  className = ''
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate color based on name
  const getColor = (name) => {
    if (!name) return 'bg-[var(--color-text-muted)]';
    const colors = [
      'bg-[var(--color-primary)]',
      'bg-[var(--color-accent)]',
      'bg-[var(--color-success)]',
      'bg-[var(--color-info)]',
      'bg-[var(--color-warning)]'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        className={`
          ${sizes[size]}
          rounded-full object-cover
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        ${sizes[size]}
        ${getColor(name)}
        rounded-full
        flex items-center justify-center
        font-medium text-white
        ${className}
      `}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
