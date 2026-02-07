import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Button, Badge, Select, SearchInput, EmptyState } from '../components/common';
import { NoteCard, NotesFilter } from '../components/notes';
import { notes, searchNotes } from '../data/notes';
import { colleges, programs, subjects, getSubjectById, getProgramById, getCollegeById } from '../data/academics';

export function NotesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    collegeId: searchParams.get('college') || '',
    programId: searchParams.get('program') || '',
    subjectId: searchParams.get('subject') || '',
    sortBy: 'recent',
  });

  const filteredNotes = useMemo(() => {
    let result = notes.filter(n => n.status === 'ready');
    
    if (filters.search) {
      result = searchNotes(filters.search);
    }
    
    if (filters.collegeId) {
      result = result.filter(n => n.collegeId === filters.collegeId);
    }
    
    if (filters.programId) {
      result = result.filter(n => n.programId === filters.programId);
    }
    
    if (filters.subjectId) {
      result = result.filter(n => n.subjectId === filters.subjectId);
    }
    
    // Sort
    switch (filters.sortBy) {
      case 'popular':
        result.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return result;
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const updated = { ...prev, [name]: value };
      // Reset dependent filters
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
                ...programs
                  .filter(p => !filters.collegeId || p.collegeId === filters.collegeId)
                  .map(p => ({ value: p.id, label: p.name }))
              ]}
            />
            
            <Select
              label="Subject"
              value={filters.subjectId}
              onChange={(e) => handleFilterChange('subjectId', e.target.value)}
              disabled={!filters.programId}
              options={[
                { value: '', label: filters.programId ? 'All Subjects' : 'Select program first' },
                ...subjects
                  .filter(s => !filters.programId || s.programId === filters.programId)
                  .map(s => ({ value: s.id, label: s.name }))
              ]}
            />
            
            <Select
              label="Sort By"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              options={[
                { value: 'recent', label: 'Most Recent' },
                { value: 'popular', label: 'Most Popular' },
                { value: 'rating', label: 'Highest Rated' },
              ]}
            />
          </div>
          
          {activeFilterCount > 0 && (
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.collegeId && (
                  <Badge variant="neutral" className="flex items-center gap-1">
                    {getCollegeById(filters.collegeId)?.shortName}
                    <button onClick={() => handleFilterChange('collegeId', '')} className="ml-1 hover:text-foreground">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Badge>
                )}
                {filters.programId && (
                  <Badge variant="neutral" className="flex items-center gap-1">
                    {getProgramById(filters.programId)?.shortName}
                    <button onClick={() => handleFilterChange('programId', '')} className="ml-1 hover:text-foreground">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Badge>
                )}
                {filters.subjectId && (
                  <Badge variant="neutral" className="flex items-center gap-1">
                    {getSubjectById(filters.subjectId)?.code}
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
          {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
        </p>
      </div>

      {/* Notes grid/list */}
      {filteredNotes.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
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
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} variant="list" />
          ))}
        </div>
      )}
    </div>
  );
}
