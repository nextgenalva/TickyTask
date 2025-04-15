import React, { useState } from 'react';
import TaskList from './TaskList';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Read a book 📚", time: "08:00 - 09:00" },
    { id: 2, title: "Wireframing new product", time: "09:00 - 11:00" },
    { id: 3, title: "Moodboard Landing Page", time: "11:00 - 13:00"},
    { id: 4, title: "Weekly meeting", time: "13:00 - 14:00"},
    { id: 5, title: "Design PPT for Sharing", time: "14:00 - 16:00" },
    { id: 6, title: "Ngopi with Bojo", time: "17:00 - 18:30" },
  ]);

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <div className="p-6">
      <div className="mt-8">
        <TaskList tasks={tasks} onAddTask={handleAddTask} />
      </div>
    </div>
  );
};

export default Dashboard;