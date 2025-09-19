import { Outlet } from 'react-router-dom';

import GlobalLoading from '@/shared/ui/global/GlobalLoading';
import Notification from '@/shared/ui/global/Notification';

export function RootLayout() {
  return (
    <>
      <GlobalLoading />
      <Notification />
      <Outlet />
    </>
  );
}
