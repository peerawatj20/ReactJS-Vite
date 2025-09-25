import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ProductDetailPage = lazy(
  () => import('@/features/products/pages/ProductDetailPage'),
);
const ProductListPage = lazy(
  () => import('@/features/products/pages/ProductListPage'),
);

export const protectedRoutes: RouteObject[] = [
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
      const response = await fetch(`/api/products/${params.productId}`);
      return response.json();
    },
  },
];
