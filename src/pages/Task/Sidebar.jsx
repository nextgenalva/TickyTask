import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const sidebarItems = [
    { id: 1, icon: "🏠", label: "Dashboard", count: 8, path: "/app" },
    { id: 2, icon: "✓", label: "Completed", count: 16, path: "/app/completed" },
    { id: 3, icon: "👤", label: "Personal", count: 4, path: "/app/personal" },
    { id: 4, icon: "💼", label: "Work", count: 6, path: "/app/work" },
    { id: 5, icon: "💪", label: "Diet", count: 3, path: "/app/diet" },
    { id: 6, icon: "📚", label: "List of Book", count: 8, path: "/app/books" },
    { id: 7, icon: "🚗", label: "Road trip list", count: 6, path: "/app/roadtrip" },
  ];

  const groups = [
    { id: 1, name: "Mobal Project", people: 5, users: ["yellow", "pink", "blue", "orange"], path: "/app/mobal" },
    { id: 2, name: "Futur Project", people: 4, users: ["blue", "pink", "green"], path: "/app/futur" },
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

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Group</h2>
          <div className="grid grid-cols-2 gap-2">
            {groups.map((group) => {
              const isActive = currentPath === group.path;
              return (
                <Link
                  key={group.id}
                  to={group.path}
                  className={`block ${isActive ? 'ring-2 ring-blue-400' : ''}`}
                >
                  <div className="bg-gray-100 rounded-lg p-3 cursor-pointer">
                    <div className="flex -space-x-2 mb-2">
                      {group.users.map((color, index) => (
                        <div 
                          key={index} 
                          className={`w-6 h-6 bg-${color}-400 rounded-full`}
                        ></div>
                      ))}
                    </div>
                    <div className={`text-sm font-medium ${isActive ? 'text-blue-600' : ''}`}>
                      {group.name}
                    </div>
                    <div className="text-xs text-gray-500">{group.people} People</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <button className="btn btn-ghost btn-sm w-full mt-4 justify-start">
            <span className="text-lg mr-1">+</span> Create new group
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;