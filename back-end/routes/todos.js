const express = require('express');

// defining router
const router = express.Router();


// zod for data schema validation ??
const { taskSchema } = require('../validators/taskValidator.js');
const validate = require('../middlewares/validate.js');

const authenticate = require('../middlewares/authenticate.js');

// prisma for simplified interaction with db
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// router.use();

router.get('/todos', authenticate ,async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: { userId: req.user.userId } 
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});



router.post('/todos', authenticate ,validate(taskSchema), async (req, res) => {
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
        userId: req.user.userId
      },
    });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});



router.put('/todos/:id', authenticate ,validate(taskSchema), async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, expiration, completed } = req.body;

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id, 10), userId: req.user.userId },
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



router.delete('/todos/:id', authenticate , async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.todo.delete({
      where: { id: parseInt(id, 10),  userId: req.user.userId },
    });
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
});



router.patch('/todos/:id/toggle', authenticate ,async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(id, 10),userId: req.user.userId  },
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

router.get('/todos/search', authenticate, async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter `q` is required' });
  }

  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.userId,
        title: {
          contains: q
        },
      },
    });
    

    res.json(todos);
  } catch (error) {
    console.error('Error searching tasks:', error);
    res.status(500).json({ error: 'Failed to search tasks' });
  }
});

module.exports = router;
