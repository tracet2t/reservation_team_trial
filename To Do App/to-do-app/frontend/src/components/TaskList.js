import React from 'react';
// import { getTasks } from '../api/taskApi';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList() {
  const tasks = [{ id: 1, title: "Task 1", description: "Description 1", dueDate: "2024-08-20", priority: "High", completed: false },
    { id: 2, title: "Task 2", description: "Description 2", dueDate: "2024-08-21", priority: "Medium", completed: true }];
  
  const onDeleteTask = (taskId) => {
    console.log("Delete task", taskId);
  };

  const onCompleteTask = (taskId) => {
    console.log("Complete task", taskId);
  };

  return (
    <div className="task-list-container">
      <h1 className="title">All Tasks</h1>
      {tasks.map(task => (
        <TaskItem key={task.id}task={task}
        onEdit={() => {}}
        onDelete={() => onDeleteTask(task.id)}
        onComplete={() => onCompleteTask(task.id)}
        />
        ))}
        
    </div>
  );
}


export default TaskList;
