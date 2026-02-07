/**
 * Breadcrumb Component
 * Navigation breadcrumbs
 */

import { Link } from 'react-router-dom';

const Breadcrumb = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <svg 
                  className="w-4 h-4 text-[var(--color-text-muted)]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              
              {isLast ? (
                <span className="font-medium text-[var(--color-text-primary)]">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
