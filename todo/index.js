const { Sequelize, DataTypes } = require('sequelize');

// Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/models/database.sqlite'
});

// simple model to test the connection
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
    // Sync database and create the table
    await sequelize.sync();
    console.log('Database & tables created!');

    // Additional test: Create a test entry
    await Task.create({
      title: 'Test Task',
      description: 'This is a test task to verify database connection.'
    });

    console.log('Test entry created successfully!');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
})();
