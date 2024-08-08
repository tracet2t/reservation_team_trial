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
  const { title, description, dueDate, priority } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
      },
    });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});



module.exports = router;
