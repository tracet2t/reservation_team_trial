import React, { useState } from 'react';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium'); // New state for priority
  const [error, setError] = useState('');

  const handleAddTask = () => {
    if (title.trim()) {
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate.trim(),
        priority, // Include priority in the task
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium'); // Reset priority to default after adding the task
      setError('');
    } else {
      setError('Title is required');
    }
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due Date (optional)"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        onClick={handleAddTask}
        disabled={!title.trim()}
      >
        Add Task
      </button>
      {error && <p className="error">{error}</p>}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h2>{task.title}</h2>
            {task.description && <p>{task.description}</p>}
            {task.dueDate && <p>Due Date: {task.dueDate}</p>}
            <p>Priority: {task.priority}</p> {/* Display priority */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
