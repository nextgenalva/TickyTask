import { Outlet } from 'react-router-dom';
import Sidebar from './../pages/Task/Sidebar';
import Topbar from '../pages/Task/Topbar';
import Navbar from './../Shared/Navbar';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <Navbar />
      <div className="w-9/12 mx-auto flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;