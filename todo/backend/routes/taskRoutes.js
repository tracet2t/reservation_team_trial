const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all tasks
router.get('/', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Create a new task
router.post('/', (req, res) => {
    const { title, description = '', dueDate = null, priority = 'Medium', expiration = null } = req.body;
    if (!title) {
        res.status(400).json({ error: 'Title is required' });
        return;
    }

    db.run('INSERT INTO tasks (title, description, dueDate, priority, expiration) VALUES (?, ?, ?, ?, ?)',
        [title, description, dueDate, priority, expiration],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ id: this.lastID, title, description, dueDate, priority, expiration });
        });
});

// Update a task
router.put('/:id', (req, res) => {
    const { title, description = '', dueDate = null, priority = 'Medium', expiration = null } = req.body;
    if (!title) {
        res.status(400).json({ error: 'Title is required' });
        return;
    }

    db.run('UPDATE tasks SET title = ?, description = ?, dueDate = ?, priority = ?, expiration = ? WHERE id = ?',
        [title, description, dueDate, priority, expiration, req.params.id],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ changes: this.changes });
        });
});

// Delete a task
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM tasks WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ changes: this.changes });
    });
});

module.exports = router;
