/**
 * Navbar Component
 * Main navigation bar with search, dropdowns, and user menu
 */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dropdown, Avatar, SearchInput, ThemeToggle } from '../common';
import { currentUser } from '../../data/users';
import { colleges } from '../../data/academics';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-[var(--color-bg-card)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-display text-xl font-semibold text-[var(--color-text-primary)] hidden sm:block">
              PathshalaAI
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchInput
              placeholder="Search notes, subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              onClear={() => setSearchQuery('')}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {/* Notes Dropdown */}
            <Dropdown
              align="center"
              trigger={
                <button className={`
                  hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-[var(--border-radius-sm)]
                  text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                  hover:bg-[var(--color-bg-secondary)] transition-colors
                  ${isActive('/notes') ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/5' : ''}
                `}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">Notes</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              }
            >
              <Dropdown.Header>Browse by College</Dropdown.Header>
              {colleges.slice(0, 4).map((college) => (
                <Dropdown.Item
                  key={college.id}
                  onClick={() => navigate(`/notes?college=${college.id}`)}
                >
                  <span className="mr-2">{college.icon}</span>
                  {college.shortName}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => navigate('/notes')}>
                View All Notes
              </Dropdown.Item>
            </Dropdown>

            {/* Chat Link */}
            <Link
              to="/summary"
              className={`
                hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-[var(--border-radius-sm)]
                text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                hover:bg-[var(--color-bg-secondary)] transition-colors
                ${isActive('/summary') ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/5' : ''}
              `}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm font-medium">AI Summary</span>
            </Link>

            {/* About Link */}
            <Link
              to="/about"
              className={`
                hidden lg:flex items-center px-3 py-2 rounded-[var(--border-radius-sm)]
                text-sm font-medium
                text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                hover:bg-[var(--color-bg-secondary)] transition-colors
                ${isActive('/about') ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/5' : ''}
              `}
            >
              About
            </Link>

            {/* Contact Link */}
            <Link
              to="/contact"
              className={`
                hidden lg:flex items-center px-3 py-2 rounded-[var(--border-radius-sm)]
                text-sm font-medium
                text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                hover:bg-[var(--color-bg-secondary)] transition-colors
                ${isActive('/contact') ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/5' : ''}
              `}
            >
              Contact
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-[var(--border-color)] mx-2" />

            {/* Profile Dropdown */}
            <Dropdown
              align="right"
              trigger={
                <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors">
                  <Avatar name={currentUser.name} size="sm" />
                  <svg className="w-4 h-4 text-[var(--color-text-muted)] hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              }
            >
              <div className="px-4 py-3 border-b border-[var(--border-color)]">
                <p className="font-medium text-[var(--color-text-primary)]">{currentUser.name}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{currentUser.email}</p>
              </div>
              <Dropdown.Item onClick={() => navigate('/dashboard')}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/upload')}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Notes
              </Dropdown.Item>
              {currentUser.role === 'admin' && (
                <Dropdown.Item onClick={() => navigate('/admin')}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin Panel
                </Dropdown.Item>
              )}
              <Dropdown.Divider />
              <Dropdown.Item danger onClick={() => navigate('/login')}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </Dropdown.Item>
            </Dropdown>

            {/* Mobile Menu Button */}
            <button className="sm:hidden p-2 rounded-[var(--border-radius-sm)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search - Only visible on mobile */}
      <div className="md:hidden px-4 pb-3">
        <SearchInput
          placeholder="Search notes, subjects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          onClear={() => setSearchQuery('')}
          size="sm"
        />
      </div>
    </nav>
  );
};

export default Navbar;
