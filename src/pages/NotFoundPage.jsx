import { Link } from 'react-router-dom';
import { Button } from '../components/common';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <span className="text-9xl font-display font-bold text-primary/20">404</span>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-text mb-4">
          Page Not Found
        </h1>
        
        <p className="text-text-muted mb-8">
          Oops! The page you're looking for doesn't exist or has been moved. 
          Don't worry, even the best scholars sometimes take a wrong turn.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Button>
          </Link>
          
          <Link to="/notes">
            <Button variant="outline">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Notes
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-text-muted">
            Need help? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
