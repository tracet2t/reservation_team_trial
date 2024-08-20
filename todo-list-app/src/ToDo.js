import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ToDo = () => {
  const [token, setToken] = useState(null);
  const [tasks, setTasks] = useState([]); // Ensure tasks is an array initially
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchTasks(storedToken); // Fetch tasks on component mount
    } else {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  // Fetch tasks from the backend
  const fetchTasks = (token) => {
    fetch('http://localhost:5000/tasks', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => {
        console.error('Error:', error);
        setTasks([]); // Ensure tasks is an array even if the request fails
      });
  };

  const handleAddTask = () => {
    if (title.trim()) {
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate,
        priority: priority,
      };

      fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then(response => response.json())
        .then(data => {
          if (data.taskId) {
            setTasks([...tasks, { ...newTask, id: data.taskId, completed: false }]);
          }
          clearForm();
        })
        .catch(error => console.error('Error:', error));
    }
  };

  const handleDeleteTask = (index) => {
    const taskId = tasks[index].id;

    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Task deleted successfully') {
          const newTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
          setTasks(newTasks);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleEditTask = (index) => {
    const task = tasks[index];
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleUpdateTask = () => {
    if (title.trim()) {
      const updatedTask = {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate,
        priority: priority,
        completed: tasks[currentTaskIndex].completed,
      };

      const taskId = tasks[currentTaskIndex].id;

      fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Task updated successfully') {
            const updatedTasks = tasks.map((task, index) =>
              index === currentTaskIndex ? { ...updatedTask, id: taskId } : task
            );
            setTasks(updatedTasks);
            clearForm();
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };

  const handleToggleComplete = (index) => {
    const task = tasks[index];
    const updatedTask = { ...task, completed: !task.completed };

    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Task updated successfully') {
          const updatedTasks = tasks.map((task, taskIndex) =>
            taskIndex === index ? updatedTask : task
          );
          setTasks(updatedTasks);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
    setIsEditing(false);
    setCurrentTaskIndex(null);
  };

  const filteredTasks = Array.isArray(tasks) ? tasks
    .filter((task) => {
      if (filter === 'all') return true;
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .filter((task) => {
      return (
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }) : [];

  const sortedTasks = filteredTasks.sort((a, b) => {
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="todo-app">
      <button onClick={() => {
        localStorage.removeItem('token'); // Clear token on logout
        navigate('/login');
      }}>Logout</button>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due Date"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={isEditing ? handleUpdateTask : handleAddTask}>
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks"
      />
      <ul>
        {sortedTasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => handleToggleComplete(index)}>
              {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
            </button>
            <button onClick={() => handleEditTask(index)}>Edit</button>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
