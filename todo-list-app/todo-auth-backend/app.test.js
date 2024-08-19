const request = require('supertest');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(':memory:'); // Use in-memory database for testing
const JWT_SECRET = 'test_secret_key';

// Initialize the database
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
    if (err) {
      return res.status(500).json({ message: 'Error fetching user' });
    }
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ token });
  });
});

// Tests
describe('User Authentication', () => {
  beforeAll((done) => {
    // Set up the database before running the tests
    db.run(`DELETE FROM users`, done);
  });

  test('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  test('should not register a user with an existing username', async () => {
    await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'testpassword' });

    const response = await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'anotherpassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Username already exists');
  });

  test('should log in an existing user', async () => {
    await request(app)
      .post('/register')
      .send({ username: 'testloginuser', password: 'loginpassword' });

    const response = await request(app)
      .post('/login')
      .send({ username: 'testloginuser', password: 'loginpassword' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should not log in with incorrect password', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testloginuser', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid username or password');
  });

  test('should not log in a non-existent user', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'nonexistentuser', password: 'nopassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid username or password');
  });
});
