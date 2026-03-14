import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge } from '../components/common';
import { fetchStats, fetchFavouriteColleges, fetchNotes } from '../utils/api';

export function HomePage() {
  const [stats, setStats] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);

  useEffect(() => {
    fetchStats().then(setStats).catch(() => { });
    fetchFavouriteColleges().then(setColleges).catch(() => setColleges([]));
    fetchNotes(null, 4).then(setRecentNotes).catch(() => setRecentNotes([]));
  }, []);

  const statItems = [
    { label: 'Study Notes', value: stats ? stats.notes_count.toLocaleString() : '—' },
    { label: 'Active Students', value: stats ? stats.students_count.toLocaleString() : '—' },
    { label: 'Subjects Covered', value: stats ? stats.subjects_count.toLocaleString() : '—' },
    { label: 'AI Responses', value: stats ? stats.ai_responses_count.toLocaleString() : '—' },
  ];

  const features = [
    {
      title: 'Study Notes',
      description: 'Access thousands of curated notes organized by college, program, and subject. Download, view, and learn at your own pace.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
    },
    {
      title: 'AI Study Assistant',
      description: 'Get instant help with homework, concepts, and exam prep. Our AI tutor is available 24/7 to answer your questions.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      gradient: 'linear-gradient(135deg, var(--color-accent), #b8911e)',
    },
    {
      title: 'Community',
      description: 'Share your notes, earn recognition, and connect with students from your college. Learn together, grow together.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      gradient: 'linear-gradient(135deg, var(--color-success, #22c55e), #16a34a)',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br bg-black from-primary via-primary to-primary-dark py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="accent" className="mb-4">✨ New: AI-Powered Study Assistant</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Study Smarter,<br />
              <span className="text-accent">Not Harder</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Access thousands of peer-reviewed study notes, get instant AI tutoring,
              and connect with students from your college.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/summary">
                <Button size="lg" variant="accent" className="w-full sm:w-auto">
                  Explore AI Assistant
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link to="/notes">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10">
                  Browse Notes
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statItems.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-display font-bold text-white">{stat.value}</div>
                <div className="text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block text-sm font-semibold tracking-wider uppercase mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              Why PathshalaAI
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              From study materials to AI assistance, we've got your academic journey covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl p-8 text-center transition-all duration-300 hover:-translate-y-2 cursor-default"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white"
                  style={{ background: feature.gradient }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by College */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block text-sm font-semibold tracking-wider uppercase mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              Find your college
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Browse by College
            </h2>
            <p className="text-lg text-muted">
              Find notes specific to your academic program
            </p>
          </div>

          {colleges.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {colleges.map((college) => (
                <Link key={college.id} to={`/notes?college=${college.id}`} className="block group">
                  <div
                    className="h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--color-bg-card)',
                      border: '1px solid var(--border-color)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.18)';
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    {/* Gradient header */}
                    <div
                      className="relative px-6 pt-6 pb-8"
                      style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                          style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
                        >
                          {college.icon || '🏛️'}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-white text-lg leading-tight">{college.name}</h3>
                          <p className="text-white/70 text-sm font-medium mt-0.5">{college.short_name}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content body */}
                    <div className="p-6">
                      <p
                        className="text-muted text-sm leading-relaxed mb-5"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          height: '3.75rem',
                        }}
                      >
                        {college.description || 'Explore notes, study materials, and resources shared by students and faculty of this institution.'}
                      </p>

                      {/* Meta info */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="flex items-center gap-1.5 text-xs text-muted">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Added {new Date(college.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                        {college.is_favourite && (
                          <span className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--color-accent)' }}>
                            ⭐ Featured
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <div
                        className="flex items-center justify-between pt-4"
                        style={{ borderTop: '1px solid var(--border-color)' }}
                      >
                        <span
                          className="text-sm font-semibold transition-colors duration-200"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          Browse Notes →
                        </span>
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:translate-x-1"
                          style={{ backgroundColor: 'rgba(var(--color-primary-rgb, 99,102,241), 0.1)' }}
                        >
                          <svg className="w-4 h-4" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div
              className="text-center rounded-2xl py-16 px-8"
              style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white text-3xl"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
              >
                🏛️
              </div>
              <p className="text-foreground text-xl font-semibold mb-2">No featured colleges yet</p>
              <p className="text-muted">Colleges will appear here once they've been added and featured by administrators</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Notes */}
      <section className="py-24" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span
                className="inline-block text-sm font-semibold tracking-wider uppercase mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                Latest uploads
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
                Recent Notes
              </h2>
              <p className="text-muted">Fresh study materials from the community</p>
            </div>
            <Link to="/notes">
              <button
                className="px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: '#fff',
                  border: 'none',
                }}
              >
                View All Notes →
              </button>
            </Link>
          </div>

          {recentNotes.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentNotes.map((note) => (
                <Link key={note.id} to={`/notes/${note.id}`}>
                  <div
                    className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      backgroundColor: 'var(--color-bg-card)',
                      border: '1px solid var(--border-color)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0,0,0,0.15)';
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <div
                      className="aspect-[4/3] flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
                    >
                      <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-foreground mb-1 line-clamp-1">{note.title}</h3>
                      <p className="text-sm text-muted mb-4 line-clamp-2">{note.description || 'No description'}</p>
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          {note.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {note.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div
              className="text-center rounded-xl py-12 px-6"
              style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-muted text-lg">No notes uploaded yet</p>
              <p className="text-sm text-muted mt-1">Be the first to share study materials!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
