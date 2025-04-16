import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

const TaskCard = ({ task }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed || false);

  const handleCheckboxToggle = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div 
          className={`w-5 h-5 flex items-center justify-center rounded-md border cursor-pointer transition-colors duration-300 ${
            isCompleted 
              ? 'bg-neutral border-gray-900' 
              : 'bg-white border-gray-300 hover:border-gray-500'
          }`}
          onClick={handleCheckboxToggle}
        >
          {isCompleted && <FaCheck className="text-white text-xs" />}
        </div>
        <div>
          <span 
            className={`transition-all duration-500 ${isCompleted ? 'text-gray-400' : ''}`}
            style={{
              textDecoration: isCompleted ? 'line-through' : 'none',
              textDecorationColor: isCompleted ? '#9CA3AF' : 'transparent',
              textDecorationThickness: '2px',
              transition: 'text-decoration 0.5s ease, color 0.5s ease'
            }}
          >
            {task.title || "Untitled Task"}
          </span>
          {task.tag && <span className="text-xs text-neutral-500 ml-2">{task.tag}</span>}
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