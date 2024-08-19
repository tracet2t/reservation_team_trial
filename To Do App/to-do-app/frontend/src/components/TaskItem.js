import React from 'react';
import { Link } from 'react-router-dom';
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
        <p><strong>Completed:
          <input type="checkbox" checked={task.completed} onChange={onComplete}/> </strong></p>
        <Link to={`/editTask`}>
        {/* //need to connect by id later */}
        <button>Edit</button></Link>
        <button onClick={onDelete} className="btn-secondary">Delete</button>
      </div>
      </div>
    );
  }

export default TaskItem;