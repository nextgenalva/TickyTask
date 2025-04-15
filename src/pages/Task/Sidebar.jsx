import React from 'react';
import { FcBookmark, FcBusiness, FcCheckmark, FcHome, FcPortraitMode } from 'react-icons/fc';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const sidebarItems = [
    { id: 1, icon: <FcHome />, label: "Dashboard", count: 8, path: "/app" },
    { id: 2, icon: <FcCheckmark />, label: "Completed", count: 16, path: "/app/completed" },
    { id: 3, icon: <FcPortraitMode />, label: "Personal", count: 4, path: "/app/personal" },
    { id: 4, icon: <FcBusiness />, label: "Work", count: 6, path: "/app/work" },
    { id: 5, icon: <FcBookmark />, label: "Bookmarks", count: 8, path: "/app/books" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Private</h2>
          <button className="btn btn-ghost btn-xs">✏️</button>
        </div>

        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <li key={item.id}>
                <Link 
                  to={item.path}
                  className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span> <span>{item.label}</span>
                  </div>
                  <span className={isActive ? "text-blue-600" : "text-gray-500"}>{item.count}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <button className="btn btn-ghost btn-sm w-full mt-4 justify-start">
          <span className="text-lg mr-1">+</span> Create new list
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;