import { Outlet } from 'react-router-dom';

import SuspenseWrapper from '../router/SuspenseWrapper';
import Header from './Header';
import Sidebar from './Sidebar';

export function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <SuspenseWrapper>
            <Outlet />
          </SuspenseWrapper>
        </main>
      </div>
    </div>
  );
}
