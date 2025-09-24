import { Navigate, createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/components/layouts/MainLayout';
import { RootLayout } from '@/components/layouts/RootLayout';
import ProtectedRoute from '@/components/router/ProtectedRoute';

import LoginPage from '@/features/auth/pages/LoginPage';

import HomePage from '@/pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <MainLayout />,
            children: [
              {
                path: 'home',
                element: <HomePage />,
              },
              {
                path: 'products',
                element: <HomePage />,
              },
              {
                path: 'products/:productId',
                element: <HomePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
export default router;
