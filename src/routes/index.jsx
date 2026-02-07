import { createBrowserRouter } from 'react-router-dom';
import { MainLayout, AuthLayout, ChatLayout } from '../layouts';
import {
  HomePage,
  LoginPage,
  SignupPage,
  SummaryPage,
  DashboardPage,
  NotesPage,
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
        element: <DashboardPage />,
      },
      {
        path: 'notes',
        element: <NotesPage />,
      },
      {
        path: 'upload',
        element: <UploadPage />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
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
