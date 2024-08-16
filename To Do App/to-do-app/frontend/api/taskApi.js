import axios from 'axios';

const apiUrl = 'http://localhost:3000/tasks';

export const fetchTasks = async () => {
  return await axios.get(apiUrl);
};

export const createTask = async (task) => {
  return await axios.post(apiUrl, task);
};

// export const updateTask = async (id, task) => {
//   return await axios.put(`${apiUrl}/${id}`, task);
// };

// export const deleteTask = async (id) => {
//   return await axios.delete(`${apiUrl}/${id}`);
// };
