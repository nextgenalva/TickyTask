import React, { useState } from 'react';

const TaskInputModal = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    time: '',
    tag: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim() && newTask.time.trim()) {
      onAddTask({
        id: Date.now(),
        ...newTask
      });
      setNewTask({ title: '', time: '', tag: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Create new task" 
          className="w-full border-none focus:outline-none mb-2" 
        />
        <div className="flex gap-2 mt-2">
          <input 
            type="text" 
            name="time"
            value={newTask.time}
            onChange={handleInputChange}
            placeholder="Time (e.g. 08:00 - 09:00)" 
            className="flex-1 text-sm p-1 border rounded" 
          />
          <input 
            type="text" 
            name="tag"
            value={newTask.tag}
            onChange={handleInputChange}
            placeholder="Tag (e.g. # Project)" 
            className="flex-1 text-sm p-1 border rounded" 
          />
          <button 
            type="submit"
            className="btn btn-sm btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInputModal;