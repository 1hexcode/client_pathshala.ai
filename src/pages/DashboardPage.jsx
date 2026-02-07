import { Link } from 'react-router-dom';
import { Card, Button, Badge, Avatar } from '../components/common';
import { currentUser } from '../data/users';
import { getNotesByUser, formatFileSize } from '../data/notes';
import { getCollegeById, getProgramById } from '../data/academics';

export function DashboardPage() {
  const userNotes = getNotesByUser(currentUser.id);
  const college = getCollegeById(currentUser.collegeId);
  const program = getProgramById(currentUser.programId);

  const stats = [
    { 
      label: 'Notes Uploaded', 
      value: userNotes.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-primary/10 text-primary'
    },
    { 
      label: 'Total Downloads', 
      value: userNotes.reduce((sum, n) => sum + n.downloads, 0),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      color: 'bg-success/10 text-success'
    },
    { 
      label: 'Total Views', 
      value: userNotes.reduce((sum, n) => sum + n.views, 0),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      color: 'bg-accent/10 text-accent'
    },
    { 
      label: 'Avg Rating', 
      value: userNotes.length > 0 
        ? (userNotes.reduce((sum, n) => sum + n.rating, 0) / userNotes.length).toFixed(1)
        : '—',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: 'bg-warning/10 text-warning'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Avatar name={currentUser.name} size="xl" />
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Welcome back, {currentUser.name.split(' ')[0]}!
            </h1>
            <p className="text-muted">
              {program?.name} • {college?.shortName} • Semester {currentUser.currentSemester}
            </p>
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
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
                <Link to="/notes?mine=true" className="text-sm text-primary hover:text-primary-dark">
                  View all
                </Link>
              </div>
            </div>
            
            {userNotes.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                {userNotes.slice(0, 5).map((note) => (
                  <div key={note.id} className="p-4 flex items-center gap-4 hover:bg-hover transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{note.title}</h3>
                      <p className="text-sm text-muted">
                        {formatFileSize(note.fileSize)} • {note.downloads} downloads
                      </p>
                    </div>
                    <Badge variant={note.status === 'ready' ? 'success' : 'warning'}>
                      {note.status === 'ready' ? 'Published' : 'Processing'}
                    </Badge>
                  </div>
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
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-foreground">Notes Summary</div>
                  <div className="text-sm text-muted">Extract & summarize notes</div>
                </div>
              </Link>
              
              <Link to="/notes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* AI Summary Feature */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Notes Summary</h2>
            </div>
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
