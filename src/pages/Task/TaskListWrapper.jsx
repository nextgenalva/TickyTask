import React from 'react';
import { useParams } from 'react-router-dom';
import TaskList from './TaskList';

const TaskListWrapper = () => {
  const { id } = useParams();
  return <TaskList selectedListId={parseInt(id)} />;
};

export default TaskListWrapper;
