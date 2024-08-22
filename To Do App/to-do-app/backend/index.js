const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do API');
});

// Get All Tasks
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Get a Single Task by ID
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(task);
});

// Create a New Task
app.post('/tasks', async (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTask = await prisma.task.create({
    data: { title, description, dueDate: new Date(dueDate) },
  });
  res.json(newTask);
});

// Update a Task by ID
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, dueDate } = req.body;
  const updatedTask = await prisma.task.update({
    where: { id: parseInt(id) },
    data: { title, description, completed, dueDate: new Date(dueDate) },
  });
  res.json(updatedTask);
});

// Delete a Task by ID
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const deletedTask = await prisma.task.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedTask);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});