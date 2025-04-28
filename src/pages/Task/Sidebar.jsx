import React, { useState, useEffect } from 'react';
import {
  FcBookmark, FcBusiness, FcCheckmark, FcHome, FcPortraitMode
} from 'react-icons/fc';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosClient from "../../api/axiosClient";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const [taskLists, setTaskLists] = useState([]);

  const iconMap = {
    Dashboard: <FcHome />,
    Completed: <FcCheckmark />,
    Personal: <FcPortraitMode />,
    Work: <FcBusiness />,
    Bookmarks: <FcBookmark />
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const res = await axiosClient.get('lists/');
      setTaskLists(res.data);
    } catch (err) {
      console.error('Failed to fetch task lists:', err);
    }
  };

  const handleCreateList = async () => {
    const name = prompt("Enter a name for your new list:");
    if (!name?.trim()) return;

    try {
      const res = await axiosClient.post('lists/', { name });
      const newList = res.data;
      setTaskLists(prev => [...prev, newList]);
      navigate(`/app/list/${newList.id}`);
    } catch (err) {
      console.error("Failed to create list:", err);
      alert("Failed to create list. Please try again.");
    }
  };

  return (
    <aside className={`bg-white shadow-md h-full overflow-y-auto transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          {!collapsed && <h2 className="text-xl font-bold">Private</h2>}
          <button className="btn p-2 btn-ghost ml-auto" onClick={toggleSidebar}>
            {collapsed ? <FiChevronRight className='text-xl' /> : <FiChevronLeft className='text-xl' />}
          </button>
        </div>

        <ul className="space-y-1">
          {taskLists.map((item) => {
            const path = `/app/list/${item.id}`;
            const isActive = currentPath === path;
            const icon = iconMap[item.name] || <FcBookmark />;

            return (
              <li key={item.id}>
                <Link 
                  to={path}
                  className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                  title={collapsed ? item.name : ''}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{icon}</span> 
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                  {!collapsed && <span className={isActive ? "text-blue-600" : "text-gray-500"}>{item.tasks?.length || 0}</span>}
                </Link>
              </li>
            );
          })}
        </ul>

        {!collapsed ? (
          <button onClick={handleCreateList} className="btn btn-ghost btn-sm w-full mt-4 justify-start">
            <span className="text-lg mr-1">+</span> Create new list
          </button>
        ) : (
          <button onClick={handleCreateList} className="btn btn-ghost btn-circle btn-sm w-full mt-4 flex justify-center" title="Create new list">
            <span className="text-lg">+</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
