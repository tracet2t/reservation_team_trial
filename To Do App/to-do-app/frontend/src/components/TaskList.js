import React from 'react';
// import { getTasks } from '../api/taskApi';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';

function TaskList() {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', completed: false, dueDate: '2024-08-16', priority: 'Low' },
    { id: 2, title: 'Task 2', description: 'Description 2', completed: true, dueDate: '2024-08-16', priority: 'Medium' },
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      {tasks.map(task => (
        <TaskItem key={task.id}task={task} />
        ))}
        
    </div>
  );
}


export default TaskList;
