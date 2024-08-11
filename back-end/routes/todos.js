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
  const { title, description, dueDate, priority, expiration } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        expiration: expiration ? new Date(expiration) : null, 
      },
    });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

router.put('/:id', validate(taskSchema), async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, expiration } = req.body;
  
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        expiration: expiration ? new Date(expiration) : null, 
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

module.exports = router;
