import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskInputDropdown = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      onAddTask({
        id: Date.now(),
        ...newTask,
        completed: false
      });
      setNewTask({ title: '', time: '' });
      setIsOpen(false);
    }
  };

  const timeOptions = [
    '08:00 – 09:00',
    '09:00 – 11:00',
    '11:00 – 13:00',
    '13:00 – 14:00',
    '14:00 – 16:00',
    '17:00 – 18:30'
  ];

  // Framer Motion doesn't work in this environment,
  // so I'll create a CSS transition-based solution instead
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 w-64 z-10 overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-3">
                  <input 
                    type="text" 
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    placeholder="Task title" 
                    className="w-full p-2 bg-neutral-700 border-none rounded text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-500" 
                    autoFocus
                  />
                </div>
                
                <div className="mb-4">
                  <select
                    name="time"
                    value={newTask.time}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-neutral-700 border-none rounded text-white focus:outline-none focus:ring-1 focus:ring-neutral-500 appearance-none"
                    style={{ backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")", 
                            backgroundRepeat: "no-repeat", 
                            backgroundPosition: "right 0.5rem center",
                            backgroundSize: "1rem" }}
                  >
                    <option value="" className="bg-neutral-700">Select time</option>
                    {timeOptions.map((time, index) => (
                      <option key={index} value={time} className="bg-neutral-700">{time}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm bg-neutral-700 text-neutral-300 rounded hover:bg-neutral-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 text-sm bg-neutral-600 text-white rounded hover:bg-neutral-500 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-neutral text-white rounded-full py-3 px-6 flex items-center justify-center hover:bg-neutral-700 transition-colors duration-200 shadow-md w-full"
        >
          <span className="mr-2 text-xl font-light">+</span> Create new task
        </button>
      </div>
    </div>
  );
};

export default TaskInputDropdown;