import { Navigate, createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from '@/components/router/ProtectedRoute';

import LoginPage from '@/features/auth/pages/LoginPage';

import { MainLayout } from '@/widgets/layout/MainLayout';
import { RootLayout } from '@/widgets/layout/RootLayout';

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
