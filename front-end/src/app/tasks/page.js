"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const isDueDatePassed = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  return today > due;
};

const calculateRemainingTime = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  const timeDiff = due - now;

  if (timeDiff < 0) {
    return 'Due Date Passed';
  }

  const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `${daysRemaining} days ${hoursRemaining} hours remaining`;
};

const getToken = () => {
  if (typeof window !== 'undefined') {
    return document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
  }
  return null;
};

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

const fetchTasks = async (searchQuery = '') => {
  try {
    const token = getToken();
    const response = await api.get(`/todos/search?q=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};

const updateTaskDetails = async (taskId, taskData) => {
  try {
    const token = getToken();
    const response = await api.put(`/todos/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task');
  }
};

const requestNotificationPermission = () => {
  if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
};

const notifyUser = (taskTitle) => {
  if (window.Notification && Notification.permission === "granted") {
    new Notification("Task Due Notification", {
      body: `The task "${taskTitle}" is due now.`,
      icon: "/path-to-icon.png",
    });
  }
};

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
  });

  useEffect(() => {
    requestNotificationPermission();

    const getTasks = async () => {
      try {
        const data = await fetchTasks(searchQuery);
        setTasks(data);

        data.forEach(task => {
          if (isDueDatePassed(task.dueDate)) {
            notifyUser(task.title);
          }
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    getTasks();
  }, [searchQuery]);

  const handleToggleTask = async (taskId) => {
    try {
      const token = getToken();
      const response = await api.patch(`/todos/${taskId}/toggle`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedTask = response.data;
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error('Failed to toggle task:', error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = getToken();
      await api.delete(`/todos/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error.message);
    }
  };

  const handleAddTask = async () => {
    try {
      const newTaskData = await api.post('/todos', newTask, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setTasks([...tasks, newTaskData.data]);
      setNewTask({ title: '', description: '', dueDate: '', priority: '' });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTask(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateTask = async () => {
    if (selectedTask) {
      try {
        const updatedTask = await updateTaskDetails(selectedTask.id, selectedTask);
        setTasks(tasks.map(task => (task.id === selectedTask.id ? updatedTask : task)));
        closeEditModal();
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="width-4/5 max-w-6xl container p-8 bg-white shadow-md rounded-md text-center">

        <header className="mb-8">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <div className="mt-4 flex justify-center">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded p-2 w-1/2 mr-4"
            />
            <Button onClick={() => setIsAddModalOpen(true)} className="text-white">
              Add Task
            </Button>
          </div>
        </header>

        <ul className="mt-8">
          {tasks.map((task) => {
            const text = calculateRemainingTime(task.dueDate);
            return (
              <li key={task.id} className="flex justify-between items-center mb-4">
                <div
                  className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
                  onClick={() => openEditModal(task)}
                >
                  {task.title}
                </div>
                <div className={`text-sm p-2 rounded-full ${isDueDatePassed(task.dueDate) ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'}`}>
                  {isDueDatePassed(task.dueDate) ? 'Due Date Passed' : text}
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={() => openEditModal(task)}>Edit</Button>
                  <Button onClick={() => handleToggleTask(task.id)} className={`${task.completed ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                    {task.completed ? 'Completed' : 'Not Completed'}
                  </Button>
                  <Button onClick={() => handleDeleteTask(task.id)} className="bg-red-500 text-white">Delete</Button>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Edit Modal */}
        {isEditModalOpen && selectedTask && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
              <div className="mb-4">
                <label className="block text-left">Title</label>
                <input
                  type="text"
                  value={selectedTask.title}
                  onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-left">Description</label>
                <input
                  type="text"
                  value={selectedTask.description}
                  onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-left">Due Date</label>
                <input
                  type="date"
                  value={formatDate(selectedTask.dueDate)}
                  onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-left">Priority</label>
                <select
                  value={selectedTask.priority}
                  onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })}
                  className="border rounded p-2 w-full"
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button onClick={closeEditModal} className="bg-gray-500 text-white">Close</Button>
                <Button onClick={handleUpdateTask} className="bg-blue-500 text-white">Save</Button>
              </div>
            </div>
          </div>
        )}

        {/* Add Task Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Add Task</h2>
              <div className="mb-4">
                <label className="block text-left">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-left">Description</label>
                <input
                  type="text"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-left">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-left">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="border rounded p-2 w-full"
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsAddModalOpen(false)} className="bg-gray-500 text-white">Close</Button>
                <Button onClick={handleAddTask} className="bg-blue-500 text-white">Add</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TasksPage;
