/**
 * Sidebar Component
 * Reusable sidebar for various pages
 */

import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({
  items = [],
  title,
  collapsible = false,
  className = ''
}) => {
  const location = useLocation();

  return (
    <aside className={`
      w-64 flex-shrink-0
      bg-[var(--color-bg-card)]
      border-r border-[var(--border-color)]
      ${className}
    `}>
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4">
        {/* Title */}
        {title && (
          <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-4 px-2">
            {title}
          </h2>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1">
          {items.map((item, index) => {
            // Check if it's a section header
            if (item.type === 'header') {
              return (
                <div key={index} className="pt-4 pb-2 px-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    {item.label}
                  </h3>
                </div>
              );
            }

            // Check if it's a divider
            if (item.type === 'divider') {
              return (
                <div key={index} className="my-3 h-px bg-[var(--border-color)]" />
              );
            }

            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={index}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5
                  rounded-[var(--border-radius-sm)]
                  text-sm font-medium
                  transition-colors duration-[var(--transition-fast)]
                  ${isActive
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
                  }
                `}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs bg-[var(--color-bg-tertiary)] rounded-full">
                    {item.badge}
                  </span>
                )}
                {item.children && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

// Chat Sidebar variant
Sidebar.Chat = ({ conversations, currentConversation, onSelectConversation, onNewChat }) => {
  return (
    <aside className="w-72 flex-shrink-0 bg-[var(--color-bg-secondary)] border-r border-[var(--border-color)] h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-color)]">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--color-primary)] text-white rounded-[var(--border-radius-sm)] hover:bg-[var(--color-primary-light)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`
                w-full text-left px-3 py-2.5 rounded-[var(--border-radius-sm)]
                transition-colors duration-[var(--transition-fast)]
                ${currentConversation === conv.id
                  ? 'bg-[var(--color-bg-card)] shadow-sm'
                  : 'hover:bg-[var(--color-bg-card)]/50'
                }
              `}
            >
              <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                {conv.title}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                {conv.subject}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border-color)]">
        <p className="text-xs text-[var(--color-text-muted)] text-center">
          AI responses are from mock data
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
