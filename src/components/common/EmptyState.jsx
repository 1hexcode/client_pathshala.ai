/**
 * EmptyState Component
 * Display when no content is available
 */

import Button from './Button';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {/* Icon */}
      {Icon && (
        <div className="w-16 h-16 mb-4 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
          <Icon className="w-8 h-8 text-[var(--color-text-muted)]" />
        </div>
      )}

      {/* Title */}
      {title && (
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-2">
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p className="text-[var(--color-text-secondary)] max-w-md mb-6">
          {description}
        </p>
      )}

      {/* Action Button */}
      {(action || (actionLabel && onAction)) && (
        action || (
          <Button onClick={onAction}>
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
};

export default EmptyState;
