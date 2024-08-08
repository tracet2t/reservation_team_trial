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
    server = app.listen(0, () => done()); // Use a random available port
});

afterAll((done) => {
    server.close(done); // Close the server after tests
    db.close(); // Close the database connection
});

test('is task added', async () => { 
    const response = await request(server)
       .post('/addTask')
       .send({ title: 'Test Task', description: 'Test Description', dueDate: '2024-08-08', priority: 'High' });

    expect(response.body.tasks[1].title).toBe('Test Task');
 });