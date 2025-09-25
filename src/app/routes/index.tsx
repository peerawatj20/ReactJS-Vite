import { Navigate, createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/components/layouts/MainLayout';
import { RootLayout } from '@/components/layouts/RootLayout';
import ProtectedRoute from '@/components/router/ProtectedRoute';

import NotFoundPage from '@/pages/NotFoundPage';

import { protectedRoutes } from './protected.routes';
import { publicRoutes } from './public.routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      ...publicRoutes,
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <MainLayout />,
            children: [...protectedRoutes],
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
export default router;
