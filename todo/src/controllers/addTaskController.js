const { Task } = require('../../index');

async function addTask(task) {
    if (!task.title) {
        throw new Error('Title is required');
    }
    try {
        // Save the task to the database
        const createdTask = await Task.create(task);
        return createdTask;
    } catch (err) {
        console.error('Database Error:', err.message);
        throw new Error('Failed to add task to the database');
    }
}

module.exports = { addTask };