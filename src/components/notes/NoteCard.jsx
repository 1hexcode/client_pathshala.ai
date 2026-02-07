/**
 * NoteCard Component
 * Displays a single note with preview and actions
 */

import { Link } from 'react-router-dom';
import { Badge, Avatar } from '../common';
import { getSubjectById, getProgramById, getCollegeById, getSemesterById } from '../../data/academics';
import { formatFileSize } from '../../data/notes';

const NoteCard = ({
  note,
  variant = 'default', // default, compact, list
  showUser = true,
  showActions = true,
  onView,
  onDelete,
  className = ''
}) => {
  const subject = getSubjectById(note.subjectId);
  const program = getProgramById(note.programId);
  const college = getCollegeById(note.collegeId);
  const semester = getSemesterById(note.semesterId);

  // File type icon
  const FileIcon = () => {
    const iconClass = "w-10 h-10";
    switch (note.fileType) {
      case 'pdf':
        return (
          <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
            <svg className={`${iconClass} text-red-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'image':
        return (
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg className={`${iconClass} text-blue-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <svg className={`${iconClass} text-gray-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
    }
  };

  // Status badge
  const StatusBadge = () => {
    if (note.status === 'processing') {
      return <Badge variant="warning" size="sm">Processing</Badge>;
    }
    return <Badge variant="success" size="sm">Ready</Badge>;
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={`
        flex items-center gap-3 p-3
        bg-[var(--color-bg-card)] rounded-lg
        border border-[var(--border-color)]
        hover:shadow-md transition-shadow
        ${className}
      `}>
        <FileIcon />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-[var(--color-text-primary)] truncate">
            {note.title}
          </h4>
          <p className="text-xs text-[var(--color-text-muted)]">
            {subject?.name} • {formatFileSize(note.fileSize)}
          </p>
        </div>
        <StatusBadge />
      </div>
    );
  }

  // List variant
  if (variant === 'list') {
    return (
      <div className={`
        flex items-center gap-4 p-4
        bg-[var(--color-bg-card)] rounded-lg
        border border-[var(--border-color)]
        hover:shadow-md transition-all
        ${className}
      `}>
        <FileIcon />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-medium text-[var(--color-text-primary)]">
                {note.title}
              </h4>
              <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                {subject?.name}
              </p>
            </div>
            <StatusBadge />
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-text-muted)]">
            <span>{program?.name}</span>
            <span>•</span>
            <span>{semester?.name}</span>
            <span>•</span>
            <span>{formatFileSize(note.fileSize)}</span>
            <span>•</span>
            <span>{note.pageCount} pages</span>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onView?.(note)}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
              title="View"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete?.(note)}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Default card variant
  return (
    <div className={`
      group bg-[var(--color-bg-card)]
      rounded-xl border border-[var(--border-color)]
      overflow-hidden
      hover:shadow-lg hover:border-[var(--color-primary)]/30
      transition-all duration-[var(--transition-normal)]
      ${className}
    `}>
      {/* Header with file type */}
      <div className="relative p-4 bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)]">
        <div className="flex items-start justify-between">
          <FileIcon />
          <StatusBadge />
        </div>
        
        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {note.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-white/60 rounded-full text-[var(--color-text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-[var(--color-text-primary)] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
          {note.title}
        </h3>
        
        <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">
          {note.description}
        </p>

        {/* Meta Info */}
        <div className="mt-3 pt-3 border-t border-[var(--border-color)]">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <span>{subject?.name}</span>
            <span>{formatFileSize(note.fileSize)}</span>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {note.views}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {note.downloads}
              </span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                {note.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* User Info */}
        {showUser && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--border-color)]">
            <Avatar name={note.userName || 'User'} size="xs" />
            <span className="text-xs text-[var(--color-text-muted)]">
              {note.userName || 'Anonymous'}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] ml-auto">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex border-t border-[var(--border-color)]">
          <button
            onClick={() => onView?.(note)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>
          <div className="w-px bg-[var(--border-color)]" />
          <button
            onClick={() => onDelete?.(note)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-red-50 hover:text-[var(--color-error)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
