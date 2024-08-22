const express = require('express');
require('dotenv').config();


const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { registerSchema, loginSchema } = require('../validators/taskValidator.js');
const validate = require('../middlewares/validate.js');
const {authenticate, authenticateAdmin} = require('../middlewares/authenticate.js');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const saltRounds = 10;
const secret = process.env.JWT_SECRET


router.post('/login', validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
    const isAdmin = user.isAdmin;

    res.json({ token,  isAdmin});
  } catch (error) {
    res.status(400).json({ error: 'Failed to login' });
  }
});

router.post('/register', authenticateAdmin, validate(registerSchema), async (req, res) => {
  const { email, password, name, isAdmin } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });


    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        isAdmin
      },
    });



    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});





module.exports = router;
