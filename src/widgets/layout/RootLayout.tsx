import { Outlet } from 'react-router-dom';

import Loading from '@/shared/ui/global/Loading';
import Notification from '@/shared/ui/global/Notification';

export function RootLayout() {
  return (
    <>
      <Loading />
      <Notification />
      <Outlet />
    </>
  );
}
