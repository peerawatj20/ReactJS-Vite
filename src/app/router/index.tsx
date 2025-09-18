import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '../../pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />, // Layout หลัก
  },
  //   {
  //     path: "/",
  //     element: <Root />, // Layout หลัก
  //     children: [
  //       {
  //         path: "/",
  //         element: <HomePage />,
  //       },
  //     ],
  //   },
]);
export default router;
