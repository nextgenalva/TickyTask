import React, { useState } from 'react';
import TaskList from './TaskList';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Read a book 📚", time: "08:00 - 09:00" },
    { id: 2, title: "Wireframing new product", time: "09:00 - 11:00" },
    { id: 3, title: "Moodboard Landing Page", tag: "# Mobal Project", time: "11:00 - 13:00", users: ["user1", "user2"] },
    { id: 4, title: "Weekly meeting", tag: "# Futur Project", time: "13:00 - 14:00", users: ["user1", "user2", "user3"] },
    { id: 5, title: "Design PPT for Sharing Session #2", time: "14:00 - 16:00" },
    { id: 6, title: "Ngopi with Bojo", time: "17:00 - 18:30" },
    { id: 7, title: "", time: "19:00 - 20:00" },
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