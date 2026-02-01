import { createBrowserRouter } from 'react-router';
import { Portfolio } from '@/app/pages/Portfolio';
import { SignIn } from '@/app/pages/SignIn';
import { SignUp } from '@/app/pages/SignUp';
import { Dashboard } from '@/app/pages/Dashboard';
import { ProjectsList } from '@/app/pages/ProjectsList';
import { ProjectForm } from '@/app/pages/ProjectForm';
import { Settings } from '@/app/pages/Settings';
import { DashboardLayout } from '@/app/components/DashboardLayout';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Portfolio />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'projects',
        element: <ProjectsList />,
      },
      {
        path: 'projects/new',
        element: <ProjectForm />,
      },
      {
        path: 'projects/:id/edit',
        element: <ProjectForm />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);