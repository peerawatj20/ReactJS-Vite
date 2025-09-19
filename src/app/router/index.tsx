import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/widgets/layout/RootLayout';

import LoginPage from '@/pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
    ],
  },
]);
export default router;
