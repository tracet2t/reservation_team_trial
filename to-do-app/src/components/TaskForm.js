import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/tasks', {
        title,
        description,
        dueDate,
        priority,
      });
      fetchTasks();
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
      setMessage({ text: 'Task added successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Failed to add task.', type: 'error' });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit">Add Task</button>
      {message && <p className={`message ${message.type}`}>{message.text}</p>}
    </form>
  );
};

export default TaskForm;
