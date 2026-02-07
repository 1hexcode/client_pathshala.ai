import { Link } from 'react-router-dom';
import { Button, Card, Badge } from '../components/common';
import { notes } from '../data/notes';
import { colleges } from '../data/academics';

export function HomePage() {
  const recentNotes = notes.filter(n => n.status === 'ready').slice(0, 4);
  const stats = [
    { label: 'Study Notes', value: '10,000+' },
    { label: 'Active Students', value: '5,000+' },
    { label: 'Subjects Covered', value: '200+' },
    { label: 'AI Responses', value: '1M+' },
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
              <Link to="/signup">
                <Button size="lg" variant="accent" className="w-full sm:w-auto">
                  Get Started Free
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
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-display font-bold text-white">{stat.value}</div>
                <div className="text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              From study materials to AI assistance, we've got your academic journey covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated" className="text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">Study Notes</h3>
              <p className="text-muted">
                Access thousands of curated notes organized by college, program, and subject. Download, view, and learn at your own pace.
              </p>
            </Card>
            
            <Card variant="elevated" className="text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">AI Study Assistant</h3>
              <p className="text-muted">
                Get instant help with homework, concepts, and exam prep. Our AI tutor is available 24/7 to answer your questions.
              </p>
            </Card>
            
            <Card variant="elevated" className="text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">Community</h3>
              <p className="text-muted">
                Share your notes, earn recognition, and connect with students from your college. Learn together, grow together.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Browse by College */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Browse by College
            </h2>
            <p className="text-lg text-muted">
              Find notes specific to your academic program
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {colleges.map((college) => (
              <Link key={college.id} to={`/notes?college=${college.id}`}>
                <Card interactive className="h-full p-6 hover:border-primary transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{college.name}</h3>
                  <p className="text-sm text-muted">{college.shortName}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Notes */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Recent Notes
              </h2>
              <p className="text-muted">Fresh study materials from the community</p>
            </div>
            <Link to="/notes">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentNotes.map((note) => (
              <Card key={note.id} interactive className="overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-1 line-clamp-1">{note.title}</h3>
                  <p className="text-sm text-muted mb-3 line-clamp-2">{note.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">{note.downloads} downloads</span>
                    <div className="flex items-center gap-1 text-accent">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {note.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-muted mb-8">
            Join thousands of students who are already studying smarter with PathshalaAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="primary">Create Free Account</Button>
            </Link>
            <Link to="/summary">
              <Button size="lg" variant="outline">Try AI Assistant</Button>
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
