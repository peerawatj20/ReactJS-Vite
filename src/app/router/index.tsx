import { Navigate, createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/widgets/layout/RootLayout';

import LoginPage from '@/pages/LoginPage';

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
    ],
  },
]);
export default router;
