
const API_URL = 'http://localhost:3001/tasks';

export const addTask = async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const getTasks = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return []; 
  }
};