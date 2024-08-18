import React from 'react';
import '../styles/TaskList.css';

function TaskItem({  task, onComplete, onEdit, onDelete }) {
    return (
      <div className="task-item">
        <div className="task-details">
          <h3 className="title">{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
      </div>
      <div className="task-actions">
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}</p>
        <button onClick={onComplete} className="btn-secondary">Complete</button>
        <button onClick={onEdit} className="btn-secondary">Edit</button>
        <button onClick={onDelete} className="btn-secondary">Delete</button>
      </div>
      </div>
    );
  }

export default TaskItem;