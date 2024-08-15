import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm fetchTasks={fetchTasks} />
      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <TaskList tasks={tasks} fetchTasks={fetchTasks} />}
    </div>
  );
};

export default App;

