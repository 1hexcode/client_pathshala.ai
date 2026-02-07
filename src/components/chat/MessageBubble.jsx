/**
 * MessageBubble Component
 * Displays individual summary messages with different styles for user and AI
 */

import { Avatar } from '../common';

const MessageBubble = ({
  message,
  isUser = false,
  timestamp,
  isLoading = false,
  className = ''
}) => {
  return (
    <div className={`
      flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}
      animate-[fadeIn_0.3s_ease-out]
      ${className}
    `}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <Avatar name="You" size="md" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className={`
        flex flex-col max-w-[75%]
        ${isUser ? 'items-end' : 'items-start'}
      `}>
        {/* Sender Label */}
        <span className="text-xs font-medium text-[var(--color-text-muted)] mb-1 px-1">
          {isUser ? 'You' : 'Academic AI'}
        </span>

        {/* Message Bubble */}
        <div className={`
          px-4 py-3 rounded-2xl
          ${isUser
            ? 'bg-[var(--color-primary)] text-white rounded-br-md'
            : 'bg-[var(--color-bg-card)] border border-[var(--border-color)] text-[var(--color-text-primary)] rounded-bl-md'
          }
          ${isLoading ? 'min-w-[80px]' : ''}
        `}>
          {isLoading ? (
            <TypingIndicator />
          ) : (
            <div className={`
              text-sm leading-relaxed
              ${!isUser && 'prose prose-sm max-w-none'}
            `}>
              {formatMessage(message)}
            </div>
          )}
        </div>

        {/* Timestamp */}
        {timestamp && !isLoading && (
          <span className="text-xs text-[var(--color-text-muted)] mt-1 px-1">
            {formatTimestamp(timestamp)}
          </span>
        )}
      </div>
    </div>
  );
};

// Typing indicator animation
const TypingIndicator = () => (
  <div className="flex items-center gap-1 py-1">
    <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

// Format message with basic markdown-like syntax
const formatMessage = (text) => {
  if (!text) return null;
  
  // Split by code blocks first
  const parts = text.split(/(```[\s\S]*?```)/g);
  
  return parts.map((part, index) => {
    // Code block
    if (part.startsWith('```')) {
      const codeContent = part.replace(/```(\w+)?\n?/g, '').replace(/```$/g, '');
      return (
        <pre key={index} className="bg-[var(--color-bg-tertiary)] rounded-lg p-3 my-2 overflow-x-auto">
          <code className="text-sm font-mono text-[var(--color-text-primary)]">
            {codeContent.trim()}
          </code>
        </pre>
      );
    }
    
    // Regular text with inline formatting
    return (
      <span key={index}>
        {part.split('\n').map((line, lineIndex) => (
          <span key={lineIndex}>
            {lineIndex > 0 && <br />}
            {formatInlineText(line)}
          </span>
        ))}
      </span>
    );
  });
};

// Format inline text (bold, italic, inline code)
const formatInlineText = (text) => {
  // Handle inline code first
  const parts = text.split(/(`[^`]+`)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="bg-[var(--color-bg-tertiary)] px-1.5 py-0.5 rounded text-sm font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    
    // Handle bold
    let result = part;
    const boldParts = result.split(/(\*\*[^*]+\*\*)/g);
    
    return boldParts.map((boldPart, boldIndex) => {
      if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
        return <strong key={`${index}-${boldIndex}`}>{boldPart.slice(2, -2)}</strong>;
      }
      return boldPart;
    });
  });
};

// Format timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  // Less than 1 minute
  if (diff < 60000) return 'Just now';
  
  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  }
  
  // Less than 24 hours
  if (diff < 86400000) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Default to date
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export default MessageBubble;
