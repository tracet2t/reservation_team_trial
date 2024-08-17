import React from 'react';
// import { getTasks } from '../api/taskApi';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';

function TaskList() {
  const tasks = [];
  
  return (
    <div>
      <h1 className="title">All Tasks</h1>
      {tasks.map(task => (
        <TaskItem key={task.id}task={task} />
        ))}
        
    </div>
  );
}


export default TaskList;
