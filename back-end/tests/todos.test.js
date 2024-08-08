const request = require('supertest');

const app = require('../app');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.todo.deleteMany();
});

afterAll(async () => {
  await prisma.todo.deleteMany();
});

describe('POST /', () => {
  it('should create a new todo', async () => {
    const newTodo = { title: 'Test Todo' , description: 'Test description'};
    const response = await request(app).post('/').send(newTodo);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newTodo.title);

    const todos = await prisma.todo.findMany();
    expect(todos[0].title).toBe(newTodo.title);
    expect(todos[0].description).toBe(newTodo.description);
  });
});

describe('GET /', () => {
  it('should return a list of todos with one todo', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
