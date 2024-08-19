const request = require('supertest');
const { app, server } = require('../index');
const db = require('../database');

beforeAll((done) => {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                title TEXT, 
                description TEXT, 
                dueDate TEXT, 
                priority TEXT,
                expiration TEXT
            )
        `, done);
    });
});

afterAll((done) => {
    db.close(() => {
        if (server) {
            server.close(done); 
            done();
        }
    });
});

// Test GET route
it('GET /tasks returns all tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
});

// Test POST route
it('POST /tasks creates a new task', async () => {
    const newTask = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '2024-08-20T10:00:00Z',
        priority: 'High',
        expiration: '2024-08-19T23:59:59Z'
    };
    const response = await request(app)
        .post('/tasks')
        .send(newTask);

    console.log('POST /tasks response:', response.body); 
        
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newTask.title);
    expect(response.body.description).toBe(newTask.description);
    expect(response.body.dueDate).toBe(newTask.dueDate);
    expect(response.body.priority).toBe(newTask.priority);
    expect(response.body.expiration).toBe(newTask.expiration);
});

// Test PUT route
it('PUT /tasks/:id updates an existing task', async () => {
    const updatedTask = {
        title: 'Updated Test Task',
        description: 'Updated Description',
        dueDate: '2024-08-21T12:00:00Z',
        priority: 'Medium',
        expiration: '2024-08-20T23:59:59Z'
    };

    // Create a task to update
    const createResponse = await request(app)
        .post('/tasks')
        .send({
            title: 'Initial Task',
            description: 'Initial Description',
            dueDate: '2024-08-20T10:00:00Z',
            priority: 'Low',
            expiration: '2024-08-19T23:59:59Z'
        });

    const taskId = createResponse.body.id;

    // Update the created task
    const updateResponse = await request(app)
        .put(`/tasks/${taskId}`)
        .send(updatedTask);

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body).toHaveProperty('changes', 1); 
});

// Test DELETE route
it('DELETE /tasks/:id deletes an existing task', async () => {
    // Create a task to delete
    const createResponse = await request(app)
        .post('/tasks')
        .send({
            title: 'Task to Delete',
            description: 'Description to Delete',
            dueDate: '2024-08-20T10:00:00Z',
            priority: 'Low',
            expiration: '2024-08-19T23:59:59Z'
        });

    const taskId = createResponse.body.id;

    // Delete the created task
    const deleteResponse = await request(app)
        .delete(`/tasks/${taskId}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body).toHaveProperty('changes', 1);
});
