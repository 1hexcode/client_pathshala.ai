import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, Button, Badge, Avatar, Spinner } from '../components/common';
import { useAuth } from '../contexts/AuthContext';
import { fetchDashboard } from '../utils/api';

export function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const uploadPending = location.state?.uploadPending;

  useEffect(() => {
    fetchDashboard()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  const formatFileSize = (bytes) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const stats = [
    {
      label: 'Notes Uploaded',
      value: data?.notes_count ?? 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      colorBg: 'var(--color-primary)',
    },
    {
      label: 'Total Downloads',
      value: data?.total_downloads ?? 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      colorBg: 'var(--color-success)',
    },
    {
      label: 'Total Views',
      value: data?.total_views ?? 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      colorBg: 'var(--color-accent)',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  const subtitle = [data?.program_name, data?.college_name, data?.semester ? `Semester ${data.semester}` : null]
    .filter(Boolean)
    .join(' • ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Upload pending review notice */}
      {uploadPending && (
        <div className="mb-6 p-4 rounded-xl border border-blue-500/30" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(99,102,241,0.08))' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-foreground">Note submitted for review!</p>
              <p className="text-sm text-muted">Your note has been uploaded and is pending admin approval. It will be visible to others once published.</p>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Avatar name={user?.name || 'User'} size="xl" />
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')[0] || 'there'}!
            </h1>
            {subtitle && <p className="text-muted">{subtitle}</p>}
          </div>
        </div>
        <Link to="/upload">
          <Button variant="primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Notes
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: stat.colorBg }}
              >
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* My Notes */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-5 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-display font-semibold text-foreground">My Notes</h2>
                {data?.recent_notes?.length > 0 && (
                  <Link to="/notes" className="text-sm" style={{ color: 'var(--color-primary)' }}>
                    View all
                  </Link>
                )}
              </div>
            </div>

            {!data?.recent_notes?.length ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-foreground mb-1">No notes yet</h3>
                <p className="text-sm text-muted mb-4">Share your study materials with the community</p>
                <Link to="/upload">
                  <Button variant="primary" size="sm">Upload Your First Note</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {data.recent_notes.map((note) => (
                  <Link
                    key={note.id}
                    to={`/notes/${note.id}`}
                    className="p-4 flex items-center gap-4 hover:bg-hover transition-colors block"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{note.title}</h3>
                      <p className="text-sm text-muted">
                        {formatFileSize(note.file_size)} • {note.downloads} downloads • {note.views} views
                      </p>
                      {note.status === 'failed' && note.feedback && (
                        <p className="text-sm text-red-500 mt-1 line-clamp-1">Feedback: <span className="font-medium">{note.feedback.feedback_text}</span></p>
                      )}
                    </div>
                    <Badge variant={note.status === 'ready' ? 'success' : note.status === 'failed' ? 'error' : 'warning'}>
                      {note.status === 'ready' ? 'Published' : note.status === 'processing' ? 'Processing' : note.status === 'failed' ? 'Rejected' : 'Pending Review'}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-5">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link to="/summary" className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover transition-colors">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-foreground">Notes Summary</div>
                  <div className="text-sm text-muted">Extract & summarize notes</div>
                </div>
              </Link>

              <Link to="/notes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover transition-colors">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-foreground">Browse Notes</div>
                  <div className="text-sm text-muted">Find study materials</div>
                </div>
              </Link>
            </div>
          </Card>

          {/* AI Summary Promo */}
          <Card className="p-5">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">AI Summary</h2>
            <div className="text-center py-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-foreground mb-2">Extract & Summarize Notes</h3>
              <p className="text-sm text-muted mb-4">Upload your handwritten or PDF notes and get instant AI summaries</p>
              <Link to="/summary">
                <Button variant="primary" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Notes
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
