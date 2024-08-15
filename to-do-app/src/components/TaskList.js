import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <div className="task-info">
            <p>{task.title}</p>
            <span>{task.description}</span>
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
