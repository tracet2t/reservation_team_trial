const {app,db} = require("../server")
const request = require('supertest');
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
});


beforeAll((done) => {
    server = app.listen(0, () => done()); 
});

afterAll((done) => {
    server.close(done); // Close the server after tests
    db.close(); // Close the database connection
});

beforeEach((done) => {
    db.run('DELETE FROM tasks', done); // Clear the tasks table before each test
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