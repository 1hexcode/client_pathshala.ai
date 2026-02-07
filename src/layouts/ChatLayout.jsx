import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout';

export function ChatLayout() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
