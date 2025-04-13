import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <input type="checkbox" className="checkbox checkbox-sm" />
        <div>
          <span>{task.title || "Untitled Task"}</span>
          {task.tag && <span className="text-xs text-blue-500 ml-2">{task.tag}</span>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {task.users && (
          <div className="flex -space-x-2">
            {task.users.includes("user1") && <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>}
            {task.users.includes("user2") && <div className="w-6 h-6 bg-red-400 rounded-full"></div>}
            {task.users.includes("user3") && <div className="w-6 h-6 bg-orange-400 rounded-full"></div>}
          </div>
        )}
        <span className="text-gray-500 text-sm">🕒 {task.time}</span>
        <button className="btn btn-ghost btn-xs"><FiMoreVertical /></button>
      </div>
    </div>
  );
};

export default TaskCard;