import React, { useState } from 'react';
import './AddTask.css';

const AddTask = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title) {
      alert('Title is required');
      return;
    }

    const newTask = {
      title,
      description,
      dueDate,
      priority,
    };
    try {
      const response = await fetch('/api/tasks/index.js', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const createdTask = await response.json();
      console.log('Task Created:', createdTask);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  return (
    <div className="add-task-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Due Date:
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Priority:
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
