const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 5001;

// Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/models/database.sqlite'
});

// Simple model to test the connection
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

(async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync models with the database (create table if not exists)
    await sequelize.sync();
    console.log('Database synced.');

  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

// Route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Route to test database interaction
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
