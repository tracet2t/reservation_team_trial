import React, { useState } from 'react';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(''); // New state for due date
  const [error, setError] = useState('');

  const handleAddTask = () => {
    if (title.trim()) {
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate.trim(), // Include due date in the task
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setDueDate(''); // Clear the due date input after adding the task
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
      <button
        onClick={handleAddTask}
        disabled={!title.trim()} // Disable the button if the title is empty
      >
        Add Task
      </button>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h2>{task.title}</h2>
            {task.description && <p>{task.description}</p>}
            {task.dueDate && <p>Due Date: {task.dueDate}</p>} {/* Display due date if available */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
