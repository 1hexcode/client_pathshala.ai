import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components/layout';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
