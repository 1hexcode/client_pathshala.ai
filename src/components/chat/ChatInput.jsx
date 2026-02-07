/**
 * ChatInput Component
 * Text input with send button for chat interface
 */

import { useState, useRef, useEffect } from 'react';

const ChatInput = ({
  onSend,
  placeholder = 'Ask anything about your studies...',
  disabled = false,
  maxLength = 2000,
  showAttachment = false,
  className = ''
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const remainingChars = maxLength - message.length;
  const isNearLimit = remainingChars < 200;

  return (
    <div className={`
      relative bg-[var(--color-bg-card)] 
      border-t border-[var(--border-color)]
      ${className}
    `}>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
        <div className={`
          relative flex items-end gap-2
          bg-[var(--color-bg-primary)]
          border-2 rounded-2xl
          transition-all duration-[var(--transition-fast)]
          ${isFocused
            ? 'border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/10'
            : 'border-[var(--border-color)]'
          }
          ${disabled ? 'opacity-60' : ''}
        `}>
          {/* Attachment Button (Optional) */}
          {showAttachment && (
            <button
              type="button"
              className="flex-shrink-0 p-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
              title="Attach file"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
          )}

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={`
              flex-1 resize-none py-3.5 ${showAttachment ? 'pl-0' : 'pl-4'} pr-2
              bg-transparent
              text-[var(--color-text-primary)]
              placeholder:text-[var(--color-text-muted)]
              focus:outline-none
              disabled:cursor-not-allowed
            `}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`
              flex-shrink-0 m-1.5 p-2.5
              rounded-xl
              transition-all duration-[var(--transition-fast)]
              ${message.trim() && !disabled
                ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] shadow-md hover:shadow-lg'
                : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] cursor-not-allowed'
              }
            `}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        {/* Helper Text */}
        <div className="flex items-center justify-between mt-2 px-2">
          <p className="text-xs text-[var(--color-text-muted)]">
            <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-secondary)] rounded text-[10px] font-mono">Enter</kbd>
            {' '}to send, {' '}
            <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-secondary)] rounded text-[10px] font-mono">Shift + Enter</kbd>
            {' '}for new line
          </p>
          
          {isNearLimit && (
            <p className={`text-xs ${remainingChars < 50 ? 'text-[var(--color-error)]' : 'text-[var(--color-text-muted)]'}`}>
              {remainingChars} characters remaining
            </p>
          )}
        </div>
      </form>

      {/* Subject Tags (optional enhancement) */}
      <SubjectTags />
    </div>
  );
};

// Quick subject suggestions
const SubjectTags = () => {
  const subjects = [
    'Data Structures',
    'Algorithms',
    'Database',
    'Machine Learning',
    'Physics'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pb-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <span className="text-xs text-[var(--color-text-muted)] flex-shrink-0">Quick topics:</span>
        {subjects.map((subject) => (
          <button
            key={subject}
            className="flex-shrink-0 px-3 py-1.5 text-xs font-medium
              bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]
              rounded-full border border-[var(--border-color)]
              hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30
              transition-colors"
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;
