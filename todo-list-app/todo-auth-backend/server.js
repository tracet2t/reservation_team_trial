const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config(); // For environment variables

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use environment variable for secret key

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./users.db');

// Create users table if not exists
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
});

// Register route
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Insert the user into the database
  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
    if (err) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login request received:', req.body); // Debug statement

  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) {
      console.error('Error fetching user:', err); // Debug statement
      return res.status(500).json({ message: 'Error fetching user' });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      console.log('Invalid username or password'); // Debug statement
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '24h', // 24 hours
    });

    console.log('Login successful, token generated:', token); // Debug statement
    res.status(200).json({ token });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});