import React from 'react';

function TaskItem({ task }) {
    return (
        <div className="task-item border p-4 mb-2 rounded shadow-md">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <p>{task.description}</p>
        <p><strong>Due Date:</strong> {task.dueDate}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}</p>
      </div>
    );
  }

export default TaskItem;