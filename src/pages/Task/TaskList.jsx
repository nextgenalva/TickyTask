import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import TaskInputDropdown from './TaskInputDropdown';
import axiosClient from '../../api/axiosClient';

const TaskList = ({ selectedListId }) => {
  const [tasks, setTasks] = useState([]);
  const [taskLists, setTaskLists] = useState([]);

  // Fetch task lists and tasks from the backend
  useEffect(() => {
    // Fetch task lists for dropdown options
    axiosClient.get('lists/')
      .then(res => setTaskLists(res.data))
      .catch(err => console.error("Error fetching task lists:", err));

    if (!selectedListId) return;
    // Fetch tasks filtered by the selected list
    axiosClient.get('tasks/')
      .then(res => {
        const filtered = res.data.filter(task => task.task_list === selectedListId);
        setTasks(filtered);
      })
      .catch(err => console.error("Error fetching tasks:", err));
  }, [selectedListId]);

  const handleAddTask = async (newTask) => {
    try {
      const payload = {
        ...newTask,
        task_list: selectedListId,
        completed: false
      };
      const res = await axiosClient.post('tasks/', payload);
      setTasks(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const res = await axiosClient.patch(`tasks/${id}/`, { completed: !currentStatus });
      setTasks(prev => prev.map(task => task.id === id ? res.data : task));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axiosClient.delete(`tasks/${id}/`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={() => handleToggleComplete(task.id, task.completed)}
          onDelete={() => handleDeleteTask(task.id)}
        />
      ))}
      <TaskInputDropdown
        onAddTask={handleAddTask}
        taskLists={taskLists}  /* Pass taskLists here */
      />
    </div>
  );
};

export default TaskList;
