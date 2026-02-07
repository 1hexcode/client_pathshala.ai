import { createBrowserRouter } from 'react-router-dom';
import { MainLayout, AuthLayout, ChatLayout } from '../layouts';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import {
  HomePage,
  LoginPage,
  SignupPage,
  SummaryPage,
  DashboardPage,
  NotesPage,
  NoteViewPage,
  UploadPage,
  AdminPage,
  AboutPage,
  ContactPage,
  NotFoundPage,
} from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'notes',
        element: <NotesPage />,
      },
      {
        path: 'notes/:noteId',
        element: <NoteViewPage />,
      },
      {
        path: 'upload',
        element: (
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute roles={['admin', 'super_admin']}>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
  {
    element: <ChatLayout />,
    children: [
      {
        path: 'summary',
        element: <SummaryPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
