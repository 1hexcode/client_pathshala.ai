/**
 * NotesFilter Component
 * Filter sidebar for browsing notes
 */

import { useState } from 'react';
import { colleges, programs, years, semesters, subjects, getProgramsByCollege, getSubjectsByProgram } from '../../data/academics';

const NotesFilter = ({
  filters = {},
  onFilterChange,
  className = ''
}) => {
  const [expanded, setExpanded] = useState({
    college: true,
    program: true,
    year: false,
    semester: false,
    subject: true,
    fileType: false
  });

  // Get available programs based on selected college
  const availablePrograms = filters.collegeId
    ? getProgramsByCollege(filters.collegeId)
    : programs;

  // Get available subjects based on selected program
  const availableSubjects = filters.programId
    ? getSubjectsByProgram(filters.programId)
    : subjects;

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Update filter
  const updateFilter = (key, value) => {
    const newFilters = { ...filters };
    
    if (value === filters[key]) {
      // Deselect if already selected
      delete newFilters[key];
      
      // Clear dependent filters
      if (key === 'collegeId') {
        delete newFilters.programId;
        delete newFilters.subjectId;
      }
      if (key === 'programId') {
        delete newFilters.subjectId;
      }
    } else {
      newFilters[key] = value;
      
      // Clear dependent filters when parent changes
      if (key === 'collegeId') {
        delete newFilters.programId;
        delete newFilters.subjectId;
      }
      if (key === 'programId') {
        delete newFilters.subjectId;
      }
    }
    
    onFilterChange?.(newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    onFilterChange?.({});
  };

  // Check if any filters are active
  const hasActiveFilters = Object.keys(filters).length > 0;

  // Filter section component
  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-[var(--border-color)] last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          {title}
        </span>
        <svg
          className={`w-4 h-4 text-[var(--color-text-muted)] transition-transform ${expanded[section] ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {expanded[section] && (
        <div className="pb-3 space-y-1">
          {children}
        </div>
      )}
    </div>
  );

  // Filter option component
  const FilterOption = ({ label, value, filterKey, count }) => {
    const isSelected = filters[filterKey] === value;
    
    return (
      <button
        onClick={() => updateFilter(filterKey, value)}
        className={`
          w-full flex items-center justify-between px-2 py-1.5 rounded-md
          text-sm transition-colors
          ${isSelected
            ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium'
            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]'
          }
        `}
      >
        <span className="truncate">{label}</span>
        {count !== undefined && (
          <span className={`text-xs ${isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}>
            {count}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className={`
      bg-[var(--color-bg-card)]
      border border-[var(--border-color)]
      rounded-xl overflow-hidden
      ${className}
    `}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between">
        <h3 className="font-display font-semibold text-[var(--color-text-primary)]">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-[var(--color-primary)] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="px-4">
        {/* College Filter */}
        <FilterSection title="College" section="college">
          {colleges.map((college) => (
            <FilterOption
              key={college.id}
              label={college.name}
              value={college.id}
              filterKey="collegeId"
            />
          ))}
        </FilterSection>

        {/* Program Filter */}
        <FilterSection title="Program" section="program">
          {availablePrograms.map((program) => (
            <FilterOption
              key={program.id}
              label={program.name}
              value={program.id}
              filterKey="programId"
            />
          ))}
        </FilterSection>

        {/* Year Filter */}
        <FilterSection title="Year" section="year">
          {years.map((year) => (
            <FilterOption
              key={year.id}
              label={year.name}
              value={year.id}
              filterKey="yearId"
            />
          ))}
        </FilterSection>

        {/* Semester Filter */}
        <FilterSection title="Semester" section="semester">
          {semesters.map((semester) => (
            <FilterOption
              key={semester.id}
              label={semester.name}
              value={semester.id}
              filterKey="semesterId"
            />
          ))}
        </FilterSection>

        {/* Subject Filter */}
        <FilterSection title="Subject" section="subject">
          {availableSubjects.map((subject) => (
            <FilterOption
              key={subject.id}
              label={subject.name}
              value={subject.id}
              filterKey="subjectId"
            />
          ))}
        </FilterSection>

        {/* File Type Filter */}
        <FilterSection title="File Type" section="fileType">
          <FilterOption
            label="PDF Documents"
            value="pdf"
            filterKey="fileType"
          />
          <FilterOption
            label="Images"
            value="image"
            filterKey="fileType"
          />
        </FilterSection>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="px-4 py-3 border-t border-[var(--border-color)] bg-[var(--color-bg-secondary)]">
          <p className="text-xs text-[var(--color-text-muted)] mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-1">
            {filters.collegeId && (
              <ActiveFilterTag
                label={colleges.find((c) => c.id === filters.collegeId)?.name}
                onRemove={() => updateFilter('collegeId', filters.collegeId)}
              />
            )}
            {filters.programId && (
              <ActiveFilterTag
                label={programs.find((p) => p.id === filters.programId)?.name}
                onRemove={() => updateFilter('programId', filters.programId)}
              />
            )}
            {filters.yearId && (
              <ActiveFilterTag
                label={years.find((y) => y.id === filters.yearId)?.name}
                onRemove={() => updateFilter('yearId', filters.yearId)}
              />
            )}
            {filters.semesterId && (
              <ActiveFilterTag
                label={semesters.find((s) => s.id === filters.semesterId)?.name}
                onRemove={() => updateFilter('semesterId', filters.semesterId)}
              />
            )}
            {filters.subjectId && (
              <ActiveFilterTag
                label={subjects.find((s) => s.id === filters.subjectId)?.name}
                onRemove={() => updateFilter('subjectId', filters.subjectId)}
              />
            )}
            {filters.fileType && (
              <ActiveFilterTag
                label={filters.fileType === 'pdf' ? 'PDF' : 'Image'}
                onRemove={() => updateFilter('fileType', filters.fileType)}
              />
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

// Active filter tag component
const ActiveFilterTag = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs rounded-full">
    {label}
    <button
      onClick={onRemove}
      className="hover:bg-[var(--color-primary)]/20 rounded-full p-0.5"
    >
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </span>
);

export default NotesFilter;
