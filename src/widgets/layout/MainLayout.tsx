import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

export function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          {/* 👇 เนื้อหาของแต่ละ Page (เช่น MainPage) จะถูก render ตรงนี้ */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
