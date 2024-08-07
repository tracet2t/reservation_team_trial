const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('GET /api/todos', () => {
  it('should return an empty list of todos', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  },);
});

describe('POST /api/todos', () => {
  it('should create a new todo', async () => {
    const newTodo = { title: 'Test Todo' };
    const response = await request(app).post('/api/todos').send(newTodo);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newTodo.title);

    const todos = await prisma.todo.findMany();
    expect(todos.length).toBe(1);
    expect(todos[0].title).toBe(newTodo.title);
  });
});

describe('GET /api/todos', () => {
  it('should return a list of todos with one todo', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
