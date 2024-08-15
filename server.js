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

db.serialize( ()=>{      // database creation
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

app.post('/addTask', (req, res) => {   // api for adding tasks
    const { title, description, dueDate, priority } = req.body;
    console.log('Adding task:', { title, description, dueDate, priority }); // Log the task data
    db.run(`INSERT INTO tasks (title, description, due_date, priority) VALUES (?, ?, ?, ?)`, [title, description, dueDate, priority], function(error) {
        if (error) {
            console.error('Error inserting task:', error.message);
            return res.status(500).send(error.message);
        }
        //const newTaskId = this.lastID;
        fetchTasks(res);
    });
});


app.get('/tasks',(req,res)=>{     // api for viewing tasks
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

app.post('/deleteTask', (req, res) => {   // api for deleting tasks
    const { id } = req.body;
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function(error) {
      if (error) {
        return res.status(500).send(error.message);
      }
      fetchTasks(res);
    });
  });


app.get('/task/:id', (req, res) => {   // api for editing tasks
    const taskId = req.params.id;
    db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (error, row) => {
        if (error) {
            console.error('Error fetching task:', error.message);
            return res.status(500).send(error.message);
        }
        res.json(row);
    });
});

app.post('/updateTask', (req, res) => {      // api for updating tasks
    const { id, title, description, dueDate, priority } = req.body;
    db.run('UPDATE tasks SET title = ?, description = ?, due_date = ?, priority = ? WHERE id = ?', 
        [title, description, dueDate, priority, id], function(error) {
        if (error) {
            console.error('Error updating task:', error.message);
            return res.status(500).send(error.message);
        }
        fetchTasks(res);
    });
});

app.post('/markCompleted', (req,res) =>{    // api for task cpmpletion
    const {id} = req.body;
    db.run('UPDATE tasks SET completed = 1 WHERE id=?', [id], function(error){
        if(error){
            console.error('Error marking task as completed:', error.message);
            return res.status(500).send(error.message);
        }
        fetchTasks(res);
    })
})


module.exports = {app,db};

const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});