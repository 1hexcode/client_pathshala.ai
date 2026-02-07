/**
 * Tabs Component
 * Tabbed navigation
 */

import { useState } from 'react';

const Tabs = ({
  tabs,
  defaultTab,
  onChange,
  variant = 'default',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const variants = {
    default: {
      container: 'border-b border-[var(--border-color)]',
      tab: 'py-3 px-4 -mb-px border-b-2 border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
      active: 'border-[var(--color-primary)] text-[var(--color-primary)] font-medium'
    },
    pills: {
      container: 'bg-[var(--color-bg-secondary)] p-1 rounded-[var(--border-radius-md)]',
      tab: 'py-2 px-4 rounded-[var(--border-radius-sm)] text-[var(--color-text-secondary)]',
      active: 'bg-[var(--color-bg-card)] text-[var(--color-text-primary)] font-medium shadow-sm'
    },
    underline: {
      container: '',
      tab: 'py-2 px-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
      active: 'text-[var(--color-primary)] font-medium underline underline-offset-8 decoration-2'
    }
  };

  const currentVariant = variants[variant];
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className={`flex gap-1 ${currentVariant.container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            disabled={tab.disabled}
            className={`
              transition-all duration-[var(--transition-fast)]
              disabled:opacity-50 disabled:cursor-not-allowed
              ${currentVariant.tab}
              ${activeTab === tab.id ? currentVariant.active : ''}
            `}
          >
            <span className="flex items-center gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
              {tab.badge && (
                <span className="px-1.5 py-0.5 text-xs bg-[var(--color-bg-tertiary)] rounded-full">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTabData?.content && (
        <div className="mt-4 animate-fade-in">
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;
