const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create Task
app.post('/tasks', async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  const task = await prisma.task.create({
    data: { title, description, dueDate, priority },
  });
  res.json(task);
});

//View TaskList
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

