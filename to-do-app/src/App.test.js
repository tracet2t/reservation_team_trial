const request = require('supertest');
const app = require('../app'); // Your Express app

describe('POST /tasks', () => {
  it('should create a new task', async () => {
    const response = await request(app).post('/tasks').send({
      title: 'Buy groceries',
      description: 'Buy milk, eggs, and bread',
      dueDate: '2024-08-15',
      priority: 'High',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Buy groceries');
    expect(response.body.description).toBe('Buy milk, eggs, and bread');
    expect(response.body.priority).toBe('High');
  });

  it('should return an error if title is missing', async () => {
    const response = await request(app).post('/tasks').send({
      description: 'This task has no title',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/title is required/i);
  });
});
