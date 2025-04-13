import React from 'react';
import TaskCard from './TaskCard';
import TaskInputModal from './TaskInputModal';

const TaskList = ({ tasks, onAddTask }) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      
      <TaskInputModal onAddTask={onAddTask} />
    </div>
  );
};

export default TaskList;