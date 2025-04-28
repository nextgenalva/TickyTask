import React, { useState, useEffect } from 'react'; // Add useState here
import { motion, AnimatePresence } from 'framer-motion';
import axiosClient from '../../api/axiosClient';

const TaskInputDropdown = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    time: '',
    listId: ''
  });
  const [taskLists, setTaskLists] = useState([]);

  const timeOptions = [
    '08:00 – 09:00',
    '09:00 – 11:00',
    '11:00 – 13:00',
    '13:00 – 14:00',
    '14:00 – 16:00',
    '17:00 – 18:30'
  ];

  useEffect(() => {
    axiosClient.get('lists/')
      .then(res => setTaskLists(res.data))
      .catch(err => console.error('Failed to fetch lists:', err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [start, end] = newTask.time.split(' – ');
    try {
      const response = await axiosClient.post('tasks/', {
        title: newTask.title,
        start_time: start,
        end_time: end,
        task_list: newTask.listId,
        completed: false
      });
      onAddTask?.(response.data); // Send to parent if needed
      setNewTask({ title: '', time: '', listId: '' });
      setIsOpen(false);
    } catch (err) {
      console.error('Task creation failed:', err);
    }
  };

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
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  placeholder="Task title"
                  className="w-full p-2 mb-3 bg-neutral-700 rounded text-white placeholder-neutral-400 focus:outline-none"
                  required
                />

                <select
                  name="time"
                  value={newTask.time}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-3 bg-neutral-700 rounded text-white focus:outline-none"
                  required
                >
                  <option value="">Select time</option>
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  ))}
                </select>

                <select
                  name="listId"
                  value={newTask.listId}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 bg-neutral-700 rounded text-white focus:outline-none"
                  required
                >
                  <option value="">Select list</option>
                  {taskLists.map(list => (
                    <option key={list.id} value={list.id}>{list.name}</option>
                  ))}
                </select>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setIsOpen(false)} className="text-sm bg-neutral-700 text-neutral-300 px-4 py-2 rounded">Cancel</button>
                  <button type="submit" className="text-sm bg-neutral-600 text-white px-4 py-2 rounded">Add</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-neutral text-white rounded-full py-3 px-6 flex items-center justify-center hover:bg-neutral-700 transition w-full"
        >
          <span className="mr-2 text-xl font-light">+</span> Create new task
        </button>
      </div>
    </div>
  );
};

export default TaskInputDropdown;
