import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import { fetchStats } from '../utils/api';

export function AboutPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats().then(setStats).catch(() => setStats(null));
  }, []);

  const values = [
    {
      title: 'Accessibility',
      description: 'We believe quality education should be accessible to everyone, regardless of background.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Community',
      description: 'Learning is better together. We foster collaboration and knowledge sharing.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Innovation',
      description: 'We leverage AI and modern technology to enhance the learning experience.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Quality',
      description: 'Every piece of content is reviewed to ensure accuracy and educational value.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
  ];

  const statItems = stats ? [
    { label: 'Study Notes', value: stats.notes_count },
    { label: 'Active Students', value: stats.students_count },
    { label: 'Colleges', value: stats.colleges_count },
    { label: 'Subjects', value: stats.subjects_count },
  ] : [];

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
            Empowering Students Worldwide
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            PathshalaAI is on a mission to democratize education by making quality study materials
            accessible to every student, everywhere.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted">
                <p>
                  PathshalaAI was born from a simple observation: students everywhere struggle to find
                  quality study materials. Whether it's outdated textbooks, expensive resources, or
                  simply not knowing where to look, the barriers to effective learning are real.
                </p>
                <p>
                  Founded in 2023 by a group of former students and educators, we set out to create
                  a platform where knowledge flows freely. Today, we host thousands of study notes
                  contributed by students from hundreds of colleges.
                </p>
                <p>
                  But we didn't stop there. By integrating AI-powered assistance, we've created a
                  24/7 study companion that can help with homework, explain concepts, and guide
                  students through their academic journey.
                </p>
              </div>
            </div>
            <div className="relative">
              <div
                className="aspect-square rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 10%, transparent), color-mix(in srgb, var(--color-accent) 10%, transparent))' }}
              >
                <svg className="w-32 h-32" style={{ color: 'var(--color-primary)', opacity: 0.3 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block text-sm font-semibold tracking-wider uppercase mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              What drives us
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              These principles guide everything we do at PathshalaAI
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
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
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 text-white"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
                >
                  {value.icon}
                </div>
                <h3 className="font-display font-bold text-foreground mb-2 text-lg">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      {statItems.length > 0 && (
        <section
          className="py-20"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-white mb-3">PathshalaAI in Numbers</h2>
              <p className="text-white/70 text-lg">Growing every day with our community</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
              {statItems.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-6 sm:p-8"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                >
                  <div className="text-4xl sm:text-5xl font-display font-bold text-white mb-2">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-white/70 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-2xl p-12 sm:p-16"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Be part of the movement to make education accessible to all. Start sharing and learning today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <button
                  className="px-8 py-3 text-base font-semibold rounded-xl transition-all duration-200 hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: 'var(--color-accent)', color: '#fff', border: 'none' }}
                >
                  Get Started
                </button>
              </Link>
              <Link to="/contact">
                <button
                  className="px-8 py-3 text-base font-semibold rounded-xl transition-all duration-200 hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}
                >
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
