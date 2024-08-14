import React, { useState } from 'react';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const handleAddTask = () => {
    if (title.trim() === '') return; // Don't add a task without a title

    const newTask = {
      title,
      description,
      dueDate,
    };

    setTasks([...tasks, newTask]);
    clearForm();
  };

  const handleEditTask = (index) => {
    const task = tasks[index];
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleSaveTask = () => {
    if (title.trim() === '') return; // Don't save a task without a title

    const updatedTasks = tasks.map((task, index) =>
      index === currentTaskIndex ? { title, description, dueDate } : task
    );

    setTasks(updatedTasks);
    setIsEditing(false);
    setCurrentTaskIndex(null);
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        placeholder="Due Date (optional)"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={isEditing ? handleSaveTask : handleAddTask}>
        {isEditing ? 'Save Changes' : 'Add Task'}
      </button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            {task.dueDate && <p>Due Date: {task.dueDate}</p>}
            <button onClick={() => handleEditTask(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
