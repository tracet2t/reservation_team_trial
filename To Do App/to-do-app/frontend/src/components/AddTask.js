import React, { useState } from 'react';
import { useNavigate } from'react-router-dom';
import '../styles/AddTask.css';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate, priority };
    console.log(newTask); 
  };

  return (
    <div className="add-task-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
          </label>
        </div>
        <div>
          <label>Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>Due Date:
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </label>
        </div>
        <div>
          <label>Priority:
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
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
}

export default AddTask;
