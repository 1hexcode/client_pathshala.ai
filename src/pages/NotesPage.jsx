import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, Button, Badge, Select, SearchInput, EmptyState, Spinner } from '../components/common';
import { useAuth } from '../contexts/AuthContext';
import { fetchColleges, fetchPrograms, fetchSubjects, fetchNotes, deleteNote } from '../utils/api';

function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function NotesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isSuperAdmin } = useAuth();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    collegeId: searchParams.get('college') || '',
    programId: searchParams.get('program') || '',
    subjectId: searchParams.get('subject') || '',
    sortBy: 'recent',
  });

  // API data
  const [colleges, setColleges] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);

  // Load colleges on mount
  useEffect(() => {
    fetchColleges().then(setColleges).catch(() => setColleges([]));
  }, []);

  // Load programs when college changes
  useEffect(() => {
    if (filters.collegeId) {
      fetchPrograms(filters.collegeId).then(setPrograms).catch(() => setPrograms([]));
    } else {
      setPrograms([]);
    }
  }, [filters.collegeId]);

  // Load subjects when program changes
  useEffect(() => {
    if (filters.programId) {
      fetchSubjects(filters.programId).then(setSubjects).catch(() => setSubjects([]));
    } else {
      setSubjects([]);
    }
  }, [filters.programId]);

  // Load notes whenever subject filter changes
  useEffect(() => {
    setLoading(true);
    fetchNotes(filters.subjectId || null)
      .then(setNotes)
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, [filters.subjectId]);

  // Client-side search and sort on the fetched notes
  const filteredNotes = useMemo(() => {
    let result = [...notes];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(q) ||
        (n.description && n.description.toLowerCase().includes(q)) ||
        (n.tags && n.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    switch (filters.sortBy) {
      case 'popular':
        result.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
        break;
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return result;
  }, [notes, filters.search, filters.sortBy]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'collegeId') {
        updated.programId = '';
        updated.subjectId = '';
      }
      if (name === 'programId') {
        updated.subjectId = '';
      }
      return updated;
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      collegeId: '',
      programId: '',
      subjectId: '',
      sortBy: 'recent',
    });
    setSearchParams({});
  };

  const handleDelete = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteNote(noteId);
      setNotes(prev => prev.filter(n => n.id !== noteId));
    } catch (err) {
      alert(err.message);
    }
  };

  const activeFilterCount = [filters.collegeId, filters.programId, filters.subjectId].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Study Notes</h1>
        <p className="text-muted">Browse and download study materials from the community</p>
      </div>

      {/* Search and filters bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchInput
            placeholder="Search notes by title, subject, or tags..."
            value={filters.search}
            onChange={(value) => handleFilterChange('search', value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={showFilters ? 'primary' : 'outline'}
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>

          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-background text-muted hover:bg-hover'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-background text-muted hover:bg-hover'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <Card className="p-5 mb-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="College"
              value={filters.collegeId}
              onChange={(e) => handleFilterChange('collegeId', e.target.value)}
              options={[
                { value: '', label: 'All Colleges' },
                ...colleges.map(c => ({ value: c.id, label: c.name }))
              ]}
            />

            <Select
              label="Program"
              value={filters.programId}
              onChange={(e) => handleFilterChange('programId', e.target.value)}
              disabled={!filters.collegeId}
              options={[
                { value: '', label: filters.collegeId ? 'All Programs' : 'Select college first' },
                ...programs.map(p => ({ value: p.id, label: p.name }))
              ]}
            />

            <Select
              label="Subject"
              value={filters.subjectId}
              onChange={(e) => handleFilterChange('subjectId', e.target.value)}
              disabled={!filters.programId}
              options={[
                { value: '', label: filters.programId ? 'All Subjects' : 'Select program first' },
                ...subjects.map(s => ({ value: s.id, label: `${s.code} - ${s.name}` }))
              ]}
            />

            <Select
              label="Sort By"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              options={[
                { value: 'recent', label: 'Most Recent' },
                { value: 'popular', label: 'Most Popular' },
              ]}
            />
          </div>

          {activeFilterCount > 0 && (
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.collegeId && (
                  <Badge variant="neutral" className="flex items-center gap-1">
                    {colleges.find(c => c.id === filters.collegeId)?.short_name || 'College'}
                    <button onClick={() => handleFilterChange('collegeId', '')} className="ml-1 hover:text-foreground">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Badge>
                )}
                {filters.programId && (
                  <Badge variant="neutral" className="flex items-center gap-1">
                    {programs.find(p => p.id === filters.programId)?.short_name || 'Program'}
                    <button onClick={() => handleFilterChange('programId', '')} className="ml-1 hover:text-foreground">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Badge>
                )}
                {filters.subjectId && (
                  <Badge variant="neutral" className="flex items-center gap-1">
                    {subjects.find(s => s.id === filters.subjectId)?.code || 'Subject'}
                    <button onClick={() => handleFilterChange('subjectId', '')} className="ml-1 hover:text-foreground">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </Card>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-muted">
          {loading ? 'Loading...' : `${filteredNotes.length} ${filteredNotes.length === 1 ? 'note' : 'notes'} found`}
        </p>
      </div>

      {/* Notes grid/list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : filteredNotes.length === 0 ? (
        <EmptyState
          icon={({ className }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
          title="No notes found"
          description="Try adjusting your filters or search terms"
          action={
            activeFilterCount > 0 && (
              <Button variant="primary" onClick={clearFilters}>
                Clear Filters
              </Button>
            )
          }
        />
      ) : viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNotes.map((note) => (
            <NoteCardSimple key={note.id} note={note} isSuperAdmin={isSuperAdmin} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <NoteListItem key={note.id} note={note} isSuperAdmin={isSuperAdmin} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Inline Note Cards (no static data dependency) ──────────────────────────

function NoteCardSimple({ note, isSuperAdmin, onDelete }) {
  const ext = note.file_url ? note.file_url.split('.').pop().toUpperCase() : 'FILE';

  return (
    <Link to={`/notes/${note.id}`}>
      <Card interactive className="overflow-hidden group">
        <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center relative">
          <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <Badge variant="neutral" className="absolute top-3 left-3 text-xs">{ext}</Badge>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-foreground mb-1 line-clamp-1">{note.title}</h3>
          <p className="text-sm text-muted mb-3 line-clamp-2">{note.description || 'No description'}</p>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {note.tags?.slice(0, 3).map(tag => (
              <Badge key={tag} variant="neutral" className="text-xs">{tag}</Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">{note.downloads} downloads</span>
            <div className="flex gap-2">
              <span className="text-primary hover:text-primary-dark font-medium">
                View
              </span>
              {isSuperAdmin && (
                <button onClick={(e) => { e.preventDefault(); onDelete(note.id); }} className="text-red-500 hover:text-red-600 font-medium">
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function NoteListItem({ note, isSuperAdmin, onDelete }) {
  const ext = note.file_url ? note.file_url.split('.').pop().toUpperCase() : 'FILE';

  return (
    <Card className="p-4 flex gap-4 items-start">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold text-primary">{ext}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground mb-1 line-clamp-1">{note.title}</h3>
        <p className="text-sm text-muted mb-2 line-clamp-1">{note.description || 'No description'}</p>
        <div className="flex items-center gap-4 text-sm text-muted">
          <span>{note.downloads} downloads</span>
          <span>{note.views} views</span>
          {note.file_size && <span>{formatFileSize(note.file_size)}</span>}
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <Link
          to={`/notes/${note.id}`}
          className="px-3 py-1.5 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
        >
          View
        </Link>
        {isSuperAdmin && (
          <button
            onClick={() => onDelete(note.id)}
            className="px-3 py-1.5 text-sm font-medium text-red-500 border border-red-500/30 rounded-lg hover:bg-red-500/5 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </Card>
  );
}
