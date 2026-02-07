/**
 * AdminStats Component
 * Display statistics cards for admin dashboard
 */

import { Card } from '../common';
import { colleges, programs, subjects } from '../../data/academics';
import { notes } from '../../data/notes';
import { users } from '../../data/users';

// Calculate stats from mock data
const getStats = () => [
  {
    title: 'Total Users',
    value: users.length,
    change: '+12%',
    changeType: 'positive',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'blue'
  },
  {
    title: 'Total Notes',
    value: notes.length,
    change: '+28%',
    changeType: 'positive',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'green'
  },
  {
    title: 'Colleges',
    value: colleges.length,
    change: '0%',
    changeType: 'neutral',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'purple'
  },
  {
    title: 'Programs',
    value: programs.length,
    change: '+2',
    changeType: 'positive',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'orange'
  },
  {
    title: 'Subjects',
    value: subjects.length,
    change: '+5',
    changeType: 'positive',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'teal'
  },
  {
    title: 'Downloads',
    value: notes.reduce((acc, note) => acc + note.downloads, 0),
    change: '+156',
    changeType: 'positive',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    color: 'pink'
  }
];

// Color mappings
const colorClasses = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    light: 'bg-blue-50'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    light: 'bg-green-50'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    light: 'bg-purple-50'
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    light: 'bg-orange-50'
  },
  teal: {
    bg: 'bg-teal-100',
    text: 'text-teal-600',
    light: 'bg-teal-50'
  },
  pink: {
    bg: 'bg-pink-100',
    text: 'text-pink-600',
    light: 'bg-pink-50'
  }
};

const AdminStats = ({ className = '' }) => {
  const stats = getStats();

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="p-5">
            <div className="flex items-start justify-between">
              {/* Icon */}
              <div className={`p-3 rounded-xl ${colorClasses[stat.color].bg}`}>
                <div className={colorClasses[stat.color].text}>
                  {stat.icon}
                </div>
              </div>
              
              {/* Change Badge */}
              <span className={`
                inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                ${stat.changeType === 'positive'
                  ? 'bg-green-100 text-green-700'
                  : stat.changeType === 'negative'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-600'
                }
              `}>
                {stat.changeType === 'positive' && (
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {stat.changeType === 'negative' && (
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {stat.change}
              </span>
            </div>
            
            {/* Value */}
            <div className="mt-4">
              <h3 className="text-2xl font-display font-bold text-[var(--color-text-primary)]">
                {stat.value.toLocaleString()}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                {stat.title}
              </p>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className={`h-1 ${colorClasses[stat.color].bg}`} />
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;
