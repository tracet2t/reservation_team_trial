import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from'react-router-dom';
import { fetchTask } from '../api/taskApi';
import '../styles/EditTask.css';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: 'Low' });

  useEffect(() => {
    const getTask = async () => {
      try {
        const data = await fetchTask(id);
        setTask(data);
      } catch (error) {
        console.error('Failed to fetch task', error);
      }
    };
    getTask();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(task);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
        <h1>Edit Task</h1>
        <label>Title:</label>
        <input type="text" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} required/>
        <label>Description:</label>
        <textarea value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })}/>
        <label>Due Date:</label>
        <input type="date" value={task.dueDate} onChange={(e) => setTask({ ...task, dueDate: e.target.value })}/>
        <label>Priority:</label>
        <select value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })} >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
        <button type="submit" className="submit-button">Save Changes</button>
    </form>
  );
}

export default EditTask;