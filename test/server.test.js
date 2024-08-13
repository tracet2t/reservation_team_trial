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

/*beforeEach((done) => {
    db.serialize(() => {
        db.run('DELETE FROM tasks', done); // Clear the tasks table
    });
});*/

test('is task added', async () => { 
    const response = await request(server)
       .post('/addTask')
       .send({ title: 'Test Task', description: 'Test Description', dueDate: '2024-08-08', priority: 'High' });

    expect(response.body.tasks[0].title).toBe('Test Task');
    expect(response.body.tasks[0].priority).toBe('High');
    expect(response.status).toBe(200);
 });

 test('should fetch all tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body.tasks.length).toBeGreaterThan(0);
});

test('is the task deleted', async () => {
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