const {app,db} = require("../server")
const request = require('supertest');
const bcrypt = require('bcrypt');
let server;

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            due_date TEXT,
            priority TEXT,
            completed INTEGER DEFAULT 0
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        )
      `);
});


beforeAll((done) => {
    server = app.listen(0, () => done()); 
});

afterAll((done) => {
    server.close(done); // Close the server after tests
    db.close(); // Close the database connection
});

beforeEach((done) => {
    db.run('DELETE FROM tasks', done);
    db.run('DELETE FROM users', done);   // Clear the tables before each test
});


test('is task added', async () => {   // test for task adding
    const response = await request(server)
       .post('/addTask')
       .send({ title: 'Test Task', description: 'Test Description', dueDate: '2024-08-08', priority: 'High' });

    expect(response.body.tasks[0].title).toBe('Test Task');
    expect(response.body.tasks[0].priority).toBe('High');
    expect(response.status).toBe(200);
 });

 test('is all tasks are fetched', async () => {  // test for viewing tasks
    await request(server)
        .post('/addTask')
        .send({ title: 'Fetch Task', description: 'Test Fetch', dueDate: '2024-08-08', priority: 'Medium' });
    
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body.tasks.length).toBeGreaterThan(0);
});

test('is the task deleted', async () => {   // test for deleting tasks
    const addResponse = await request(server)
        .post('/addTask')
        .send({ title: 'Task to Delete', description: 'Delete Me', dueDate: '2024-08-08', priority: 'Low' });

    const taskId = addResponse.body.tasks[0].id;

    const deleteResponse = await request(server)
        .post('/deleteTask')
        .send({ id: taskId });

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.tasks.find(task => task.id === taskId)).toBeUndefined();
});

test('is task fetched by the id', async () => {  // test for editing tasks
    const addResponse = await request(server)
      .post('/addTask')
      .send({title: 'Test Task', description: 'Editing task', dueDate: '2024-08-10', priority: 'High'});

      const taskId = addResponse.body.tasks[0].id;

      const response = await request(server).get(`/task/${taskId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({id:taskId}));

})

test('is the task updated ', async () => {   // test for updating tasks
    const addResponse = await request(server)
       .post('/addTask')
       .send({title:'Update', description: 'Updating task', dueDate: '2014-08-12', priority: 'Medium'});

    const taskId = addResponse.body.tasks[0].id;

    const updateResponse = await request(server)
       .post('/updateTask')
       .send({id: taskId, title:'Updated title', description: 'Updated description', dueDate: '2024-08-12', priority: 'High'});

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.tasks.find(task => task.id === taskId).title).toBe('Updated title');
 })

test('is the task completed', async () => {   // test for task completion
    const addResponse = await request(server)
      .post('/addTask')
      .send({title:'Task completion', description: 'Completed task', dueDate: '2024-08-11', priority: 'Low'});

    const taskId = addResponse.body.tasks[0].id;

    const completeResponse = await request(server)
       .post('/markCompleted')
       .send({id:taskId});
    
    expect(completeResponse.status).toBe(200);
    expect(completeResponse.body.tasks.find(task => task.id === taskId).completed).toBe(1);
  })

test('is a new user registered successfully', async () => {   // test for user registration
    const response = await request(server)
      .post('/register')
      .send({ username: 'testuser', password: 'testpassword' });
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({success:true});
  });
  
test('is it fail to register users with duplicate username', async () => {   // test for user registration fail
    await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'testpassword' });
  
    const response = await request(server)
      .post('/register')
      .send({ username: 'testuser', password: 'newpassword' });
  
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
        success: false,
        message: 'Username already exists'
      });
  });

test('is the user logged in successfully with correct credentials', async () => {  // test to login users
    const hashedPassword = bcrypt.hashSync('testpassword', 10);
    await db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['testuser', hashedPassword]);

    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ success: true });
});
  
test('is it fail to log the user with incorrect credentials', async () => {   // test to fail login users
    await db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['testuser', 'testpassword']);
  
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'wrongpassword' });
  
    expect(response.statusCode).toBe(401);
    expect(response.body).toStrictEqual({
        success: false,
        message: 'Invalid credentials'
      });
  });
  