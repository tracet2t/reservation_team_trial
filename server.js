const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('db.sqlite');
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.html'));
  });

db.serialize( ()=>{
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            due_date TEXT,
            priority TEXT,
            completed INTEGER DEFAULT 0
        )
        `);
});

app.post('/addTask', (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    console.log('Adding task:', { title, description, dueDate, priority }); // Log the task data
    db.run(`INSERT INTO tasks (title, description, due_date, priority) VALUES (?, ?, ?, ?)`, [title, description, dueDate, priority], function(error) {
        if (error) {
            console.error('Error inserting task:', error.message);
            return res.status(500).send(error.message);
        }
        fetchTasks(res);
    });
});


app.get('/tasks',(req,res)=>{
    fetchTasks(res);
});

function fetchTasks(res) {
    db.all('SELECT * FROM tasks', (error, rows) => {
        if (error) {
            console.error('Error fetching tasks:', error.message);
            return res.status(500).send(error.message);
        }
        console.log('Fetched tasks:', rows); // Log the tasks retrieved
        res.json({ tasks: rows });
    });
}

app.post('/deleteTask', (req, res) => {
    const { id } = req.body;
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function(error) {
      if (error) {
        return res.status(500).send(error.message);
      }
      fetchTasks(res);
    });
  });

module.exports = {app,db};

const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});