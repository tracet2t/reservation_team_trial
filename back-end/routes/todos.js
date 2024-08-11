const express = require('express');

// defining router
const router = express.Router();


// zod for data schema validation ??
const { taskSchema } = require('../validators/taskValidator.js');
const validate = require('../middlewares/validate.js');

// prisma for simplified interaction with db
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});



router.post('/', validate(taskSchema), async (req, res) => {
  const { title, description, dueDate, priority, expiration, completed } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        expiration: expiration ? new Date(expiration) : null,
        completed: completed || false, 
      },
    });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});



router.put('/:id', validate(taskSchema), async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, expiration, completed } = req.body;

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        expiration: expiration ? new Date(expiration) : null,
        completed: completed !== undefined ? completed : undefined, 
      },
    });

    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});



router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.todo.delete({
      where: { id: parseInt(id, 10) },
    });
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
});



router.patch('/:id/toggle', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id, 10) },
      data: {
        completed: !todo.completed,
      },
    });

    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});



router.get('/search', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter `q` is required' });
  }

  try {
    const todos = await prisma.todo.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: q,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search tasks' });
  }
});

module.exports = router;
