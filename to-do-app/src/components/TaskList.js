import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    }
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={`task-item ${task.priority.toLowerCase()}`}>
          <div className="task-info">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>Due: {task.dueDate}</span>
            <span>Priority: {task.priority}</span>
          </div>
          <div className="task-actions">
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
