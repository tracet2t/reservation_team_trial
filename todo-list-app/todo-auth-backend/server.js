const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

// Create tasks table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  dueDate TEXT,
  priority TEXT,
  completed INTEGER DEFAULT 0,
  userId INTEGER,
  FOREIGN KEY(userId) REFERENCES users(id)
)`);

// Middleware to authenticate using JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register route
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) return res.status(500).json({ message: 'Error fetching user' });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ token });
  });
});

// Get tasks route
app.get('/tasks', authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.all(`SELECT * FROM tasks WHERE userId = ?`, [userId], (err, tasks) => {
    if (err) return res.status(500).json({ message: 'Error fetching tasks' });
    res.status(200).json(tasks);
  });
});

// Add task route
app.post('/tasks', authenticateToken, (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  const userId = req.user.id;

  db.run(
    `INSERT INTO tasks (title, description, dueDate, priority, userId) VALUES (?, ?, ?, ?, ?)`,
    [title, description, dueDate, priority, userId],
    function (err) {
      if (err) return res.status(500).json({ message: 'Error adding task' });
      res.status(201).json({ message: 'Task added successfully', taskId: this.lastID });
    }
  );
});

// Update task route
app.put('/tasks/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, completed } = req.body;
  const userId = req.user.id;

  db.run(
    `UPDATE tasks SET title = ?, description = ?, dueDate = ?, priority = ?, completed = ? WHERE id = ? AND userId = ?`,
    [title, description, dueDate, priority, completed, id, userId],
    function (err) {
      if (err) return res.status(500).json({ message: 'Error updating task' });
      if (this.changes === 0) return res.status(404).json({ message: 'Task not found' });
      res.status(200).json({ message: 'Task updated successfully' });
    }
  );
});

// Delete task route
app.delete('/tasks/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.run(`DELETE FROM tasks WHERE id = ? AND userId = ?`, [id, userId], function (err) {
    if (err) return res.status(500).json({ message: 'Error deleting task' });
    if (this.changes === 0) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

