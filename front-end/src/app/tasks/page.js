"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";

const getToken = () => {
  if (typeof window !== 'undefined') {
    return document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
  }
  return null;
};

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

const fetchTasks = async () => {
  try {
    const token = getToken();
    const response = await api.get('/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};

const createTask = async (task) => {
  try {
    const token = getToken();
    const response = await api.post('/todos', task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create task');
  }
};

const updateTask = async (id) => {
  try {
    const token = getToken();
    const response = await api.patch(`/todos/${id}/toggle`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task');
  }
};

const deleteTask = async (id) => {
  try {
    const token = getToken();
    const response = await api.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete task');
  }
};

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getTasks();
  }, []);

  const handleCreateTask = async () => {
    if (newTask.trim()) {
      try {
        const createdTask = await createTask({ title: newTask });
        setTasks([...tasks, createdTask]);
        setNewTask('');
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const updatedTask = await updateTask(id);
      setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="width-4/5 max-w-6xl container p-8 bg-white shadow-md rounded-md text-center">

        <header className="mb-8">
          <h1 className="text-3xl font-bold">Tasks</h1>
        </header>

        <div className="m-32">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="border rounded p-2 mr-2"
          />
          <Button onClick={handleCreateTask}>Add Task</Button>
        </div>
<ul className="mt-8">
  {tasks.map((task) => (
    <li key={task.id} className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <span
          className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
        >
          {task.title}
        </span>
      </div>
      <div className="flex items-center">
        <Button 
          onClick={() => handleToggleTask(task.id)} 
          className={`${task.completed ? 'bg-green-500' : 'bg-gray-500'} text-white ml-4`}
        >
          {task.completed ? 'Completed' : 'Not Completed'}
        </Button>
        <Button 
          onClick={() => handleDeleteTask(task.id)} 
          className="bg-red-500 text-white ml-4"
        >
          Delete
        </Button>
      </div>
    </li>
  ))}
</ul>

      </div>
    </div>
  );
};

export default TasksPage;
