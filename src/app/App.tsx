import { RouterProvider } from 'react-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { router } from '@/app/routes';
import { Toaster } from '@/app/components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}