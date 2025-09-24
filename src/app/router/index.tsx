import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/components/layouts/MainLayout';
import { RootLayout } from '@/components/layouts/RootLayout';
import ProtectedRoute from '@/components/router/ProtectedRoute';

import LoginPage from '@/features/auth/pages/LoginPage';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ProductDetailPage = lazy(
  () => import('@/features/products/pages/ProductDetailPage'),
);
const ProductListPage = lazy(
  () => import('@/features/products/pages/ProductListPage'),
);

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
                element: <ProductListPage />,
              },
              {
                path: 'products/:productId',
                element: <ProductDetailPage />,
                loader: async ({ params }) => {
                  const response = await fetch(
                    `/api/products/${params.productId}`,
                  );
                  return response.json();
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);
export default router;
