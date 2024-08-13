const { Sequelize, DataTypes } = require('../database');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // Path relative to where  run the app
});

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    allowNull: false,
    defaultValue: 'Medium',
  },
});

module.exports = { Task, sequelize };
